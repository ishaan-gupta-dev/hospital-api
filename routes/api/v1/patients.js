const express = require('express');
const router = express.Router();
const patientController = require('../../../controllers/api/v1/patient_controller');
const { verifyToken } = require('../../../config/middleware');


router.post('/register', verifyToken, patientController.register);

router.post('/:id/create_report', verifyToken, patientController.create_report);
router.get('/:id/all_reports', verifyToken, patientController.all_reports);


module.exports = router;