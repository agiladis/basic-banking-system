const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');

const prisma = new PrismaClient();

async function Insert(req, res) {
  const { userId, bankName, balance } = req.body;
  const bankAccountNumber = Date.now().toString();

  try {
    const newBankAccount = await prisma.bankAccount.create({
      data: {
        userId: userId,
        bankName: bankName,
        bankAccountNumber: bankAccountNumber,
        balance: balance,
      },
    });

    let resp = ResponseTemplate(newBankAccount, 'success', null, 201);
    res.status(201).json(resp);
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function GetAll(req, res) {
  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      select: {
        id: true,
        userId: true,
        bankName: true,
        bankAccountNumber: true,
      },
    });

    let resp = ResponseTemplate(bankAccounts, 'success', null, 200);
    res.status(200).json(resp);
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function GetById(req, res) {
  const { id } = req.params;

  try {
    const bankAccount = await prisma.bankAccount.findUnique({
      select: {
        user: {
          select: {
            name: true,
          },
        },
        bankName: true,
        balance: true,
        sourceTransaction: true,
        destinationTransaction: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (!bankAccount) {
      return res
        .status(404)
        .json(ResponseTemplate(null, 'bank account not found', true, 404));
    }

    return res
      .status(200)
      .json(ResponseTemplate(bankAccount, 'success', null, 200));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { Insert, GetAll, GetById };
