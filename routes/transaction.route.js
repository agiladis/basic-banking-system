const express = require('express');
const transactionRoute = express.Router();
const { Insert, GetAll } = require('../controller/transaction.controller');

transactionRoute.post('/', Insert);
transactionRoute.get('/', GetAll);

module.exports = transactionRoute;
