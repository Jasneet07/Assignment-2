let express = require('express');
let {ensureAuthenticated} = require('../config/auth');
let router = express.Router();


let employee = require("../controllers/employee");


router.get("/dashboard", ensureAuthenticated, employee.dashboard);

router.get("/view_details", ensureAuthenticated, employee.employee_details);

router.get("/view_apply_jobs", ensureAuthenticated, employee.employee_view_apply_jobs);

router.get("/applied_jobs", ensureAuthenticated, employee.employee_applied_jobs);

module.exports = router;