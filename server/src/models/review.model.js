const sql = require('./db.js')

// constructor
const Review = function (review) {
	this.date = review.date
	this.photo = review.photo
	this.stars = review.stars
	this.text = review.text
	this.customerId = review.customerId
	this.hotelId = review.hotelId
}

Review.create = (newReview, result) => {
	sql.query('INSERT INTO Review SET ?', newReview, (err, res) => {
		if (err) {
			result(err, null)
			return
		}

		result(null, { id: res.insertId, ...newReview })
	})
}

Review.findById = (reviewId, result) => {
	sql.query(`SELECT * FROM Review WHERE ReviewID = ${reviewId}`, (err, res) => {
		if (err) {
			result(err, null)
			return
		}
		if (res.length) {
			result(null, res[0])
			return
		}
		result({ kind: 'not_found' }, null)
	})
}

Review.findByHotelId = hotelId => {
	return new Promise((resolve, reject) => {
		sql.query(`SELECT * FROM Review WHERE HotelID = ${hotelId}`, (err, res) => {
			if (err) {
				reject(err)
			}
			resolve(res)
		})
	})
}

Review.getAll = result => {
	sql.query('SELECT * FROM Review join customer on  Review.CustomerID = customer.CustomerID', (err, res) => {
		if (err) {
			result(null, err)
			return
		}
		result(null, res)
	})
}

Review.updateById = (id, review) => {
	return new Promise((resolve, reject) => {
		sql.query(
			'UPDATE Review SET date = ?, photo = ?, stars = ?, text = ? WHERE ReviewID = ?',
			[review.date, review.photo, review.stars, review.text, id],
			(err, res) => {
				if (err) {
					reject(err)
				}
				resolve({ status: 200, message: 'Review updated', updated: true, edited: res })
			}
		)
	})
}

Review.remove = (id, result) => {
	sql.query('DELETE FROM Review WHERE ReviewID = ?', id, (err, res) => {
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

Review.removeAll = result => {
	sql.query('DELETE FROM Review', (err, res) => {
		if (err) {
			result(null, err)
			return
		}

		result(null, res)
	})
}

module.exports = Review
