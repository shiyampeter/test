
const Model = require('../model/user');
const Joi= require('joi');
const { validateUser } = require('../validate/uservalidate');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const Hogan =require('hogan.js');
const fs = require('fs');
var template = fs.readFileSync('./views/index.hjs','utf-8');
var compiledTemplate=Hogan.compile(template);
//const hbs = require('nodemailer-express-handlebars');
const CLIENT_ID = '311600023632-ukcpltp1n3jagaaa19q8nsgrhs4v1ltn.apps.googleusercontent.com'
const CLIENT_SECRET =  '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04sSU5xK6BVPECgYIARAAGAQSNwF-L9IrkPq94qtWoCxUq1O3-H-D9RcpOi6cteGTRhfH_7oUu51bgIEx5sC8-XC74KL6q4qgnHA'
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})



//const User = require('../model/user');

const register = async(req,res,next) => {

  const {error, value} = validateUser(req.body);
    if (error){
        console.log("error");
       // return res.send(error.details[0]);
        return res.json({success : false, message:"Validation error", error: [error.message]});
    }
    //generate password
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    
   

    const data = new Model({
        fullName: req.body.fullName,
        email: req.body.email,
      
    
    })
    data.password=retVal;
    //bcrypt password
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
      //user.password = undefined;
      //send email
      const accesstoken = oAuth2Client.getAccessToken()
      let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type:'OAUTH2',
            user: 'mytestpetershiyam@gmail.com', 
            clientId: CLIENT_ID,
            clientSecret : CLIENT_SECRET,
            refreshToken : REFRESH_TOKEN,
            accessToken : accesstoken
          }
        });

        /*transporter.use('compile',hbs({
          viewEngine : 'express-handlebars',
          viewPath : './views/'

        }));*/
  
  
  
      var compose = {
          from: '"Aeroskop" <mytestpetershiyam@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "LOGIN CREDENTIALS", // Subject line
          text: "Password", // plain text body
          html : compiledTemplate.render({username:user.email,password:retVal,name:user.fullName})
          /*html: `<h3>Username : ${user.email}</h3><br><h3>Password : ${retVal}</h3><br>
                  <b>to login click www.google.com</b>`, // html body*/
  
  
      }
  
      transporter.sendMail(compose,(error,info) => {
          if(error){
              console.log(error)
          }
          else{
              console.log("success")
          }
      })
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