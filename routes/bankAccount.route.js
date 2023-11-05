const express = require('express');
const bankAccountRouter = express.Router();
const {
  Insert,
  GetAll,
  GetById,
} = require('../controller/bankAccount.controller');
const {
  ValidateCreateBankAccountRequest,
} = require('../middleware/middleware');

bankAccountRouter.post('/', ValidateCreateBankAccountRequest, Insert);
bankAccountRouter.get('/', GetAll);
bankAccountRouter.get('/:id', GetById);

module.exports = bankAccountRouter;
