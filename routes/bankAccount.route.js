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
 *            bankAccountNumber:
 *              type: string
 *              example: 1699303624686
 *         - $ref: '#/components/schemas/BankRequest'
 *         - $ref: '#/components/schemas/LastActionResponse'
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

bankAccountRouter.post('/', ValidateCreateBankAccountRequest, Insert);
bankAccountRouter.get('/', GetAll);
bankAccountRouter.get('/:id', GetById);

module.exports = bankAccountRouter;
