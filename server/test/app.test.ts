import {} from 'jest';
import * as supertest from 'supertest';
const request = supertest('http://localhost:6868');

describe('GET /random-url', () => {
  it('should return 404', done => {
    request.get('/reset').expect(404, done);
  });
});
