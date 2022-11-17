let mongoose = require( 'mongoose' );

var jobAppliedSchema = new mongoose.Schema({ 
    job_title : {type : String, required : true},
    email : {type : String, required : true}
})

module.exports = mongoose.model('Applied', jobAppliedSchema);