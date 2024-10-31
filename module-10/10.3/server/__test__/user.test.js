import request from 'supertest';
import app from '../index.js';
import { db, connectToDatabase, disconnectFromDatabase } from '../db/dbconn.js';
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
  await db.query('DELETE FROM users');
  console.log('[TEST SUITE] Cleaned up the users table');
});

describe('User API', () => {
  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    console.log(
      '[TEST] Sending POST request to /api/users to create a new user...'
    );
    const response = await request(app).post('/api/users').send(newUser);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    console.log('[TEST] Create user test passed successfully');
  });

  it('should get all users', async () => {
    console.log('[TEST] Creating test users...');
    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', ['User 1', 'user1@example.com', 'password1']);
    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', ['User 2', 'user2@example.com', 'password2']);
    console.log('[TEST] Test users created successfully');

    console.log(
      '[TEST] Sending GET request to /api/users to retrieve all users...'
    );
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
    const result = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', ['User 1', 'user1@example.com', 'password1']);
    const user = result.rows[0];
    console.log('[TEST] Test user created successfully');

    console.log(
      `[TEST] Sending GET request to /api/users/${user.id} to retrieve the user by ID...`
    );
    const response = await request(app).get(`/api/users/${user.id}`);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    console.log('[TEST] Retrieve single user by ID test passed successfully');
  });

  it('should update a user', async () => {
    console.log('[TEST] Creating a test user...');
    const result = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', ['User 1', 'user1@example.com', 'password1']);
    const user = result.rows[0];
    console.log('[TEST] Test user created successfully');

    const updatedUser = {
      name: 'Updated User',
      email: 'updateduser@example.com',
      password: 'updatedpassword',
    };

    console.log(
      `[TEST] Sending PUT request to /api/users/${user.id} to update the user...`
    );
    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .send(updatedUser);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
    console.log('[TEST] Update user test passed successfully');
  });

  it('should delete a user', async () => {
    console.log('[TEST] Creating a test user...');
    const result = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', ['User 1', 'user1@example.com', 'password1']);
    const user = result.rows[0];
    console.log('[TEST] Test user created successfully');

    console.log(
      `[TEST] Sending DELETE request to /api/users/${user.id} to delete the user...`
    );
    const response = await request(app).delete(`/api/users/${user.id}`);

    console.log('[TEST] Received response from the server');
    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(user.name);
    expect(response.body.email).toBe(user.email);
    console.log('[TEST] Delete user test passed successfully');
  });
});