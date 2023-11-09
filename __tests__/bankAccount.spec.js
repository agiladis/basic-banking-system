const base = require('../controller/bankAccount.controller');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('Bank Account Endpoint', () => {
  describe('POST /accounts', () => {
    test('POSITIVE - should created bank account and return 201', async () => {
      const req = mockRequest({
        userId: 1,
        bankName: 'Fake Bank',
        balance: 100000,
      });
      const res = mockResponse();

      await base.Insert(req, res);

      expect(res.status).toBeCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 201,
          message: 'success',
          error: null,
          data: expect.any(Object),
        })
      );
    });
  });

  describe('GET /accounts', () => {
    test('POSITIVE - should return a list of bank accounts', async () => {
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

  describe('GET /accounts/{id}', () => {
    test('Negative - should return 404 when specific user not found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params = {
        id: '',
      };

      await base.GetById(req, res);
      expect(res.status).toBeCalledWith(404);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 404,
          message: 'bank account not found',
          error: true,
          data: expect.any(Object),
        })
      );
    });

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
