const base = require('../controller/bankAccount.controller');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('Bank Account Endpoint', () => {
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
});
