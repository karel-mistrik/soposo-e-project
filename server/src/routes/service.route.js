const express = require('express')
const router = express.Router()
const room = require('../controllers/room.controller.js')
const hotel = require('../controllers/hotel.controller.js')
const service = require('../controllers/service.controller.js')

router.post('/', async (req, res) => {
	try {
		let formData = {
			...req.body
		}

		const serviceRes = await service.create(formData)
	} catch {
		res.status(500).send({
			message: 'Some error occurred while creating the Reservation.'
		})
	}
})

router.get('/hotel/:hotelId', service.findAllHotel)
router.get('/room/:roomId', service.findAllRoom)

router.get('/:serviceId', async (req, res) => {
	try {
		const hotel = await service.findOne(req.params.serviceId)
		if (hotel) {
			res.status(200).send(hotel)
		} else {
			res.status(400).send({ message: `No service found with id: ${req.params.serviceId}` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching for a service' })
	}
})

router.put('/:serviceId', async (req, res) => {
	try {
		let formData = {
			id: req.params.serviceId,
			name: req.body.name
		}
		const serviceRes = await service.update(formData)
		if (serviceRes.updated) {
			res.status(200).send(serviceRes)
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating service' })
	}
})

router.delete('/:serviceId', service.delete)

router.delete('/', service.deleteAll)

module.exports = router
