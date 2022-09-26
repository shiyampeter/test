
const Model = require('../model/user');
const Joi= require('joi');
const { validateUser } = require('../validate/uservalidate');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//const User = require('../model/user');

const register = async(req,res,next) => {

  const {error, value} = validateUser(req.body);
    if (error){
        console.log("error");
       // return res.send(error.details[0]);
        return res.json({success : false, message:"Validation error", error: [error.message]});
    }

    const data = new Model({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    
    })
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(data.password,salt);
    data.password=hashedpassword;
    //data.hash_password = bcrypt.hashSync(req.body.password, 10);
    data.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.password = undefined;
      return res.json(user);
    }
    })
}
   /* 
    
    const data = new Model({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    
    })
    try {
        data.password = bcrypt.hashSync(req.body.password, 10);
        const dataToSave = await data.save();
        res.json({success : true, message: "Updated Successfully", status : 200, data: dataToSave});
        //res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})*/
 

const login = async(req,res,next) => {
   
    Model.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
          return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
      });
    }


    const loginrequired = async(req,res,next) => {
   
        if (req.user) {
            next();
          } else {
        
            return res.status(401).json({ message: 'Unauthorized user!!' });
          }
}

const profile = async(req,res,next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
}
module.exports = {register,login,loginrequired,profile};