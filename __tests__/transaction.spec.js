const base = require('../controller/transaction.controller');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('Transactions Endpoint', () => {
  describe('POST /transactions', () => {
    test('NEGATIVE - should return 400 when doing transaction on yourself', async () => {
      const req = mockRequest({
        amount: 15000,
        sourceAccountId: 1,
        destinationAccountId: 1,
      });
      const res = mockResponse();

      await base.Insert(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 400,
          message: 'you cannot make transaction with yourself',
          error: null,
          data: null,
        })
      );
    });

    test('NEGATIVE - should return 404 when source bank account not found', async () => {
      const req = mockRequest({
        amount: 15000,
        sourceAccountId: '',
        destinationAccountId: 1,
      });
      const res = mockResponse();

      await base.Insert(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 404,
          message: 'source bank account not found',
          error: null,
          data: null,
        })
      );
    });

    test('NEGATIVE - should return 404 when destination bank account not found', async () => {
      const req = mockRequest({
        amount: 15000,
        sourceAccountId: 1,
        destinationAccountId: '',
      });
      const res = mockResponse();

      await base.Insert(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 404,
          message: 'destination bank account not found',
          error: null,
          data: null,
        })
      );
    });

    test('POSITIVE - should created new interbank transaction and return 201', async () => {
      const req = mockRequest({
        amount: 15000,
        sourceAccountId: 1,
        destinationAccountId: 2,
      });
      const res = mockResponse();

      await base.Insert(req, res);

      expect(res.status).toBeCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith(
        expect.objectContaining({
          status: 201,
          message: 'transaction success',
          error: null,
          data: expect.any(Object),
        })
      );
    });
  });

  describe('GET /transactions', () => {
    test('POSITIVE - should return a list of interbank transaction', async () => {
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

  describe('GET /transactions/{id}', () => {
    test('Negative - should return 404 when specific transaction not found', async () => {
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
          message: 'transaction not found',
          error: null,
          data: expect.any(Object),
        })
      );
    });

    test('POSITIVE - should return specific transaction', async () => {
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
