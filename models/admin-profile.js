const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminProfileSchema = new Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        type: String,
        required : true,
        trim : true
    },
    password : {
        type: String,
        required : true,
        trim : true
    },
    organization : {
        type: String,
        trim : true
    },
    authkey : {
        type: String,
        trim : true,
        required : true,
        unique : true
    }
 },{
    timestamps : true 
 }
);

const adminProfile = mongoose.model('admin-profile',adminProfileSchema);
module.exports = adminProfile;