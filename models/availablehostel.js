const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//create schema
const availableSchema = new Schema({
block:{
    type:String,
    required:true
},
flat:{
    type:String,
    required:true
},
room1:{
    type:String,
    required:true
},

room2:{
    type:String,
   required:true
},
date:{
    type:Date,
    default:Date.now
}}
);
mongoose.model('availablehostels',availableSchema);