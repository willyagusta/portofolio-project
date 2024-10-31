import validator from 'validator';
import db from '../db/dbconn.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

//Validate user credentials
async function authenticateUser({ email, password }) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0];
    if (user && user.password === password) {
        return user;
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if(!passwordValid) {
        console.log('invalid password for user: ', email);
        return;
    }

     //Generate a JWT token
     const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '4h' }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}

//Test valid token from a user
export function isAuthenticated(req) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log('=== debug: auth token received: ', token);
        if (!token) {
            return false;
        }
        return jwt.verify(token, JWT_SECRET);
    }   catch (err) {
        console.log('authentication error: ', err.message);
    }
}

// Log in the user by email and password. Sets cookie with user details on success
export async function login({ res, req }) {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('email and password are required');
    }
    // Input validation
    const emailValid = validator.isEmail(email);
    const passwordValid = !validator.isEmpty(password);
    if (!emailValid || !passwordValid) {
        throw new Error('email or password is invalid')
    }

    // Authenticate user by password
    const result = await authenticateUser({ email, password });
    if(!result) {
        throw new Error('username or password invalid');
    }

    const { user, token } = result;
    return {user, token};
}