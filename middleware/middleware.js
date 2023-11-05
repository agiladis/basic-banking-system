const ResponseTemplate = require('../helper/response.helper');
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
      'invalid request body',
      error.details[0].message,
      400
    );
    return res.status(400).json(respErr);
  }

  next();
}

function ValidateUpdateUserRequest(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(50),
    email: Joi.string().email(),
    password: Joi.string(),
    identityType: Joi.string(),
    identityNumber: Joi.string(),
    address: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    let respErr = ResponseTemplate(
      null,
      'invalid request body',
      error.details[0].message,
      400
    );
    return res.status(400).json(respErr);
  }

  next();
}

function ValidateCreateBankAccountRequest(req, res, next) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    bankName: Joi.string().required(),
    balance: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        ResponseTemplate(
          null,
          'invalid request body',
          error.details[0].message,
          400
        )
      );
  }

  next();
}

function ValidateCreateTransactionRequest(req, res, next) {
  const schema = Joi.object({
    sourceAccountId: Joi.number().required(),
    destinationAccountId: Joi.number().required(),
    amount: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json(
        ResponseTemplate(
          null,
          'invalid request body',
          error.details[0].message,
          400
        )
      );
  }

  next();
}

module.exports = {
  ValidateCreateUserRequest,
  ValidateUpdateUserRequest,
  ValidateCreateBankAccountRequest,
  ValidateCreateTransactionRequest,
};
