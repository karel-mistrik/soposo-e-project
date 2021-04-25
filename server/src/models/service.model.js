const sql = require('./db.js')

// constructor
const Service = function (service) {
	this.name = service.name
}

Service.create = (newService, result) => {
	return new Promise((resolve, reject) => {
		sql.query('INSERT INTO service SET ?', (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ id: res.insertId, ...res[0] })
		})
	})
}

Service.findById = serviceId => {
	return new Promise((resolve, reject) => {
		sql.query(`SELECT * FROM service WHERE ServiceID = ${serviceId}`, (err, res) => {
			if (err) {
				reject(err)
			}
			resolve(res[0])
		})
	})
}

Service.getAllHotel = (id, result) => {
	sql.query(
		`SELECT service.name, service.serviceid, service_hotel.amount, service_hotel.price
         FROM service 
         join service_hotel on service.ServiceID = service_hotel.ServiceID 
         join hotel on service_hotel.HotelID = hotel.HotelID
         where hotel.HotelID = ${id}`,
		(err, res) => {
			if (err) {
				result(null, err)
				return
			}

			result(null, res)
		}
	)
}

Service.getAllRoom = (id, result) => {
	sql.query(
		`SELECT service.name, Service_roomtype.amount, Service_roomtype.price
         FROM service 
         join Service_roomtype on service.ServiceID = Service_roomtype.ServiceID
         join roomtype on Service_roomtype.RoomtypeID = roomtype.RoomtypeID
         where roomtype.RoomtypeID = ${id}`,
		(err, res) => {
			if (err) {
				result(null, err)
				return
			}

			result(null, res)
		}
	)
}

Service.updateById = (id, service) => {
	return new Promise((resolve, reject) => {
		sql.query('UPDATE service SET name = ? WHERE ServiceID = ?', [service.name, id], (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ status: 200, message: 'Room updated', updated: true })
		})
	})
}

Service.remove = (id, result) => {
	sql.query('DELETE FROM service WHERE ServiceID = ?', id, (err, res) => {
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

Service.removeAll = result => {
	sql.query('DELETE FROM service', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

module.exports = Service
