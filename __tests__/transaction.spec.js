const base = require('../controller/transaction.controller');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('Transactions Endpoint', () => {
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
