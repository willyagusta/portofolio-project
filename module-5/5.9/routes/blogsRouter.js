import express from 'express';
import blogsRouter = express.Router();
import {
    blogs,
    addBlog,
    blogsFindById,
    updateBlog,
    deleteBlog,
} from '../data/blog.js';

//GET all blogs
app.get ('/blogs', function (req, res) {
    res.json(blogs)
})

//GET single blog
app.get ('/blogs/:id', function (req, res){
    const { id } = req.params;
    const blog = blogsFindById(id);
    if (!blog) {
        return res.status(404).json({ error: 'blog not found'});
    }
    res.status(200).json(blog)
})

//POST blog
app.post ('/blogs', (req, res) => {
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
app.put ('/blogs', (req,res) => {
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
app.delete ('/blogs', (req,res) => {
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