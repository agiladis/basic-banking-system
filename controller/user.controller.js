const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');

const prisma = new PrismaClient();

async function Insert(req, res) {
  const { name, email, password } = req.body;

  const payload = {
    name,
    email,
    password,
  };

  try {
    const user = await prisma.user.create({
      data: payload,
    });

    let resp = ResponseTemplate(user, 'success', null, 201);
    res.json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.json(resp);
    return;
  }
}

module.exports = { Insert };
