import db from '../db/dbconn.js';

const seedUsers = `
    INSERT INTO users (id, name, email, role, created_at, updated_at)
    VALUES
    (001, 'Daisy', 'daisy@email.com', 'normal', NOW(), NOW()),
    (002, 'Robert', 'robert@email.com', 'admin', NOW(), NOW()),
    (003, 'Dane', 'dane@email.com', 'normal', NOW(), NOW()),
    (004, 'Susan', 'susan@email.com', 'normal', NOW(), NOW()),
    (005, 'Thompson', 'thompson@email.com', 'normal', NOW(), NOW())
`;

const seedBlogs = `
    INSERT INTO blogs (id, title, content, created_at, updated_at)
    VALUES
    (001, 'Title 1', 'Content 1', NOW(), NOW()),
    (002, 'Title 2', 'Content 2', NOW(), NOW()),
    (003, 'Title 3', 'Content 3', NOW(), NOW()),
    (004, 'Title 4', 'Content 4', NOW(), NOW()),
    (005, 'Title 5', 'Content 5', NOW(), NOW())
`;

async function seedDatabase() {
    try {
        await db.query('BEGIN');

        // Seeding users
        await db.query(seedUsers);
        const insertedUsers = await db.query('SELECT * FROM users');
        console.log('All Users in Database:', insertedUsers.rows);

        //Seeding blogs
        await db.query(seedBlogs);
        const insertedBlogs = await db.query('SELECT * FROM blogs');
        console.log('All Blogs in Database:', insertedBlogs.rows);

        await db.query('COMMIT');
        console.log('Data seeded successfully');
 ;   }  catch (error) {
        await db.query('ROLLBACK');
        console.error('Error seeding database:', error);
     }  finally{
        db.end();
     }
}

seedDatabase();