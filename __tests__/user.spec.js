const base = require('../controller/user.controller');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

// const req = {
//   body: {
//     name: 'fake name',
//     email: 'fakeemail@gmail.com',
//     password: 'fakepassword',
//     identityType: 'KTP',
//     identityNumber: '32750',
//     address: 'Jl. fake address No. 01',
//   },
// };

// jest.mock('@prisma/client');

describe('Users Endpoint', () => {
  // describe('POST /users', () => {
  //   afterEach(() => {
  //     jest.clearAllMocks();
  //   });

  //   test('POSITIVE - should success create a user', async () => {
  //     // const mockUser = {
  //     //   name: 'fake name',
  //     //   email: 'fakeemail@gmail.com',
  //     //   password: 'fakepassword',
  //     //   identityType: 'KTP',
  //     //   identityNumber: '32750',
  //     //   address: 'Jl. fake address No. 01',
  //     // };
  //     // const req = mockRequest();
  //     // const res = mockResponse();

  //     const x = prisma.user.create.mockResolvedValue({
  //       id: 1,
  //       name: 'fake name',
  //       email: 'fakeemail@gmail.com',
  //       password: 'fakepassword',
  //       identityType: 'KTP',
  //       identityNumber: '32750',
  //       address: 'Jl. fake address No. 01',
  //     });
  //     // prisma.user.create.mockResolvedValueOnce(true);
  //     console.log(x);
  //     await base.Insert(req, res);
  //     // expect(newUser).toEqual({ id: 1, ...mockUser });
  //     expect(res.status).toHaveBeenCalledWith(201);
  //     // expect(res.json).toHaveBeenCalledTimes(1);
  //     // expect(res.json).toHaveBeenCalledWith(
  //     //   expect.objectContaining({
  //     //     status: 201,
  //     //     message: 'success',
  //     //     error: null,
  //     //     data: expect.any(Object),
  //     //   })
  //     // );
  //   });
  // });

  describe('GET /users', () => {
    test('POSITIVE - should return a list of users', async () => {
      const req = mockRequest();
      const res = mockResponse();

      await base.GetAll(req, res);
      expect(res.status).toBeCalledWith(200);
      // expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 200,
          message: 'success',
          error: null,
          data: expect.any(Array),
        })
      );
    });
  });

  describe('GET /users/{id}', () => {
    test('POSITIVE - should return specific user', async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = {
        id: 1,
      };

      await base.GetById(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 200,
          message: 'success',
          error: null,
          data: expect.any(Object),
        })
      );
    });
  });
});
