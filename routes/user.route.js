const express = require('express');
const userRouter = express.Router();
const { Insert } = require('../controller/user.controller');

userRouter.post('/', Insert);

module.exports = userRouter;
