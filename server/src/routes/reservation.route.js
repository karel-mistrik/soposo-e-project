const express = require('express')
const router = express.Router()
const reservation = require('../controllers/reservation.controller.js')
const room = require('../controllers/room.controller.js')
const moment = require('moment')
const customer = require('../controllers/customer.controller.js')

router.post('/', async (req, res) => {
	try {
		let formData = {
			status: 0,
			...req.body
		}
		const reservationResponse = await reservation.create(formData)
		const currentRoom = await room.findOne(reservationResponse.roomId)
		const currentCustomer = await customer.findOne(reservationResponse.customerId)
		const { roomId, customerId, ...rest } = reservationResponse
		const response = {
			name: currentCustomer.name,
			surname: currentCustomer.surname,
			email: currentCustomer.email,
			alias: currentCustomer.Alias,
			hotelId: currentRoom.HotelID,
			description: currentRoom.Description,
			...rest
		}
		if (reservationResponse) {
			res.status(200).send(response)
		}
	} catch {
		res.status(500).send({
			message: 'Some error occurred while creating the Reservation.'
		})
	}
})

router.get('/', reservation.findAll)

router.get('/:reservationId', async (req, res) => {
	try {
		const hotel = await reservation.findOne(req.params.reservationId)
		if (hotel) {
			res.status(200).send(hotel)
		} else {
			res.status(400).send({ message: `No hotel found with id: ${req.params.reservationId}` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching for a hotel' })
	}
})

router.put('/:reservationId', async (req, res) => {
	try {
		let formData = {
			id: req.params.reservationId,
			status: req.body.status
		}
		const reservationResponse = await reservation.update(formData)
		if (reservationResponse.updated) {
			res.status(200).send(reservationResponse)
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating reservation' })
	}
})

router.delete('/:reservationId', reservation.delete)

router.delete('/', reservation.deleteAll)

module.exports = router
