const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    docname : {
        type: String,
        required : true,
        trim : true
    },
    auther : {
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