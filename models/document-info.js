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
    filename : {
        type: String,
        required : true,
        trim : true
    }
 },{
    timestamps : true 
 }
);

const DocumentInfo = mongoose.model('document',documentSchema);
module.exports = DocumentInfo;