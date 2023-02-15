require('dotenv').config()
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor')
const JWT_KEY = process.env.JWT_KEY

module.exports.verifyToken = async (req, res, next) => { // this function verifies the token and executes the next function

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        req.token = token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Error in getting Token",
        });
    }

    try {
        const decoded = await jwt.verify(token, JWT_KEY);
        req.doctor = await Doctor.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Error in verifying token, code => ${error}`,
        });
    }
};