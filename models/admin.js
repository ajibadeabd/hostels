const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create schema
const AdminSchema = new Schema({
    code:{
    type:String,
    required:true
}
// ,
// details:{
//     type:String,
//     required:true
// }
,
password:{
    type: String,
    required: true
 }
//,  
// date:{
//     type:Date,
//     default:Date.now
// }
}
);
mongoose.model('adminn',AdminSchema);