const Room = require('../models/room.model.js')

exports.create = (req, res) => {
	// Validate request
	if (!req) {
		res.status(400).send({
			message: 'Content can not be empty!'
		})
	}

	const room = new Room({
		floor: req.floor,
		hotelId: req.hotelId,
		roomtypeId: req.roomtypeId
	})

	Room.create(room, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Room.'
			})
		} else {
			res.status(200).send(data)
		}
	})
}

exports.findAll = (req, res) => {
	Room.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving rooms.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = async id => {
	const response = await Room.findById(id)

	return response
}

exports.update = async (req, res) => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Room.updateById(
		req.roomId,
		new Room({
			floor: req.floor
		})
	)
	return response
}

exports.delete = (req, res) => {
	Room.remove(req.params.roomId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Room
                with id ${req.params.roomId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Room with id ' + req.params.roomId
				})
			}
		} else res.send({ message: `Room was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Room.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all rooms.'
			})
		else res.send({ message: `All Rooms were deleted successfully!` })
	})
}
