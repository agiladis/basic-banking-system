const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');

const prisma = new PrismaClient();

async function Insert(req, res) {
  const { name, email, password, identityType, identityNumber, address } =
    req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        profile: {
          create: {
            identityType,
            identityNumber,
            address,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    let resp = ResponseTemplate(newUser, 'success', null, 201);
    return res.status(201).json(resp);
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, 'cek internal server error', error, 500);
    return res.status(500).json(resp);
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

async function Delete(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    let resp = ResponseTemplate(null, 'success', null, 200);
    res.json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, 'internal server error', error, 500);
    res.json(resp);
    return;
  }
}

module.exports = { Insert, GetAll, GetById, Update, Delete };
