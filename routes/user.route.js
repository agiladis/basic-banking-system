const express = require('express');
const userRouter = express.Router();
const {
  Insert,
  GetAll,
  GetById,
  Update,
} = require('../controller/user.controller');
const { CheckPostReq } = require('../middleware/middleware');

userRouter.post('/', CheckPostReq, Insert);
userRouter.get('/', GetAll);
userRouter.get('/:id', GetById);
userRouter.put('/:id', Update);

module.exports = userRouter;
