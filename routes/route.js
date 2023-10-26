const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const userRouter = require('./user.route');

// HTTP request logger middleware
router.use(morgan('dev'));
router.use('/user', userRouter);

module.exports = router;
