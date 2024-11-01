import request from 'supertest';
import app from '../index.js';
import { db, connectToDatabase, disconnectFromDatabase, query as dbQuery } from '../db/dbconn.js';
import { POSTGRES_URL_TEST } from '../config.js';

jest.setTimeout(30000);

beforeAll(async () => {
  console.log('[TEST SUITE] Connecting to the test database...');
  await connectToDatabase(POSTGRES_URL_TEST);
  console.log('[TEST SUITE] Connected to the test database');
});

afterAll(async () => {
  console.log('[TEST SUITE] Disconnecting from the test database...');
  await disconnectFromDatabase();
  console.log('[TEST SUITE] Disconnected from the test database');
});

afterEach(async () => {
  console.log('[TEST SUITE] Cleaning up the users table...');
  await dbQuery('DELETE FROM users');
  console.log('[TEST SUITE] Cleaned up the users table');
});

describe('User API', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: 'admin'
    };

    console.log('[TEST] Sending POST request to /api/users to create a new user...');
    const response = await request(app).post('/api/users').send(newUser);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.role).toBe(newUser.role); // Check the role field
    console.log('[TEST] Create user test passed successfully');
  });

  it('should get all users', async () => {
    console.log('[TEST] Creating test users...');
    await dbQuery('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', ['User 1', 'user1@example.com', 'password1', 'user']);
    await dbQuery('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', ['User 2', 'user2@example.com', 'password2', 'user']);
    console.log('[TEST] Test users created successfully');

    console.log('[TEST] Sending GET request to /api/users to retrieve all users...');
    const response = await request(app).get('/api/users');

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    console.log('[TEST] Retrieve all users test passed successfully');
  });

  it('should get a single user by id', async () => {
    console.log('[TEST] Creating a test user...');
    const result = await dbQuery('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', ['User 1', 'user1@example.com', 'password1', 'user']);
    const user = result.rows[0];
    console.log('[TEST] Test user created successfully');

    console.log(`[TEST] Sending GET request to /api/users/${user.id} to retrieve the user by ID...`);
    const response = await request(app).get(`/api/users/${user.id}`);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    expect(response.body.role).toBe(user.role); // Check the role field
    console.log('[TEST] Retrieve single user by ID test passed successfully');
  });

  it('should update a user', async () => {
    console.log('[TEST] Creating a test user...');
    const result = await dbQuery('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', ['User 1', 'user1@example.com', 'password1', 'user']);
    const user = result.rows[0];
    console.log('[TEST] Test user created successfully');

    const updatedUser = {
      name: 'Updated User',
      email: 'updateduser@example.com',
      password: 'updatedpassword',
      role: 'admin'
    };

    console.log(`[TEST] Sending PUT request to /api/users/${user.id} to update the user...`);
    const response = await request(app).put(`/api/users/${user.id}`).send(updatedUser);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
    expect(response.body.role).toBe(updatedUser.role); // Check the role field
    console.log('[TEST] Update user test passed successfully');
  });

  it('should delete a user', async () => {
    console.log('[TEST] Creating a test user...');
    const result = await dbQuery('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', ['User 1', 'user1@example.com', 'password1', 'user']);
    const user = result.rows[0];
    console.log('[TEST] Test user created successfully');

    console.log(`[TEST] Sending DELETE request to /api/users/${user.id} to delete the user...`);
    const response = await request(app).delete(`/api/users/${user.id}`);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully'); // Check for a success message
    console.log('[TEST] Delete user test passed successfully');
  });
});