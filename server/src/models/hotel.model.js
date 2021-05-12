const sql = require('./db.js')

// constructor
const Hotel = function (hotel) {
	this.name = hotel.name
	this.preview = hotel.preview
	this.description = hotel.description
	this.addressID = hotel.addressID
	this.preview = hotel.preview
	this.hotelImage = hotel.hotelImage
}

Hotel.create = (newHotel, result) => {
	sql.query('INSERT INTO hotel SET ?', newHotel, (err, res) => {
		if (err) {
			result(err, null)
			return
		}
		result(null, { id: res.insertId, ...newHotel })
	})
}

Hotel.findById = hotelId => {
	return new Promise((resolve, reject) => {
		sql.query(
			`SELECT * FROM hotel join address on hotel.AddressID = address.AddressID WHERE HotelID = ${hotelId}`,
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res[0])
			}
		)
	})
}

Hotel.getAll = result => {
	sql.query('SELECT * FROM hotels_list', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

Hotel.updateById = (id, hotel) => {
	return new Promise((resolve, reject) => {
		sql.query(
			'UPDATE hotel SET name = ?, description = ?, preview = ? WHERE HotelID = ?',
			[hotel.name, hotel.description, hotel.preview, id],
			(err, res) => {
				if (err) {
					console.log(err)
					reject(err)
				}
				resolve({ status: 200, message: 'Hotel updated', updated: true })
			}
		)
	})
}

Hotel.remove = (id, result) => {
	sql.query('CALL delete_hotel(?)', id, (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

Hotel.removeAll = result => {
	sql.query('DELETE FROM hotel', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

module.exports = Hotel
