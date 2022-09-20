const express = require('express');
const Model = require('../model/user');
const router = express.Router();
const Joi= require('joi');
//const { validateExam } = require('../validate/examvalidate');
const mongoose=require('mongoose');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//const User = require('../model/user');

router.post('/post/register', async (req, res) => {
    const data = new Model({
        fullName: req.body.fullName,
        email: req.body.email,
        hash_password: req.body.hash_password,
    
    })
    try {
        data.hash_password = bcrypt.hashSync(req.body.password, 10);
        const dataToSave = await data.save();
        res.json({success : true, message: "Updated Successfully", status : 200, data: dataToSave});
        //res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
 /* Model.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });*/
    

/*router.post('/post/sign_in', async (req, res) => {
   
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
          return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
      });
    });


router.post('/post/loginRequired', async (req, res, next) => {
   
        if (req.user) {
            next();
          } else {
        
            return res.status(401).json({ message: 'Unauthorized user!!' });
          }
});*/
module.exports = router;