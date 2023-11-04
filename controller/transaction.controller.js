const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');

const prisma = new PrismaClient();

async function Insert(req, res) {
  const { sourceAccountId, destinationAccountId, amount } = req.body;

  try {
    // check source bank account id not equal to destination bank account id
    if (sourceAccountId === destinationAccountId) {
      return res
        .status(400)
        .json(
          ResponseTemplate(
            null,
            'you cannot make transaction with yourself',
            null,
            404
          )
        );
    }

    // check source bank account id
    const sourceAccount = await prisma.bankAccount.findUnique({
      where: { id: Number(sourceAccountId) },
    });

    // error handler
    if (!sourceAccount) {
      return res
        .status(404)
        .json(
          ResponseTemplate(null, 'source bank account not found', null, 404)
        );
    }

    // check destination bank account id
    const destinationAccount = await prisma.bankAccount.findUnique({
      where: { id: Number(destinationAccountId) },
    });

    // error handler
    if (!destinationAccount) {
      return res
        .status(404)
        .json(
          ResponseTemplate(
            null,
            'destination bank account not found',
            null,
            404
          )
        );
    }

    // check balance from source bank account id greater than amount to transfer
    if (sourceAccount.balance < Number(amount)) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'Insufficient balance', null, 400));
    }

    // do transaction
    const transaction = await prisma.$transaction([
      // decrease the balance from source bank account
      prisma.bankAccount.update({
        where: { id: sourceAccountId },
        data: { balance: { decrement: Number(amount) } },
      }),

      // add destination bank account balance
      prisma.bankAccount.update({
        where: { id: destinationAccountId },
        data: { balance: { increment: Number(amount) } },
      }),

      // create transaction
      prisma.transaction.create({
        data: {
          sourceAccountId,
          destinationAccountId,
          amount,
        },
      }),
    ]);

    // create respons payload
    const transactionData = {
      id: transaction[2].id,
      amount: amount,
      sourceBankAccountNumber: transaction[0].bankAccountNumber,
      destinationBankAccountNumber: transaction[1].bankAccountNumber,
      createdAt: transaction[2].createdAt,
    };

    // give response if transaction completed
    return res
      .status(201)
      .json(
        ResponseTemplate(transactionData, 'transaction success', null, 201)
      );
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

async function GetAll(req, res) {
  try {
    const transactions = await prisma.transaction.findMany();

    return res
      .status(200)
      .json(ResponseTemplate(transactions, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

async function GetById(req, res) {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      select: {
        id: true,
        amount: true,
        createdAt: true,
        sourceAccount: {
          select: {
            bankName: true,
            bankAccountNumber: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        destinationAccount: {
          select: {
            bankName: true,
            bankAccountNumber: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    if (!transaction) {
      return res
        .status(404)
        .json(ResponseTemplate(null, 'transaction not found', null, 404));
    }

    return res
      .status(200)
      .json(ResponseTemplate(transaction, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { Insert, GetAll, GetById };
