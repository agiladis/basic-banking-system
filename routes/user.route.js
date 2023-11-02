const express = require('express');
const userRouter = express.Router();
const {
  Insert,
  GetAll,
  GetById,
  Update,
  Delete,
} = require('../controller/user.controller');
const { ValidateCreateUserRequest } = require('../middleware/middleware');

userRouter.post('/', ValidateCreateUserRequest, Insert);
userRouter.get('/', GetAll);
userRouter.get('/:id', GetById);
userRouter.put('/:id', Update);
userRouter.delete('/:id', Delete);

module.exports = userRouter;
