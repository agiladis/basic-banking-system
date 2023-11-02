const express = require('express');
const bankAccountRouter = express.Router();
const { Insert, GetAll } = require('../controller/bankAccount.controller');

bankAccountRouter.post('/', Insert);
bankAccountRouter.get('/', GetAll);

module.exports = bankAccountRouter;
