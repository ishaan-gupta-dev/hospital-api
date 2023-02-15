require('dotenv').config()
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY

const doctorSchema = new mongoose.Schema({ // doctor collection
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

doctorSchema.pre("save", async function () { // before saving in db, convertpassword in encrypted form
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

doctorSchema.methods.getSignedJwtToken = function () { // function to Sign JWT and return
    return jwt.sign({ id: this._id }, JWT_KEY, {
        expiresIn: '120m'
    });
};

doctorSchema.methods.matchPassword = async function (enteredPassword) { // check if password entered matches password in db, using bcrypt to decrypt the password in db
    return await bcrypt.compare(enteredPassword, this.password);
};
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;