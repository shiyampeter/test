const Joi =require('joi');
Joi.objectId = require('joi-objectid')(Joi)


const validator = (schema) => (payload) =>
 schema.validate(payload, {abortEarly: false});


 const Schema=Joi.object().keys({
    subname: Joi.string().min(3).required(),
    extypeid: Joi.objectId().required()
}); 

exports.validateSubject = validator(Schema);