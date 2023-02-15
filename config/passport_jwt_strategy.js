require('dotenv').config()
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//-----------Using JWT passport--------------//
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY,
}


passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    Doctor.findById(jwtPayLoad._id, function (error, user) {
        if (error) {
            console.log('Error in finding doctor from JWT');
            return done(error, false);
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

}));

module.exports = passport;
