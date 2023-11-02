const express = require('express');
const bankAccountRouter = express.Router();
const { Insert } = require('../controller/bankAccount.controller');

bankAccountRouter.post('/', Insert);

module.exports = bankAccountRouter;
