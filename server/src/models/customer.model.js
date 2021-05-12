const sql = require('./db.js')

// constructor
const Customer = function (customer) {
	this.alias = customer.alias
	this.gender = customer.gender
	this.password = customer.password
	this.registrationDate = customer.registrationDate
	this.contactID = customer.contactID
}

Customer.create = (newCustomer, result) => {
	sql.query('INSERT INTO customer SET ?', newCustomer, (err, res) => {
		if (err) {
			result(err, null)
			return
		}
		result(null, { id: res.insertId, ...newCustomer })
	})
}

Customer.findById = customerId => {
	return new Promise((resolve, reject) => {
		sql.query(
			`SELECT * FROM customer join contact on customer.ContactID = contact.ContactID WHERE CustomerID = ${customerId}`,
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res[0])
			}
		)
	})
}

Customer.findByEmail = customerEmail => {
	return new Promise((resolve, reject) => {
		sql.query(
			`select * from customer join contact on customer.ContactID = contact.ContactID where contact.email = "${customerEmail}"`,
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res[0])
			}
		)
	})
}

Customer.getAll = result => {
	sql.query('SELECT * FROM all_users', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

Customer.updateById = (id, customer) => {
	return new Promise((resolve, reject) => {
		sql.query(
			'UPDATE customer SET alias = ?, gender = ? WHERE CustomerID = ?',
			[customer.alias, customer.gender, id],
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve({ status: 200, message: 'Customer updated', updated: true })
			}
		)
	})
}

Customer.updatePasswordById = (id, customer) => {
	return new Promise((resolve, reject) => {
		sql.query('UPDATE customer SET password = ? WHERE CustomerID = ?', [customer.password, id], (err, res) => {
			if (err) {
				reject(err)
			}
			resolve({ status: 200, message: `Password of a user with id: ${id} updated`, updated: true })
		})
	})
}

Customer.remove = (id, result) => {
	sql.query('DELETE FROM customer WHERE CustomerID = ?', id, (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		if (res.affectedRows == 0) {
			// not found Customer with the id
			result({ kind: 'not_found' }, null)
			return
		}

		result(null, res)
	})
}

Customer.removeAll = result => {
	sql.query('DELETE FROM customer', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

module.exports = Customer
