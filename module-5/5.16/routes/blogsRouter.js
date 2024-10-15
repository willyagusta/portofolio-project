import express from 'express';
const blogsRouter = express.Router();
import {
    blogs,
    addBlog,
    blogsFindById,
    updateBlog,
    deleteBlog,
} from '../data/blog.js';

//GET all blogs
blogsRouter.get ('/', function (req, res) {
    res.json(blogs)
})

//GET single blog
blogsRouter.get ('/:id', function (req, res){
    const { id } = req.params;
    const blog = blogsFindById(id);
    if (!blog) {
        return res.status(404).json({ error: 'blog not found'});
    }
    res.status(200).json(blog)
})

//POST blog
blogsRouter.post ('/', (req, res) => {
    try {
        const { title, content } = req.body;
        if ( !title | !content ) {
            throw new Error('Either title or content is not there')
        }
        const blog = newBlog({ title, content });
        addBlog(blog);
        console.log ('posted blog: ', blog)
    }   catch (err) {
        return res.status(404).json({
            message: `invalid request: ${err.message}`,
        });
    }
    res.json(blogs)
});


//UPDATE blog
blogsRouter.put ('/:id', (req,res) => {
    try {
        const id = toInt(req.params.id);
        const { title, body } = req.body;
        if ( !title | !content ) {
            throw new Error('Either title or content is not there')
        }
        const existing = blogsFindById(id);
        const updated = { ...existing, id, title, content }
        blogsUpdatebyId(updated);
        console.log(`udpated blog: ${updated}`);
        res.status(200).json(updated);
    }   catch (err) {
        return res.status(400).json({
            error: err.toString(),
        })
    } 
});


//DELETE blog
blogsRouter.delete ('/:id', (req,res) => {
    try{
        const id = toInt(req.params.id);
        const blog = blogsFindById(id);
        deleteBlog(id);
        console.log(`deleted blog: ${id}`)
        res.status(200).json(blog || {});
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        })
    }
})

export default blogsRouter;