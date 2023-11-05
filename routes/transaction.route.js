const express = require('express');
const transactionRoute = express.Router();
const {
  Insert,
  GetAll,
  GetById,
} = require('../controller/transaction.controller');
const {
  ValidateCreateTransactionRequest,
} = require('../middleware/middleware');

transactionRoute.post('/', ValidateCreateTransactionRequest, Insert);
transactionRoute.get('/', GetAll);
transactionRoute.get('/:id', GetById);

module.exports = transactionRoute;
