if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const hotelsRouter = require('./routes/hotels.route')
const customerRouter = require('./routes/customer.route')
const authRouter = require('./routes/auth.route')
const roomRouter = require('./routes/room.route')
const reservationRouter = require('./routes/reservation.route')
const serviceRouter = require('./routes/service.route')
const PORT = process.env.PORT || 3001
const initPassport = require('./config/passport.config')
const session = require('express-session')
const passport = require('passport')


const app = express()

//middleware

initPassport(passport)

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(flash);
app.use(passport.initialize())
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
)
app.use('/api/hotels', passport.authenticate('jwt', { session: false }), hotelsRouter)
app.use('/api/customers', customerRouter)
app.use('/', authRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/reservation', reservationRouter)
app.use('/api/services', serviceRouter)

app.get('/', (req, res) => {
	res.json({ message: 'Yo waddup' })
})

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}!`)
})
