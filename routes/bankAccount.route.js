const express = require('express');
const bankAccountRouter = express.Router();
const {
  Insert,
  GetAll,
  GetById,
} = require('../controller/bankAccount.controller');

bankAccountRouter.post('/', Insert);
bankAccountRouter.get('/', GetAll);
bankAccountRouter.get('/:id', GetById);

module.exports = bankAccountRouter;
