const request = require('supertest');
const app = require('../app');

describe('app', () => {
  it('should export the express app correctly', () => {
    expect(app).toBeTruthy();
  });

  describe('GET /', () => {
    it('should respond to the GET method with 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /114', () => {
    it('should respond with a status of 200 to any valid surah number i.e. 1-114', async () => {
      const response = await request(app).get('/114');
      expect(response.statusCode).toBe(200)
    })
  })

  describe('GET /1/7', () => {
    it('should respond with a status of 200 to any valid verse number', async () => {
      const response = await request(app).get('/1/7');
      expect(response.statusCode).toBe(200)
    })
  })

  describe('GET /corpus/spider', () => {
    it('should respond with 200 for any searchTerm i.e spider in this case', async () => {
      const response = await request(app).get('/corpus/spider');
      expect(response.statusCode).toBe(200)
    })
  })

  describe('GET /corpus/invalidSearchTerm', () => {
    it('should display JSON with proper user friendly message', async () => {
      const response = await request(app).get('/corpus/invalidSearchTerm');
      expect(response.text).toBe('[{"total_matches ":0}]')
    })
  })

  describe('GET /404', () => {
    beforeEach(() => {
      // Avoid polluting the test output with 404 error messages
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should respond to the GET method with a 404 for a route that does not exist', async () => {
      const response = await request(app).get('/404');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('{"error":"resource not found"}');
    });

  });
});
