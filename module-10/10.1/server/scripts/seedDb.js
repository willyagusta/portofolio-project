import db from '../db/dbconn.js';
import bcrypt from 'bcrypt';

const hashPassword = (password) => bcrypt.hashSync(password, 10);

// Define users with hashed passwords
const users = [
    { id: 1, name: 'Daisy', email: 'daisy@email.com', role: 'normal', password: hashPassword('12345') },
    { id: 2, name: 'Robert', email: 'robert@email.com', role: 'admin', password: hashPassword('12345') },
    { id: 3, name: 'Dane', email: 'dane@email.com', role: 'normal', password: hashPassword('12345') },
    { id: 4, name: 'Susan', email: 'susan@email.com', role: 'normal', password: hashPassword('12345') },
    { id: 5, name: 'Thompson', email: 'thompson@email.com', role: 'normal', password: hashPassword('12345') }
];

// Dynamically build the SQL insert statement for users
const seedUsers = `
    INSERT INTO users (id, name, email, role, created_at, updated_at, password)
    VALUES
    ${users.map(user => `(${user.id}, '${user.name}', '${user.email}', '${user.role}', NOW(), NOW(), '${user.password}')`).join(', ')}
`;

const seedBlogs = `
    INSERT INTO blogs (id, title, content, created_at, updated_at)
    VALUES
    (1, 'Title 1', 'Content 1', NOW(), NOW()),
    (2, 'Title 2', 'Content 2', NOW(), NOW()),
    (3, 'Title 3', 'Content 3', NOW(), NOW()),
    (4, 'Title 4', 'Content 4', NOW(), NOW()),
    (5, 'Title 5', 'Content 5', NOW(), NOW())
`;

async function seedDatabase() {
    try {
        await db.query('BEGIN');

        // Seeding users
        await db.query(seedUsers);
        const insertedUsers = await db.query('SELECT * FROM users');
        console.log('All Users in Database:', insertedUsers.rows);

        // Seeding blogs
        await db.query(seedBlogs);
        const insertedBlogs = await db.query('SELECT * FROM blogs');
        console.log('All Blogs in Database:', insertedBlogs.rows);

        await db.query('COMMIT');
        console.log('Data seeded successfully');
    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Error seeding database:', error);
    } finally {
        db.end();
    }
}

seedDatabase();