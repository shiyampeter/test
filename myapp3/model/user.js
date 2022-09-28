'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    //unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String
  }
});

/*UserSchema.pre('save',async function(next) { 
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(this.email);
    }

    catch(error){
    next(error)
    }
})*/

UserSchema.methods.comparePassword = function(password) {
    
  return bcrypt.compareSync(password, this.password);
};

module.exports=mongoose.model('User', UserSchema);