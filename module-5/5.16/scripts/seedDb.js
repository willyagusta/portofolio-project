import mongoose from 'mongoose';
import User from '../models/user-scheme.js';
import Blog from '../models/blog-scheme.js';
import connectDB from '../db/dbconn.js'

async function seedDataBase() {
    await connectDB();

    const users = [
        {
            name: 'James',
            email: 'james@test.com',
            role: 'admin',
        },
        {
            name: 'Daisy',
            email: 'daisy@test.com',
            role: 'normal',
        },

    ];

    const blogs = [
        {
            title: 'First article',
            content: 'this is your first article. Finish your payment to add more articles.',
        },
        {
            title: 'Second article',
            content: 'this is your second article. Finish your payment to add more articles.',
        },
    ];

    try {
        const insertedUsers = await User.insertMany(users);
        console.log('User seeded: ', insertedUsers);

        const blogWithUsers = blogs.map((blog, index) => {
            blog.user = insertedUsers[index]._id;
            return blog;
        });

        const insertedBlogs = await Blog.insertMany(blogs);
        console.log('Blog seeded: )', insertedBlogs);
    }
    catch (error) {
        console.error('Error seeding database: ', error)
    }
    finally {
        mongoose.connection.close();
    }

}

seedDataBase();