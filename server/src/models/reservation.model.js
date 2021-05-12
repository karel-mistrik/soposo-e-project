const sql = require('./db.js')

// constructor
const Reservation = function (reservation) {
	this.startDate = reservation.startDate
	this.endDate = reservation.endDate
	this.numberOfGuests = reservation.numberOfGuests
	this.price = reservation.price
	this.status = reservation.status
	this.customerId = reservation.customerId
	this.paymentId = reservation.paymentId
	this.roomId = reservation.roomId
}

Reservation.create = newReservation => {
	return new Promise((resolve, reject) => {
		sql.query(`INSERT INTO reservation SET ?`, newReservation, (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ id: res.insertId, ...newReservation })
		})
	})
}

Reservation.findById = reservationId => {
	return new Promise((resolve, reject) => {
		sql.query(
			`select reservation.Enddate, reservation.Startdate, reservation.Numberofguests, reservation.Price, reservation.Status,
             contact.name, contact.surname, roomtype.description, Payment.type from reservation 
             join customer on reservation.CustomerID = customer.CustomerID
             join contact on customer.contactID = contact.contactID
             join room on reservation.RoomID = room.RoomID
             join roomtype on room.RoomtypeID = roomtype.RoomtypeID
             join Payment on reservation.PaymentID = Payment.PaymentID
             WHERE reservation.ReservationID = ${reservationId}`,
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res[0])
			}
		)
	})
}

Reservation.getAll = result => {
	sql.query(
		`select reservation.ReservationID, reservation.Enddate, reservation.Startdate, reservation.Numberofguests, reservation.Price, reservation.Status,
		contact.name as contactName, contact.surname, contact.email, roomtype.description, Payment.type, hotel.name, address.street, address.apt, address.city 
		from reservation 
		join customer on reservation.CustomerID = customer.CustomerID
		join contact on customer.contactID = contact.contactID
		join room on reservation.RoomID = room.RoomID
		join roomtype on room.RoomtypeID = roomtype.RoomtypeID
		join Payment on reservation.PaymentID = Payment.PaymentID
		join hotel on room.HotelID = hotel.HotelID
		join address on hotel.AddressID = address.AddressID`,
		(err, res) => {
			if (err) {
				result(null, err)
				return
			}

			result(null, res)
		}
	)
}

Reservation.findAllByUserId = userId => {
	return new Promise((resolve, reject) => {
		sql.query(
			`select reservation.ReservationID, reservation.Enddate, reservation.Startdate, reservation.Numberofguests, reservation.Price, reservation.Status,
		contact.name as contactName, contact.surname, contact.email, roomtype.description, Payment.type, hotel.name, address.street, address.apt, address.city 
		from reservation 
		join customer on reservation.CustomerID = customer.CustomerID
		join contact on customer.contactID = contact.contactID
		join room on reservation.RoomID = room.RoomID
		join roomtype on room.RoomtypeID = roomtype.RoomtypeID
		join Payment on reservation.PaymentID = Payment.PaymentID
		join hotel on room.HotelID = hotel.HotelID
		join address on hotel.AddressID = address.AddressID
		WHERE customer.CustomerID = ${userId}`,
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res)
			}
		)
	})
}

Reservation.updateById = (id, reservation) => {
	return new Promise((resolve, reject) => {
		sql.query('UPDATE reservation SET status = ? WHERE ReservationID = ?', [reservation, id], (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ status: reservation, message: 'Reservation updated', updated: true, paid: true })
		})
	})
}

Reservation.remove = (id, result) => {
	sql.query('DELETE FROM reservation WHERE ReservationID = ?', id, (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		if (res.affectedRows == 0) {
			result({ kind: 'not_found' }, null)
			return
		}
		result(null, res)
	})
}

Reservation.removeAll = result => {
	sql.query('DELETE FROM reservation', (err, res) => {
		if (err) {
			result(null, err)
			return
		}
		result(null, res)
	})
}

module.exports = Reservation
