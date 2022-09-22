const express = require('express');
const Model = require('../model/student');
const router = express.Router();
const Joi= require('joi');
const{validateStudent}= require('../validate/studentvalidate');
const { db } = require('../model/student');

//Post Method
router.post('/post', async (req, res) => {
    const {error, value} = validateStudent(req.body);
    if (error){
        console.log("error");
       // return res.send(error.details[0]);
        return res.json({success : false, message:"Validation error", error: [error.message]});
    }


    const data = new Model({
        name: req.body.name,
        rno: req.body.rno,
        dept:req.body.dept
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
        if(req.query.page&&req.query.limit){
            const data = await Model.paginate({},{page:req.query.page,limit:req.query.limit});
        //
             res.json(data)
        }
        else{
            const data = await Model.find();
            res.json(data);

        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get all Method using skip and limit
router.get('/get', async (req, res) => {
    try{
        if(req.query.page&&req.query.limit){
            var limit=req.query.limit;
            var page=req.query.page;
            const data = await Model.find().limit(limit).skip(page).sort( {_id:-1} );
        //
             res.json(data)
        }
        else{
            const data = await Model.find();
            res.json(data);

        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get all name starts with
router.get('/getdata/:name?/:rno?', async (req, res) => {
    try{
        
        if((req.params.name!=undefined)&&(req.params.rno!=undefined))
        {
        console.log("namerno");
        const data = await Model.find({name :  {$regex : `^${req.params.name}.*` , $options: 'i' },rno : req.params.rno});
        res.json(data)}

        else if(req.params.name!=undefined)
        {
        console.log("name");
        const data = await Model.find({name :  {$regex : `^${req.params.name}.*` , $options: 'i' }});
        res.json(data)}

        else if(req.params.rno!=undefined)
        {
        console.log("rno");
        const data = await Model.find({rno : req.params.rno });
        res.json(data)}
        else {
        console.log("no");
        const data = await Model.find();
        res.json(data)
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getname', async (req, res) => {
    try{
        
        if(req.query.name&&req.query.rno)
        {
        
        const data = await Model.find({name :  {$regex : `^${req.query.name}.*` , $options: 'i' },rno : req.query.rno});
        res.json(data)}

        else if(req.query.name)
        {
        
        const data = await Model.find({name :  {$regex : `^${req.query.name}.*` , $options: 'i' }});
        res.json(data)}

        else if(req.query.rno)
        {
        
        const data = await Model.find({rno : req.query.rno });
        res.json(data)}
        else {
        
        const data = await Model.find();
        res.json(data)
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        
        const data = await Model.findById(req.params.id);
        res.json(data)
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