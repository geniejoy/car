import {} from 'jest';
import * as supertest from 'supertest';
const request = supertest('http://localhost:6868');

describe('GET /services', () => {
  it('should return 200 OK', done => {
    request.get('/services').expect(200, done);
  });
});
