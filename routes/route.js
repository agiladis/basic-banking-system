const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const userRouter = require('./user.route');
const bankAccountRouter = require('./bankAccount.route');
const transactionRoute = require('./transaction.route');

// HTTP request logger middleware
router.use(morgan('dev'));
router.use('/users', userRouter);
router.use('/accounts', bankAccountRouter);
router.use('/transactions', transactionRoute);

module.exports = router;
