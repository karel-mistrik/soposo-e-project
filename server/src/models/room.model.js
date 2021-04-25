const sql = require('./db.js')

// constructor
const Room = function (room) {
	this.floor = room.floor
	this.hotelId = room.HotelID
	this.roomtypeID = room.RoomtypeID
}

Room.create = (newRoom, result) => {
	sql.query('INSERT INTO room SET ?', newRoom, (err, res) => {
		if (err) {
			result(err, null)
			return
		}

		result(null, { id: res.insertId, ...newRoom })
	})
}

Room.findById = roomId => {
	return new Promise((resolve, reject) => {
		sql.query(
			`SELECT * FROM room join roomtype on room.RoomtypeID = roomtype.RoomtypeID WHERE RoomID = ${roomId}`,
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res[0])
			}
		)
	})
}

Room.getAll = result => {
	sql.query('SELECT * FROM room join roomtype on room.RoomtypeID = roomtype.RoomtypeID', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

Room.updateById = (id, room) => {
	return new Promise((resolve, reject) => {
		sql.query('UPDATE room SET floor = ? WHERE RoomID = ?', [room.floor, id], (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ status: 200, message: 'Room updated', updated: true })
		})
	})
}

Room.remove = (id, result) => {
	sql.query('DELETE FROM room WHERE RoomID = ?', id, (err, res) => {
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

Room.removeAll = result => {
	sql.query('DELETE FROM room', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

module.exports = Room
