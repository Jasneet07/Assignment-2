const Users = require("../models/schemas/User");
const Job = require("../models/schemas/Job");

module.exports.dashboard = function (req, res, next) {
    res.render("employee_dashboard");
  };

module.exports.employee_details = function(req,res, next) {
  const {email} = req.user;

  Users.find({email : email})
  .then((user) => {
        const {email, full_name, highest_degree, phone_number, dob} = user[0];
        res.render("employee_details", {
          email,
          full_name,
          highest_degree,
          phone_number,
          dob,
          tab_detail : "tab_detail"
        });
  })
  .catch(err => console.log(err));
}

module.exports.employee_view_apply_jobs = function(req, res, next){
        Job.find({})
        .then((job) => {
              console.log(`Result`, job);
              res.render("employee_view_apply_jobs", {job, tab_view_apply_jobs : "tab_view_apply_jobs"});
        })
        .catch(err => console.log(err))
        
}

module.exports.employee_applied_jobs = function(req, res, next){
  res.render("employee_applied_jobs", {tab_applied_jobs : "tab_applied_jobs"});
}