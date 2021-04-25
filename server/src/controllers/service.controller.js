const Service = require('../models/service.model.js')

exports.create = async req => {
	const service = new Service({
		name: req.name
	})
	const serviceRes = await Service.create(service)
	return serviceRes
}

exports.findAllHotel = (req, res) => {
	Service.getAllHotel(req.params.hotelId, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving services.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findAllRoom = (req, res) => {
	Service.getAllRoom(req.params.roomId, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving services.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = async id => {
	const response = await Service.findById(id)

	return response
}

exports.update = async req => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Service.updateById(req.id, req.name)
	return response
}

exports.delete = (req, res) => {
	Service.remove(req.params.serviceId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Service
                with id ${req.params.serviceId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Service with id ' + req.params.serviceId
				})
			}
		} else res.send({ message: `Service was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Service.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all services.'
			})
		else res.send({ message: `All Services were deleted successfully!` })
	})
}
