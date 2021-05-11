const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const customer = require('../controllers/customer.controller');
const User = require('../models/customer.model')
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

function init(passport) {
    passport.use(
        new JWTStrategy(
            {
                secretOrKey: 'TOP_SECRET',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
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
            const token = jwt.sign({ user }, 'TOP_SECRET');
            return done(null, { token, user });
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
