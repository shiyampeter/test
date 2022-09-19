const express = require('express');
const Model = require('../model/subject');
const router = express.Router();
const Joi= require('joi');
const{validateSubject}= require('../validate/subjectvalidate');


//Post Method
router.post('/post', async (req, res) => {
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
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
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
      });
        //const data = await Model.findById(req.params.id);
        //res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    const {error, value} = validateStudent(req.body);
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
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;