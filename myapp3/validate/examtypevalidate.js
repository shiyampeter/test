const Joi =require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validator = (schema) => (payload) =>
 schema.validate(payload, {abortEarly: false});


 const Schema=Joi.object().keys({
    extypename: Joi.string().min(3).required(),
    exid: Joi.number().required()
}); 

exports.validateExamtype = validator(Schema);