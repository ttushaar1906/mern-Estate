// User register

import request from 'supertest';
import User from "../src/models/user.module.js"
import './test.setup.js';
import app from "../index.js"

app.listen(3000, () => console.log('Server running'))

describe('User Registration - POST /signUp', () => {
  it('should successfully register a new user', async () => {
    const userPayload = {
      userName: 'JohnDoe',
      userEmail: 'john@example.com',
      mobileNo: 1234567890,
      password: 'password123',
    };

    const response = await request(app)
      .post('/signUp')
      .send(userPayload);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.userEmail).toBe(userPayload.userEmail);

    // Verify user saved in DB
    const userInDb = await User.findOne({ userEmail: userPayload.userEmail });
    expect(userInDb).not.toBeNull();
    expect(userInDb.userName).toBe(userPayload.userName);
  });

  it('should reject registration with already registered email or mobile', async () => {
    // Pre-create user
    await User.create({
      userName: 'JaneDoe',
      userEmail: 'jane@example.com',
      mobileNo: 9876543210,
      password: 'hashedpassword',
    });

    const response = await request(app)
      .post('/signUp')
      .send({
        userName: 'JaneDoe',
        userEmail: 'jane@example.com',
        mobileNo: 9876543210,
        password: 'anotherpassword',
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toMatch(/User Already registered/);
  });

  it('should fail registration with invalid or missing fields', async () => {
    const response = await request(app)
      .post('/signUp')
      .send({
        userName: '', // invalid empty username
        userEmail: 'invalidemail', // invalid email format
        mobileNo: '', // missing
        password: '',
      });

    expect(response.statusCode).toBe(400); // Adjust if your validation returns a different code
    expect(response.body.message).toBeDefined();
  });
});
