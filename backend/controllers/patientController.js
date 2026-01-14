let patientModel = require('../models/patientModel.model');

let insertPatient = (req,res)=>{
    let {id,name,dob,blood,contact,dov,chronic} = req.body;
    let insertObj = new patientModel({id,name,dob,blood,contact,dov,chronic});
    insertObj.save().then(()=>{
        res.send({
            status:1,
            msg:"Data inserted successfully",
            insertObj
        })
    }).catch((err)=>{
        res.send({
            status:0,
            msg:"Data insertion failed",
            err
        })
    })
}

let viewPatient = async(req,res)=>{
    let viewRes = await patientModel.find();
    res.send({
        status:1,
        msg:"Data inserted successfully",
        viewRes
    })
}

let deletePatient = async(req,res)=>{
    let id = req.params.id;
    let delRes = await patientModel.deleteOne({_id:id});
    res.send({
        status:1,
        msg:"Data deleted successfully",
        delRes
    })
}

let updatePatient = async(req,res)=>{
    let objid = req.params.id;
    let {id,name,dob,blood,contact,dov,chronic} = req.body;
    let updateObj = {id,name,dob,blood,contact,dov,chronic}
    let updateRes = await patientModel.updateOne({_id:objid},updateObj);
    res.send({
        status:1,
        msg:"Data updated successfully",
        updateRes
    })
}

let viewSinglePatient = async(req,res)=>{
    let id=req.params.id;
    let viewRes=await patientModel.findById({_id:id});
    res.send({
        status:1,
        msg:"Patient details : ",
        viewRes
    })
}

module.exports = {insertPatient,viewPatient,deletePatient,updatePatient,viewSinglePatient};