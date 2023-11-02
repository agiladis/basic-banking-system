const express = require('express');
const userRouter = express.Router();
const {
  Insert,
  GetAll,
  GetById,
  Update,
} = require('../controller/user.controller');
const {
  ValidateCreateUserRequest,
  ValidateUpdateUserRequest,
} = require('../middleware/middleware');

userRouter.post('/', ValidateCreateUserRequest, Insert);
userRouter.get('/', GetAll);
userRouter.get('/:id', GetById);
userRouter.put('/:id', ValidateUpdateUserRequest, Update);
// userRouter.delete('/:id', Delete);

module.exports = userRouter;
