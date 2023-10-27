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

async function GetAll(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    let resp = ResponseTemplate(users, 'success', null, 200);
    res.json(resp);
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.json(resp);
    return;
  }
}

async function GetById(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    let resp = ResponseTemplate(user, 'success', null, 200);
    res.json(resp);
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.json(resp);
    return;
  }
}

async function Update(req, res) {
  const { name, email, password } = req.body;
  const { id } = req.params;
  // const payload = {};

  // if (!name && !email && !password) {
  //   let resp = ResponseTemplate(null, 'bad request', null, 400);
  //   res.json(resp);
  //   return;
  // }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      let resp = ResponseTemplate(null, "id doesn't exist", null, 404);
      res.json(resp);
      return;
    }

    const userUpdate = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    let resp = ResponseTemplate(userUpdate, 'success', null, 200);
    res.json(resp);
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.json(resp);
    return;
  }
}

module.exports = { Insert, GetAll, GetById, Update };
