const Joi =require('joi');
const validator = (schema) => (payload) =>
 schema.validate(payload, {abortEarly: false});


 const Schema=Joi.object().keys({
    name: Joi.string().min(3).required(),
    rno: Joi.number().required(),
    dept: Joi.string().min(3).required()
}); 

exports.validateStudent = validator(Schema);