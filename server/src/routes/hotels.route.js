const express = require('express')
const router = express.Router()
const hotels = require('../controllers/hotel.controller.js')
const address = require('../controllers/address.controller.js')
const review = require('../controllers/review.controller.js')
const moment = require('moment')
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
	}
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})

router.post('/', upload.single('hotelImage'), async (req, res) => {
	try {
		const addressResponse = await address.create(req)

		req.file = ''
		let formData = {
			addressId: addressResponse.id,
			hotelImage: req.file.path,
			...req.body
		}

		try {
			hotels.create(formData, res)
		} catch (error) {
			address.delete(addressResponse.id, res)
			throw error
		}
	} catch {
		res.status(500).send({
			message: 'Some error occurred while creating the Customer.'
		})
	}
})

router.get('/', hotels.findAll)

router.get('/:hotelId', async (req, res) => {
	try {
		const hotel = await hotels.findOne(req.params.hotelId)
		if (hotel) {
			res.status(200).send(hotel)
		} else {
			res.status(400).send({ message: `No hotel found with id: ${req.params.hotelId}` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching ofr a hotel' })
	}
})

router.put('/:hotelId', async (req, res) => {
	try {
		const updateAddress = await address.update(req.body)
		if (updateAddress.updated) {
			const hotelResponse = await hotels.update(req.body)
			if (hotelResponse.updated) {
				res.status(hotelResponse.status).send(hotelResponse)
			}
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating a hotel' })
	}
})

router.delete('/:hotelId', hotels.delete)

router.delete('/', hotels.deleteAll)

//Reviews

router.post('/reviews', async (req, res) => {
	try {
		let formData = {
			date: moment().format('YYYY-MM-DD HH:mm'),
			photo: '',
			...req.body
		}
		review.create(formData, res)
		//const reviewResponse = await review.create(formData)
		// if (reviewResponse) {
		// 	res.status(200).send({ status: 200, created: true, message: 'Review created' })
		// }
	} catch {
		res.status(500).send({
			message: 'Some error occurred while creating Review.'
		})
	}
})

router.get('/all/reviews', async (req, res) => {
	try {
		const response = await review.findAll()
		if (response) {
			res.status(200).send(response)
		} else {
			res.status(400).send({ message: `No reviews found` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching for a reviews' })
	}
})

router.get('/:hotelId/reviews', async (req, res) => {
	try {
		const reviewResponse = await review.findAllByHotelId(req.params.hotelId)
		if (reviewResponse) {
			res.status(200).send(reviewResponse)
		} else {
			res.status(400).send({ message: `No reviews found for hotel with id: ${req.params.hotelId}` })
		}
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while searching for a reviews' })
	}
})

router.put('/reviews/:reviewId', async (req, res) => {
	try {
		let formData = {
			reviewId: req.param.reviewId,
			...req.body
		}
		const updatedReview = await review.update(formData)
		// if (updatedReview.updated) {
		// 	res.status(updatedReview.status).send(updatedReview)
		// }
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating a hotel' })
	}
})

router.get('/reviews/:reviewId', (req, res) => {
	try {
		review.findOne(req, res)
	} catch (error) {
		res.status(500).send({ message: 'Some error occurred while updating a hotel' })
	}
})

router.delete('/reviews/:reviewId', review.delete)

router.delete('/reviews', review.deleteAll)

module.exports = router
