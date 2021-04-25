const Review = require('../models/review.model.js')

exports.create = async (req, res) => {
	const review = new Review({
		date: req.date,
		photo: req.photo,
		stars: req.stars,
		text: req.text,
		hotelId: req.hotelId,
		customerId: req.customerId
	})

	const reviewRes = await Review.create(review)
	return reviewRes
}

exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(400).send({
			message: 'Content can not be empty!'
		})
	}

	const review = new Review({
		date: req.date,
		photo: req.photo,
		stars: req.stars,
		text: req.text,
		hotelId: req.hotelId,
		customerId: req.customerId
	})

	Review.create(review, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Hotel.'
			})
		} else {
			res.status(200).send(data)
		}
	})
}

exports.findAll = (req, res) => {
	Review.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving reviews.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findAllByHotelId = async id => {
	const response = await Review.findByHotelId(id)
	return response
}

exports.findOne = (req, res) => {
	Review.findById(req.params.reviewId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Review with id ${req.params.reviewId}.`
				})
			} else {
				res.status(500).send({
					message: 'Error retrieving Review with id ' + req.params.reviewId
				})
			}
		} else {
			res.send(data)
		}
	})
}

exports.update = async req => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Review.updateById(req.reviewId, new Review(req))
	return response
}

exports.delete = (req, res) => {
	Review.remove(req.params.reviewId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Review with id ${req.params.reviewId} not found.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Review with id ' + req.params.reviewId
				})
			}
		} else res.send({ message: `Review was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Review.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Review.'
			})
		else res.send({ message: `All Reviews were deleted successfully!` })
	})
}
