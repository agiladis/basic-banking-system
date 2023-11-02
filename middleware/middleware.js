const { ResponseTemplate } = require('../helper/response.helper');
const Joi = require('joi');

function ValidateCreateUserRequest(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    identityType: Joi.string().required(),
    identityNumber: Joi.string().required(),
    address: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    let respErr = ResponseTemplate(
      null,
      'invalid request',
      error.details[0].message,
      400
    );
    return res.status(400).json(respErr);
  }

  next();
}

module.exports = { ValidateCreateUserRequest };
