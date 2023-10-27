const express = require('express');
const userRouter = express.Router();
const { Insert, GetAll } = require('../controller/user.controller');
const { CheckPostReq } = require('../middleware/middleware');

userRouter.post('/', CheckPostReq, Insert);
userRouter.get('/', GetAll);

module.exports = userRouter;
