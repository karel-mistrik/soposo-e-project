const Contact = require('../models/contact.model.js')

exports.create = async req => {
	const contact = new Contact({
		fax: req.body.fax,
		email: req.body.email,
		name: req.body.name,
		surname: req.body.surname,
		phone: req.body.phone
	})
	const contactRes = await Contact.create(contact)
	return contactRes
}

exports.findAll = (req, res) => {
	Contact.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving contacts.'
			})
		} else {
			res.send(data)
		}
	})
}

exports.findOne = (req, res) => {
	Contact.findById(req.params.contactId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Contact with id ${req.params.contactId}.`
				})
			} else {
				res.status(500).send({
					message: 'Error retrieving Contact with id ' + req.params.contactId
				})
			}
		} else {
			res.send(data)
		}
	})
}

exports.update = async req => {
	// Validate Request
	if (!req) {
		return { status: 400, message: 'Content can not be empty!' }
	}

	const response = await Contact.updateById(req.contactId, new Contact(req))
	return response
}

exports.delete = (req, res) => {
	Contact.remove(req.params.contactId, (err, data) => {
		if (err) {
			if (err.kind === 'not_found') {
				res.status(404).send({
					message: `Not found Contact with id ${req.params.contactId}.`
				})
			} else {
				res.status(500).send({
					message: 'Could not delete Contact with id ' + req.params.contactId
				})
			}
		} else res.send({ message: `Contact was deleted successfully!` })
	})
}

exports.deleteAll = (req, res) => {
	Contact.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Contacts.'
			})
		else res.send({ message: `All Contacts were deleted successfully!` })
	})
}
