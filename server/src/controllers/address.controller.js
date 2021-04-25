const Address = require('../models/address.model.js')

exports.create = async (req, res) => {
	const address = new Address({
		apt: req.body.apt,
		city: req.body.city,
		country: req.body.country,
		region: req.body.region,
		street: req.body.street,
		zip: req.body.zip
	})

	const addressRes = await Address.create(address)
	return addressRes
}

exports.findAll = (req, res) => {
	Address.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving hotels.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = (req, res) => {
	Address.findById(req.params.addressId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Address with id ${req.params.addressId}.`
				})
			} else {
				res.status(500).send({
					message: 'Error retrieving Address with id ' + req.params.addressId
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

	const response = await Address.updateById(req.addressId, new Address(req))
	return response
}

exports.delete = (req, res) => {
	Address.remove(req.params.addressId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Address
                with id ${req.params.addressId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Address with id ' + req.params.addressId
				})
			}
		} else res.send({ message: `Address was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Address.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all customers.'
			})
		else res.send({ message: `All Hotels were deleted successfully!` })
	})
}
