const express = require('express');
const transactionRoute = express.Router();
const Insert = require('../controller/transaction.controller');

transactionRoute.post('/', Insert);
module.exports = transactionRoute;
