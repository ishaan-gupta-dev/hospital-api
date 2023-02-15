const express = require('express');
const { verifyToken } = require('../../../config/middleware');

const router = express.Router();
const reportController = require('../../../controllers/api/v1/report_controller');

router.get('/:status', verifyToken, reportController.report_by_status);

module.exports = router;