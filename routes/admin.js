const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../models/formdb');
const employee = mongoose.model('add_employee');
const employeeController = require('../controller/employee');

router.post('/addnewrecord', employeeController.postaddEmployee);

router.post('/deleterecord', employeeController.postdeleteEmployee);

router.post('/getdata', employeeController.post_get_data_of_Employee);

router.post('/update', employeeController.updateEmployee);

router.post('/sendmail',employeeController.sendmail);

module.exports = router;