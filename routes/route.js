const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const userRouter = require('./user.route');
const bankAccountRouter = require('./bankAccount.route');

// HTTP request logger middleware
router.use(morgan('dev'));
router.use('/users', userRouter);
router.use('/accounts', bankAccountRouter);

module.exports = router;
