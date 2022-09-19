const Joi =require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validator = (schema) => (payload) =>
 schema.validate(payload, {abortEarly: false});


 const Schema=Joi.object().keys({
    extypeid: Joi.objectId().required(),
    subid: Joi.objectId().required(),
    studid: Joi.objectId().required(),
    mark: Joi.number().required(),

}); 

exports.validateExam = validator(Schema);