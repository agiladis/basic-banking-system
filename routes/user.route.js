const express = require('express');
const userRouter = express.Router();
const { Insert, Get } = require('../controller/user.controller');
const { CheckPostReq } = require('../middleware/middleware');

userRouter.post('/', CheckPostReq, Insert);
userRouter.get('/', Get);

module.exports = userRouter;
