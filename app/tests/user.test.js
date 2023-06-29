const request = require('supertest');
const app = require('../server'); // Import server
const UserController = require('../Controllers/UserController');

describe('User Endpoints', () => {
    it('should fetch all users', async () => {
      const res = await request(app)
        .get('/users') // This assumes your user routes are mounted at '/users' in your app file
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('users');
    })
  
    it('should fetch a single user', async () => {
      const userId = 1; // Replace with an actual user ID in your database
      const res = await request(app)
        .get(`/users/${userId}`)
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.id).toEqual(userId);
    })
  
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          // Add any other user fields you have
        })
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('user');
    })
  
    it('should update a user', async () => {
      const userId = 1; // Replace with an actual user ID in your database
      const res = await request(app)
        .put(`/users/${userId}`)
        .send({
          name: 'Updated User',
          // Add any other user fields you want to update
        })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.name).toEqual('Updated User');
    })
  
    it('should delete a user', async () => {
      const userId = 1; // Replace with an actual user ID in your database
      const res = await request(app)
        .delete(`/users/${userId}`)
      expect(res.statusCode).toEqual(204);
    })
  })