import express from 'express';
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} from '../db/blogQueries.js';

const blogsRouter = express.Router();

// GET all blogs
blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await getAllBlogs();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single blog
blogsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await getBlogById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST blog
blogsRouter.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = await createBlog(title, content);
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE blog
blogsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedBlog = await updateBlog(id, title, content);
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE blog
blogsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await deleteBlog(id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(deletedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default blogsRouter;