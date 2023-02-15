const express = require('express');

const router = express.Router();
const reportController = require('../../../controllers/api/v1/report_controller');

router.get('/:status', reportController.report_by_status);

module.exports = router;