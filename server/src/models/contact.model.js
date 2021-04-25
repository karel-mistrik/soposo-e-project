const sql = require('./db.js')

// constructor
const Contact = function (contact) {
	this.fax = contact.fax
	this.email = contact.email
	this.name = contact.name
	this.surname = contact.surname
	this.phone = contact.phone
}

Contact.create = newContact => {
	return new Promise((resolve, reject) => {
		sql.query(`INSERT INTO contact SET ?`, newContact, (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ id: res.insertId, ...newContact })
		})
	})
}

Contact.findById = (ContactId, result) => {
	sql.query(`SELECT * FROM contact WHERE ContactID = ${ContactId}`, (err, res) => {
		if (err) {
			result(err, null)
			return
		}

		if (res.length) {
			result(null, res[0])
			return
		}

		// not found Contact with the id
		result({ kind: 'not_found' }, null)
	})
}

Contact.getAll = result => {
	sql.query('SELECT * FROM contact', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

Contact.updateById = (id, contact, result) => {
	return new Promise((resolve, reject) => {
		sql.query(
			'UPDATE contact SET fax = ?, email = ?, name = ?, phone = ?, surname = ? WHERE ContactID = ?',
			[contact.fax, contact.email, contact.name, contact.phone, contact.surname, id],
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve({ status: 200, message: 'Contact updated', updated: true })
			}
		)
	})
}

Contact.remove = (id, result) => {
	sql.query('DELETE FROM contact WHERE ContactID = ?', id, (err, res) => {
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

Contact.removeAll = result => {
	sql.query('DELETE FROM contact', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

module.exports = Contact
