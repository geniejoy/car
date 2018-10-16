import {} from 'jest';
import * as supertest from 'supertest';

const request = supertest('http://localhost:6868');

describe('GET /services/api', () => {
  it('should return 200 OK', () => {
    request.get('/services/api').expect(200);
  });
});
