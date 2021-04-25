const Reservation = require('../models/reservation.model.js')

exports.create = async req => {
	const reservation = new Reservation({
		startDate: req.startDate,
		endDate: req.endDate,
		numberOfGuests: req.numberOfGuests,
		price: req.price,
		status: req.status,
		customerId: req.customerId,
		paymentId: req.paymentId,
		roomId: req.roomId
	})
	const reservationRes = await Reservation.create(reservation)
	return reservationRes
}

exports.findAll = (req, res) => {
	Reservation.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving reservations.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = async id => {
	const response = await Reservation.findById(id)

	return response
}

exports.update = async req => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Reservation.updateById(req.id, req.status)
	return response
}

exports.delete = (req, res) => {
	Reservation.remove(req.params.reservationId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Reservation
                with id ${req.params.reservationId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Reservation with id ' + req.params.reservationId
				})
			}
		} else res.send({ message: `Reservation was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Reservation.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all reservations.'
			})
		else res.send({ message: `All Reservations were deleted successfully!` })
	})
}
