const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee');

router.get('/', employeeController.getallEmployee);

module.exports = router;