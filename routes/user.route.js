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

/**
 * @openapi
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Retno
 *         email:
 *           type: string
 *           example: retno@gmail.com
 *
 *     UserRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/UserResponse'
 *         - type: object
 *           properties:
 *             password:
 *               type: string
 *               example: retnopassword
 *
 *     Profile:
 *       type: object
 *       properties:
 *         identityType:
 *           type: string
 *           example: KTP
 *         identityNumber:
 *           type: string
 *           example: 3265043
 *         address:
 *           type: string
 *           example: JL. Sahaabat 04
 *
 *     ProfileReq:
 *       type: object
 *       properties:
 *         identityType:
 *           type: string
 *           example: KTP
 *         identityNumber:
 *           type: string
 *           example: 3265043
 *         address:
 *           type: string
 *           example: JL. Sahaabat 04
 *
 *     UserProfileResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UserResponse'
 *         - type: object
 *           properties:
 *             profile:
 *               $ref: '#/components/schemas/Profile'
 *
 *     LastActionResponse:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *           example: 2023-11-06T06:32:31.301Z
 *         updatedAt:
 *           type: string
 *           example: 2023-11-06T06:32:31.301Z
 */

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Create new User and its Profile
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#/components/schemas/UserRequest'
 *              - $ref: '#/components/schemas/Profile'
 *    responses:
 *      201:
 *        description: created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 201
 *                message:
 *                  type: string
 *                  example: success
 *                error:
 *                  type: object
 *                  example: null
 *                data:
 *                  allOf:
 *                    - type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 1
 *                    - $ref: '#/components/schemas/UserProfileResponse'
 *                    - $ref: '#/components/schemas/LastActionResponse'
 */
userRouter.post('/', ValidateCreateUserRequest, Insert);

/**
 * @openapi
 * /users:
 *  get:
 *    summary: Get all User and its Profile
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
 *                    allOf:
 *                      - type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                            example: 1
 *                      - $ref: '#/components/schemas/UserResponse'
 */
userRouter.get('/', GetAll);

userRouter.get('/:id', GetById);
userRouter.put('/:id', ValidateUpdateUserRequest, Update);
// userRouter.delete('/:id', Delete);

module.exports = userRouter;
