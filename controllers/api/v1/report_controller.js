const Report = require('../../../models/report');

module.exports.report_by_status = async (req, res) => { //send report by status

    try {
        const reports = Report.find({ "status": req.params.status });
        reports.exec(function (error, report) {
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: `Error in executing report query by status, code => ${error}`
                })
            }
            return res.status(200).json({
                success: true,
                reports: report
            });
        });

    } catch (error) {
        return res.status(500).json({
            message: ` Error in finding reports by status, code => ${error.message}`,
        });
    }

}