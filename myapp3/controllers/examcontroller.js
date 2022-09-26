
const Model = require('../model/exam');
const Joi= require('joi');
const { validateExam } = require('../validate/examvalidate');
const mongoose=require('mongoose');


//Post Method 
const store = async(req,res,next) => {
    const {error, value} = validateExam(req.body);
    if (error){
        console.log("error");
       // return res.send(error.details[0]);
        return res.json({success : false, message:"Validation error", error: [error.message]});
    }


    const data = new Model({
        extypeid: req.body.extypeid,
        subid: req.body.subid,
        studid: req.body.studid,
        mark:req.body.mark
    
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

//Get by two id's Method
//router.get('/getResult/:stid/:exid', async (req, res) => {
//router.get('/getResult', async (req, res) => {
 const viewdetail = async(req,res,next) => {
    try{
       
        const data = await Model.find({studid:req.params.stid,extypeid:req.params.exid});
        var total=0;
        for (i=0; i<data.length; i++){
        
            total+=data[i].mark;
        }




      Model.aggregate([

      { $match : { "studid" : mongoose.Types.ObjectId(req.params.stid) } },
           /* {$lookup:{
                from:"students",
                let : {"id": "_id"},
                pipeline: [
                    {
                        $match: {
                            "$expr":  {"$eq": ["$studid","$req.params.stid"]}
                                
                            }
                        }
                    
                ],
                as:"studentdata"
            }},
            {
                $unwind: "$studentdata"
            },*/
            

            { $lookup:{
                from:"examtypes",
                localField:"extypeid",
                foreignField:"_id",
                as:"examtypedata"
            }},

            {
                $unwind: "$examtypedata"
            },


              { $lookup:{
                    from:"students",
                    localField:"studid",
                    foreignField:"_id",
                    as:"studentdata"
                }},
                {
                    $unwind: "$studentdata"
                },
                
               // { $match : { "studentdata._id" : req.params.stid } },
            
                    { $lookup:{
                        from:"subjects",
                        localField:"subid",
                        foreignField:"_id",
                        as:"subjectdata"
                    }},

                    {
                        $unwind: "$subjectdata"
                    }
                
     ]).exec((err, result)=>{
            if (err) {
                res.json("error" ,err)
            }
            if (result) {
                var gradeca ={90 : "O" , 80 : "A+", 70 : "A" ,60 : "B+",50 : "B", 0 : "U"};
                var grade="grade";
                var sid=req.params.stid;
                var eid=req.params.exid;
                var submarks=new Object();
                var x=0;
                //var submarks = [];
                var totalmark=0;
               for(var i=0;i<result.length;i++){
                    if(result[i].studid==sid){
                        var sname=result[i].studentdata.name;
                        var rno=result[i].studentdata.rno;
                        var dept=result[i].studentdata.dept;
                    }
                    if(result[i].extypeid==eid){
                        var etype=result[i].examtypedata.extypename;
                    }
                    if((result[i].studid==sid)&(result[i].extypeid==eid)){
                       
                        var grades;
                        var t;
                        var it=new Object();
                        var y=result[i].subjectdata.subname;
                        z= result[i].mark;
                        it[y]=z;
                    
                        t=(Math. floor(z/10))*10;
                        grades=gradeca[t];
                        it[grade]=grades;
                        submarks[y]=it;
                        totalmark=totalmark+result[i].mark;
                        x=x+1;
                    }

               }
                    
                    
                   
                res.json({data : result,y:y,total:total,studentname:sname,Rollno:rno,department:dept,Examtype:etype,subjectmarks:submarks,Totalmarks:totalmark,length : result.length});
            }
      });
       
           
        
    
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
module.exports = module.exports = {viewall,store,update,erase,viewone,viewdetail};