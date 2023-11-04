const express = require('express');
const transactionRoute = express.Router();
const {
  Insert,
  GetAll,
  GetById,
} = require('../controller/transaction.controller');

transactionRoute.post('/', Insert);
transactionRoute.get('/', GetAll);
transactionRoute.get('/:id', GetById);

module.exports = transactionRoute;
