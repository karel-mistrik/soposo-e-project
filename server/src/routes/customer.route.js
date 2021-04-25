const express = require('express')
const router = express.Router()
const customers = require('../controllers/customer.controller.js')
const contact = require('../controllers/contact.controller')
const bcrypt = require('bcrypt')

router.get('/', customers.findAll)

router.get('/:customerId', async (req, res) => {
	try {
		const customer = await customers.findOne(req.params.customerId)
		if (customer) {
			res.status(200).send(customer)
		} else {
			res.status(400).send({ message: `No customer found with id: ${req.params.customerId}` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching for a customer' })
	}
})

router.put('/:customerId', async (req, res) => {
	try {
		const customer = await customers.findOne(req.params.customerId)

		let formData = {
			customerId: customer.CustomerID,
			contactId: customer.ContactID,
			...req.body
		}

		const updatedContact = await contact.update(formData)
		if (updatedContact.updated) {
			const customerUpdated = await customers.update(formData)
			if (customerUpdated.updated) {
				res.status(customerUpdated.status).send(customerUpdated)
			}
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating a customer' })
	}
})

router.put('/password/:customerId', async (req, res) => {
	try {
		const customer = await customers.findOne(req.params.customerId)
		const hashedPassword = await bcrypt.hash(req.body.password, 10)

		let formData = {
			customerId: customer.CustomerID,
			password: hashedPassword
		}

		if (await bcrypt.compare(req.body.oldPassword, customer.Password)) {
			const customerUpdated = await customers.updatePassword(formData)
			if (customerUpdated.updated) {
				res.status(customerUpdated.status).send(customerUpdated)
			} else {
				res.status(500).send(customerUpdated)
			}
		} else {
			res.status(500).send({ message: "Old password doesn't match" })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating a password' })
	}
})

router.delete('/:customerId', customers.delete)

router.delete('/', customers.deleteAll)

module.exports = router
