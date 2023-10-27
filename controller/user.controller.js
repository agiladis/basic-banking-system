const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');
const { func } = require('joi');

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

async function Get(req, res) {
  let resp = ResponseTemplate(null, 'success', null, 200);
  res.json(resp);
}

module.exports = { Insert, Get };
