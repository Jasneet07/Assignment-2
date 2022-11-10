let express = require('express');
let {ensureAuthenticated} = require('../config/auth');
let router = express.Router();


let employee = require("../controllers/employee");


router.get("/dashboard", ensureAuthenticated, employee.dashboard);

// router.get("/post_jobs",ensureAuthenticated, employer.view_post_jobs);

// router.post("/post_jobs",employer.add_post_jobs)

// router.get("/view_jobs",ensureAuthenticated, employer.view_jobs)

// router.delete("/delete_jobs",employer.delete_jobs);

module.exports = router;