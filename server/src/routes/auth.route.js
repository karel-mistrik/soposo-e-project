const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const moment = require('moment')
const contact = require('../controllers/contact.controller')
const customer = require('../controllers/customer.controller')
const passport = require('passport')
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
	res.send('Login')
})

router.get('/register', (req, res) => {
	res.send('Register')
})

/* router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Logged in');
});
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.status(200).send({ ...res.req.user })
})

router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const contactResponse = await contact.create(req)
		const user = await customer.findOneEmail(req.body.email)

		let formData = {
			contactId: contactResponse.id,
			hashedPassword: hashedPassword,
			registrationDate: moment().format('YYYY-MM-DD HH:mm:ss'),
			...req.body
		}

		if (user) {
			res.status(500).send({
				message: 'There is a user with this email address'
			})
		} else {
			try {
				customer.create(formData, res)
			} catch (error) {
				contact.delete(contactResponse.id, res)
				throw error
			}
		}
	} catch {
		res.status(500).send({
			message: 'Some error occurred while creating the Customer.'
		})
	}
})

module.exports = router
