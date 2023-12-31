const express = require('express');
const bankAccountRouter = express.Router();
const {
  Insert,
  GetAll,
  GetById,
} = require('../controller/bankAccount.controller');
const {
  ValidateCreateBankAccountRequest,
} = require('../middleware/middleware');

/**
 * @openapi
 * components:
 *   schemas:
 *     BankRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           example: 5
 *         bankName:
 *           type: string
 *           example: GoPay
 *         balance:
 *           type: integer
 *           example: 100000
 *
 *     BankResponse:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 5
 *             bankAccountNumber:
 *               type: string
 *               example: 1699303624686
 *         - $ref: '#/components/schemas/BankRequest'
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         amount:
 *           type: integer
 *           example: 2000
 *         sourceAccountId:
 *           type: integer
 *           example: 5
 *         destinationAccountId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           example: 2023-11-06T06:32:31.301Z
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
 * /accounts:
 *  post:
 *    summary: Create new Bank Accounts
 *    tags:
 *      - Bank Accounts
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#/components/schemas/BankRequest'
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
 *                    - $ref: '#/components/schemas/BankResponse'
 *                    - $ref: '#/components/schemas/LastActionResponse'
 */
bankAccountRouter.post('/', ValidateCreateBankAccountRequest, Insert);

/**
 * @openapi
 * /accounts:
 *  get:
 *    summary: Get all Bank Accounts
 *    tags:
 *      - Bank Accounts
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
 *                    $ref: '#/components/schemas/BankResponse'
 */
bankAccountRouter.get('/', GetAll);

/**
 * @openapi
 * /accounts/{id}:
 *  get:
 *    summary: Get Bank Accounts by User ID
 *    tags:
 *      - Bank Accounts
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
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
 *                  type: object
 *                  properties:
 *                    user:
 *                      type: object
 *                      properties:
 *                        name:
 *                    bankName:
 *                      type: string
 *                      example: GoPay
 *                    balance:
 *                      type: integer
 *                      example: 100000
 *                    sourceTransaction:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Transaction'
 *                    destinationAccountId:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Transaction'
 *
 */
bankAccountRouter.get('/:id', GetById);

module.exports = bankAccountRouter;
