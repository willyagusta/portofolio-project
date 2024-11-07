import request from 'supertest';
import app from '../index.js';
import { connectToDatabase, disconnectFromDatabase, dbQuery } from '../db/dbconn.js';
import seedDatabase from '../scripts/seedDb.js';
import { deleteUser } from '../db/userQueries.js';
import { db } from '../db/dbconn.js';

jest.setTimeout(30000);

beforeAll(async () => {
  console.log('[TEST SUITE] Connecting to the test database...');
  await connectToDatabase();
  console.log('[TEST SUITE] Connected to the test database');

  await seedDatabase(); // Seed the user before running tests
});

afterAll(async () => {
  await deleteUser(); // Clean up the user after tests
  console.log('[TEST SUITE] Disconnecting from the test database...');
  await disconnectFromDatabase();
  console.log('[TEST SUITE] Disconnected from the test database');
});

describe('Auth API', () => {
    it('should log in a user with valid credentials', async () => {
      const loginCredentials = {
        email: 'thompson@email.com',
        password: '12345',
      };
  
      console.log('[TEST] Sending POST request to /api/login with valid credentials...');
      const response = await request(app)
        .post('/api/login')
        .send(loginCredentials);
  
      console.log('[TEST] Response received from /api/login');
      console.log('[TEST] Response status:', response.status);
      console.log('[TEST] Response body:', response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('login successful');
      expect(response.body.data.user.email).toBe(loginCredentials.email);
      expect(response.body.data.token).toBeDefined();
      console.log('[TEST] Login with valid credentials test passed');
      
    });
  
    it('should check if the user exists in the database', async () => {
        const user = await dbQuery('SELECT * FROM users WHERE email = $1', ['thompson@email.com']);
        expect(user.rows.length).toBe(1); // Ensure that the user is seeded
    });

    it('should fail to log in a user with invalid credentials', async () => {
      const loginCredentials = {
        email: 'john.doe@example.com',
        password: 'wrongpassword',
      };
  
      console.log('[TEST] Sending POST request to /api/login with invalid credentials...');
      const response = await request(app)
        .post('/api/login')
        .send(loginCredentials);
  
      console.log('[TEST] Response received from /api/login');
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('username or password invalid');
      console.log('[TEST] Login with invalid credentials test passed');
    });
  });