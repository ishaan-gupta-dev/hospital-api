const Doctor = require('../../../models/doctor');

module.exports.register = async function (req, res) {
    try {
        let { email, password } = req.body;

        let doctor = await Doctor.findOne({ email: email });

        if (doctor) { // if email is already registered, send back error message
            return res.status(401).json({
                success: false,
                message: "email already exists"
            })
        }

        doctor = await Doctor.create(req.body); // creating doctor document in db

        return res.status(200).json({
            success: true,
            messgae: doctor
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in registering doctor, code => ${error.message}`,
        });
    }
}

module.exports.login = async function (req, res) {
    try {

        let { email, password } = req.body;

        if (!email || !password) { // if form body does not contain email or password
            return res.status(400).json({
                success: false,
                message: "No email or password found!"
            });
        }

        const doctor = await Doctor.findOne({ email: email });

        if (!doctor) { // email not found
            return res.status(401).json({
                success: false,
                message: "email not registered!"
            });
        }

        const isMatch = await doctor.matchPassword(password);

        if (!isMatch) { // passwords didnt match
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const token = doctor.getSignedJwtToken(); // get token

        return res.status(200).json({
            success: true,
            token,
            message: `Login successful! Here is your token ${doctor.name}`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in login doctor, code => ${error.message}`,
        });
    }
}