const Job = require("../models/schemas/Job");

module.exports.dashboard = function (req, res, next) {
  res.render("employer_dashboard");
};

module.exports.view_post_jobs = function (req, res, next) {
  res.render("employer_post_jobs",{post_tab_active: "post_tab_active"});
};

module.exports.add_post_jobs = function (req, res, next) {
  const {
    title,
    description,
    skills,
    experience,
    pay,
    location,
    company_name,
  } = req.body;
  let success_msg;
  let errors = [];
  let savedJob;

  const posted_by  = req.user.email;

  if (
    !title ||
    !description ||
    !skills ||
    !experience ||
    !location ||
    !company_name
  ) {
    errors.push({ msg: "Please add all the mandatory fields" });
    res.render("employer_post_jobs", { errors });
    return;
  }

  Job.findOne({ title })
    .then(function (result) {
      if (result) {
        errors.push({ msg: "Job with this title already exist" });
        res.render("employer_post_jobs", {
          errors,
          title,
          description,
          pay,
          skills,
          experience,
          location,
          company_name,
        });
      } else {
        const job = new Job({
          title,
          description,
          skills,
          experience,
          pay,
          location,
          company_name,
          posted_by
        });
        job
          .save()
          .then((result) => {
            success_msg = "Job is successfully saved!!";
            savedJob = { ...result };
            res.render("employer_post_jobs", { errors, savedJob, success_msg });
          })
          .catch((err) => errors.push({ msg: err }));
      }
    })
    .catch((error) => console.log(`Error`, error));
};

module.exports.view_jobs = function (req, res, next) {
        const columnConfiguration = [
                {
                        header: "Title",
                        accessor : "title"
                },
                {
                        header: "Description",
                        accessor : "description"
                },
                {
                        header: "Skills",
                        accessor : "skills"
                },
                {
                        header: "Experience",
                        accessor : "experience"
                },
                {
                        header: "Pay",
                        accessor : "pay"
                },
                {
                        header: "Location",
                        accessor : "location"
                },
                {
                        header: "Company Name",
                        accessor : "company_name"
                },
                {
                        header : "",
                        accessor : "",
                        type : "delete"
                }
        ];
        
  Job.find({posted_by : req.user.email})
  .then((result) => {
        if(result) {
                res.render("employer_view_jobs", {config : columnConfiguration, table_data : result, view_tab_active: "view_tab_active"});
        }      

  })
  .catch(err => console.log('Err', err))
};

module.exports.delete_jobs = (req,res, next) => {
      // const {id} = req.body;
      // Job.deleteOne({ id : id}, function (err) {
      //   if (err) {
      //     console.log(`Err`, err);
      //     return err
      //   }
      //   res.redirect("/empployer/dashboard")
      // });
      console.log(`Delete`);
      res.redirect("/employer/dashboard")
}