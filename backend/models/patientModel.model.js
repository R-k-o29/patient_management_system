let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let patientSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true,
    },
    blood:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
    },
    dov:{
        type:Date,
        required:true,
    },
    chronic:{
        type:Boolean,
        required:true
    }
})

let patientModel = mongoose.model('patientData',patientSchema);
module.exports = patientModel;