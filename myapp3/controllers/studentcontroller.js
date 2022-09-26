
const Model = require('../model/student');
const Joi= require('joi');
const{validateStudent}= require('../validate/studentvalidate');
const authenticate = require('../middlewares/authenticate')

//Post Method
const store = async(req,res,next) => {
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
}

//Get all Method using npm paginate v2
const viewbypage = async(req,res,next) => {
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
}
//Get all Method using skip and limit
const viewpage = async(req,res,next) => {
    try{
        var limit=req.query.limit;
        var page=req.query.page;
        
        if(req.query.page&&req.query.limit){
           
            const data = await Model.find().limit(limit).skip((page-1)*limit).sort( {_id:-1} );
            count=data.length;
        
             res.json({data,count})
        }
        else{
            const data = await Model.find();
            count=data.length;
            res.json({data,count});

        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
//Get all name starts with
const viewbyname = async(req,res,next) => {
    try{
        
        if((req.params.name!=undefined)&&(req.params.rno!=undefined))
        {
        
        const data = await Model.find({name :  {$regex : `^${req.params.name}.*` , $options: 'i' },rno : req.params.rno});
        res.json(data)}

        else if(req.params.name!=undefined)
        {
       
        const data = await Model.find({name :  {$regex : `^${req.params.name}.*` , $options: 'i' }});
        res.json(data)}

        else if(req.params.rno!=undefined)
        {
       
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
}

const viewbyoption = async(req,res,next) => {
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
    const {error, value} = validateStudent(req.body);
    if (error){
      
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
module.exports = {store,update,erase,viewone,viewbypage,viewpage,viewbyname,viewbyoption};