const express = require('express');
const transactionRoute = express.Router();
const {
  Insert,
  GetAll,
  GetById,
} = require('../controller/transaction.controller');
const {
  ValidateCreateTransactionRequest,
} = require('../middleware/middleware');

/**
 * @openapi
 * components:
 *   schemas:
 *     BankDetail:
 *       type: object
 *       properties:
 *         bankName:
 *           type: string
 *           example: GoPay
 *         bankAccountNumber:
 *           type: integer
 *           example: 1699303624686
 *
 *     TransactionRequest:
 *       type: object
 *       properties:
 *         amount:
 *           type: integer
 *           example: 2000
 *         sourceAccountId:
 *           type: integer
 *           example: 5
 *         destinationAccountId:
 *           type: integer
 *           example: 1
 *
 *     TransactionResponse:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *         - $ref: '#/components/schemas/TransactionRequest'
 *         - type: object
 *           properties:
 *             createdAt:
 *               type: string
 *               example: 2023-11-06T06:32:31.301Z
 */

/**
 * @openapi
 * /transactions:
 *  post:
 *    summary: Create new Interbank Transaction
 *    tags:
 *      - Transactions
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#/components/schemas/TransactionRequest'
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
 *                  $ref: '#/components/schemas/TransactionResponse'
 */
transactionRoute.post('/', ValidateCreateTransactionRequest, Insert);

/**
 * @openapi
 * /transactions:
 *  get:
 *    summary: Get all Bank Transaction
 *    tags:
 *      - Transactions
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
 *                    $ref: '#/components/schemas/TransactionResponse'
 */
transactionRoute.get('/', GetAll);
transactionRoute.get('/:id', GetById);

module.exports = transactionRoute;
