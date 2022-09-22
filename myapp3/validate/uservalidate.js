const Joi =require('joi');
const validator = (schema) => (payload) =>
 schema.validate(payload, {abortEarly: false});


 const Schema=Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(3).required()
}); 

exports.validateUser = validator(Schema);