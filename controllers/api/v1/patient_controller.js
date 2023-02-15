const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

module.exports.register = async (req, res) => {

    const doctor = req.doctor._id; // get the doctor id


    try {
        const { name, phone } = req.body; //destructure the name and phone from body
        let patient = await Patient.find({
            phone
        });

        if (patient.length > 0) { // if patient exists, return with patient info
            return res.status(200).json({
                success: true,
                body: patient[0]
            });
        }


        patient = await Patient.create({ // create patient document in db
            name,
            phone,
            doctor
        });

        return res.status(201).json({
            success: true,
            body: patient,
            message: 'Patient Registered Sucessfully!'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in registering patient, code => ${error.message}`,
        });
    }
};


module.exports.create_report = async function (req, res) {
    const doctor = req.doctor._id;
    try {
        const report = await Report.create({ // create report document in db
            doctor: doctor,
            patient: req.params.id,
            status: req.body.status
        });

        return res.status(200).json({
            success: true,
            report: report,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: ` Error in creating report, code => ${error.message}`,
        });
    }
}


module.exports.all_reports = async function (req, res) { //find patient with id and send report
    try {
        const reports = Report.find({ "patient": req.params.id });
        reports.exec(function (error, report) {
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: `Error in executing all reports query, code => ${error}`
                })
            }
            return res.status(200).json({
                success: true,
                reports: report
            });
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: ` Error in finding all reports, code => ${error.message}`,
        });
    }

}
