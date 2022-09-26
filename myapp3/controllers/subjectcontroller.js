
const Model = require('../model/subject');
const Joi= require('joi');
const{validateSubject}= require('../validate/subjectvalidate');

const store = async(req,res,next) => {

    const {error, value} = validateSubject(req.body);
    if (error){
        console.log("error");
       // return res.send(error.details[0]);
        return res.json({success : false, message:"Validation error", error: [error.message]});
    }


    const data = new Model({
        subname: req.body.subname,
        extypeid:req.body.extypeid
    })

    try {
        const dataToSave = await data.save();
       // res.status(200).json(dataToSave)
        res.json({success : true, message: "Updated Successfully", status : 200, data: dataToSave});
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}


const viewall = async(req,res,next) => {
    
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const update = async(req,res,next) => {
    const {error, value} = validateSubject(req.body);
    if (error){
        console.log("error");
        return res.send(error.details[0]);
    }
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


//aggregate two tables
const viewaggregate = async(req,res,next) => {
    try{
        Model.aggregate([{
            $lookup:{
                from:"examtypes",
                localField:"extypeid",
                foreignField:"_id",
                as:"data"
            }
        }]).exec((err, result)=>{
            if (err) {
                res.json("error" ,err)
            }
            if (result) {
                res.json(result);
            }
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


const viewone = async(req,res,next) => {
    
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {viewall,store,update,erase,viewaggregate,viewone};

