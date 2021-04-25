const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const customer = require('../controllers/customer.controller');

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}

const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return done(null, false, { message: 'No user with that email' });
    }
    try {
        if (await bcrypt.compare(password, user.Password)) {
            return done(null, { ...user });
        } else {
            console.log('nop');
            return done(null, false, { message: 'Password incorrect' });
        }
    } catch (e) {
        return done(e);
    }
};

const getUserById = async id => {
    const user = await customer.findOne(id);
    return user;
};

const getUserByEmail = async email => {
    const user = await customer.findOneEmail(email);
    return user;
};

module.exports = init;
