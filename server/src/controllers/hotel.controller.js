const Hotel = require('../models/hotel.model.js')

exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(400).send({
			message: 'Content can not be empty!'
		})
	}

	const hotel = new Hotel({
		name: req.name,
		preview: req.preview,
		description: req.description,
		addressID: req.addressId,
		hotelImage: req.hotelImage
	})

	Hotel.create(hotel, (err, data) => {
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
	Hotel.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving hotels.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = async id => {
	const response = await Hotel.findById(id)

	return response
}

exports.update = async (req, res) => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	console.log(req)
	const response = await Hotel.updateById(
		req.HotelID,
		new Hotel({
			name: req.Name,
			description: req.Description,
			preview: req.Preview,
			addressID: req.AddressID
		})
	)
	return response
}

exports.delete = (req, res) => {
	Hotel.remove(req.params.hotelId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Hotel
                with id ${req.params.hotelId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Hotel with id ' + req.params.hotelId
				})
			}
		} else res.send({ message: `Hotel was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Hotel.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all customers.'
			})
		else res.send({ message: `All Hotels were deleted successfully!` })
	})
}
