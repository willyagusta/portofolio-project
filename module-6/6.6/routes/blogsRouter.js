import express from 'express';
import db from '../db/dbconn.js'

const blogsRouter = express.Router();

//GET all blogs
blogsRouter.get ('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * from blogs');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

//GET single blog
blogsRouter.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query('SELECT * FROM blogs WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//POST blog
blogsRouter.post ('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const result = await db.query(
            'INSERT INTO blogs (title, content, user_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
            [title, content, user_id]
        );
        res.status(201).json(result.rows[0]);
    }   catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//UPDATE blog
blogsRouter.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const result = await db.query(
        'UPDATE blogs SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
        [title, content, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
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