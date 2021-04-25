const Customer = require('../models/customer.model.js')

exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(400).send({
			message: 'Content can not be empty!'
		})
	}

	const customer = new Customer({
		alias: req.alias,
		gender: req.gender,
		password: req.hashedPassword,
		registrationDate: req.registrationDate,
		contactID: req.contactId
	})

	Customer.create(customer, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Customer.'
			})
		} else {
			res.status(200).send(data)
		}
	})
}

exports.findAll = (req, res) => {
	Customer.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving customers.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = async id => {
	const user = await Customer.findById(id)
	return user
}

exports.findOneEmail = async email => {
	const user = await Customer.findByEmail(email)

	return user
}

exports.update = async req => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Customer.updateById(
		req.customerId,
		new Customer({
			alias: req.alias,
			gender: req.gender,
			contactID: req.contactId
		})
	)
	return response
}

exports.updatePassword = async req => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Customer.updatePasswordById(
		req.customerId,
		new Customer({
			password: req.password
		})
	)
	return response
}

exports.delete = (req, res) => {
	Customer.remove(req.params.customerId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Customer with id ${req.params.customerId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Customer with id ' + req.params.customerId
				})
			}
		} else res.send({ message: `Customer was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Customer.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all customers.'
			})
		else res.send({ message: `All Customers were deleted successfully!` })
	})
}
