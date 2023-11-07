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

transactionRoute.post('/', ValidateCreateTransactionRequest, Insert);
transactionRoute.get('/', GetAll);
transactionRoute.get('/:id', GetById);

module.exports = transactionRoute;
