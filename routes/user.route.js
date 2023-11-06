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

/**
 * @openapi
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: success
 *                error:
 *                  type: object
 *                  example: null
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: Retno
 *                      email:
 *                        type: string
 *                        example: retno@gmail.com
 */
userRouter.get('/', GetAll);
userRouter.get('/:id', GetById);
userRouter.put('/:id', ValidateUpdateUserRequest, Update);
// userRouter.delete('/:id', Delete);

module.exports = userRouter;
