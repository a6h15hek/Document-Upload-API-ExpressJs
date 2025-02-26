const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    documentId : {
        type: String,
        required : true,
        trim : true,
        unique : true
    },
    auther : {
        type: String,
        required : true,
        trim : true
    },
    filenamearray : [],
    clientIp : {
        type: String,
        trim : true
    },
    appName : {
        type: String,
        trim : true
    },
    authkey : {
        type: String,
        trim : true,
        required :true
    }
 },{
    timestamps : true 
 }
);

const DocumentInfo = mongoose.model('document',documentSchema);
module.exports = DocumentInfo;