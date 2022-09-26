
const Model = require('../model/examtype');
const Joi= require('joi');
const { validateExamtype } = require('../validate/examtypevalidate');


//Post Method
const store = async(req,res,next) => {
    const {error, value} = validateExamtype(req.body);
    if (error){
       // return res.send(error.details[0]);
        return res.json({success : false, message:"Validation error", error: [error.message]});
    }


    const data = new Model({
        extypename: req.body.extypename,
        exid: req.body.exid,
    
    })

    try {
        const dataToSave = await data.save();
        res.json({success : true, message: "Updated Successfully", status : 200, data: dataToSave});
        //res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

//Get all Method
const viewall = async(req,res,next) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
//Get by ID Method
const viewone = async(req,res,next) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//Update by ID Method
const update = async(req,res,next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Delete by ID Method
const erase = async(req,res,next) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = {viewall,store,update,erase,viewone};
