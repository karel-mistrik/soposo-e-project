const sql = require('./db.js')

// constructor
const Address = function (address) {
	this.apt = address.apt
	this.city = address.city
	this.country = address.country
	this.region = address.region
	this.street = address.street
	this.zip = address.zip
}

Address.create = newAddress => {
	return new Promise((resolve, reject) => {
		sql.query(`INSERT INTO address SET ?`, newAddress, (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ id: res.insertId, ...newAddress })
		})
	})
}

Address.findById = (addressId, result) => {
	sql.query(`SELECT * FROM address WHERE AddressID = ${addressId}`, (err, res) => {
		if (err) {
			result(err, null)
			return
		}

		if (res.length) {
			result(null, res[0])
			return
		}

		// not found address with the id
		result({ kind: 'not_found' }, null)
	})
}

Address.getAll = result => {
	sql.query('SELECT * FROM address', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

Address.updateById = (id, address) => {
	return new Promise((resolve, reject) => {
		sql.query(
			'UPDATE address SET apt = ?, city = ?, country = ?, region = ?, street = ?, zip = ? WHERE AddressId = ?',
			[address.apt, address.city, address.country, address.region, address.street, address.zip, id],
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve({ status: 200, message: 'Address updated', updated: true })
			}
		)
	})
}

Address.remove = (id, result) => {
	sql.query('DELETE FROM address WHERE AddressId = ?', id, (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		if (res.affectedRows == 0) {
			// not found Contact with the id
			result({ kind: 'not_found' }, null)
			return
		}

		result(null, res)
	})
}

Address.removeAll = result => {
	sql.query('DELETE FROM address', (err, res) => {
		if (err) {
			result(null, err)
			return
		}
		result(null, res)
	})
}

module.exports = Address
