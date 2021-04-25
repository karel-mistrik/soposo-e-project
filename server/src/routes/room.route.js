const express = require('express')
const router = express.Router()
const hotels = require('../controllers/hotel.controller.js')
const room = require('../controllers/room.controller.js')

router.post('/', async (req, res) => {
	try {
		room.create(req.body, res)
	} catch (error) {
		res.status(500).send({
			message: 'Unable to create room'
		})
		throw error
	}
})

router.get('/', room.findAll)

router.get('/:roomId', async (req, res) => {
	try {
		const roomResponse = await room.findOne(req.params.roomId)
		if (roomResponse) {
			res.status(200).send(roomResponse)
		} else {
			res.status(400).send({ message: `No room found with id: ${req.params.roomId}` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching for a room' })
	}
})

router.put('/:roomId', async (req, res) => {
	try {
		const hotel = await hotels.findOne(req.params.hotelId)
		let formData = {
			hotelId: hotel.HotelID,
			addressId: hotel.AddressID,
			...req.body
		}

		const updateAddress = await address.update(formData)
		if (updateAddress.updated) {
			const hotelResponse = await hotels.update(formData)
			if (hotelResponse.updated) {
				res.status(hotelResponse.status).send(hotelResponse)
			}
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating a room' })
	}
})

router.delete('/:roomId', room.delete)

router.delete('/', room.deleteAll)

module.exports = router
