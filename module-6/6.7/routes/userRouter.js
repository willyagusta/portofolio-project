import express from 'express';
import db from '../db/dbconn.js';

const usersRouter = express.Router();

//GET all users
usersRouter.get ('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//GET single user
usersRouter.get ('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM users WHERE id = $1, [id]');
    if (result.rows.length === 0) {
        return res.status(404).json({ error: error.message });
    }
});

//POST user
usersRouter.post ('/', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const result = await db.query(
            'INSERT INTO users (name, email, role, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()'
            [name, email, role]
        );
        res.status(201).json({ error: error.message });
    } catch (error) {
        res.status(400).json({ error: message.error });
    }
});


//UPDATE user
usersRouter.put ('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const result = await db.query(
            'UPDATE users SET name = $1, email = $2, role = $3, updated at = NOW(), WHERE id = $4 RETURNING *',
            [name, email, role, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: error.message});
        }
        res.json(result.rows[0]);
        
    }   catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//DELETE user
usersRouter.delete ('/blogs', (req,res) => {
    try{
        const { id } = req.params;
        const user = getUserById(id);
        if (!user) {
            return res.status(200).json({});
        }
        const deleted = deleteUser(user);
        console.log(`deleted blog: ${id}`)
        res.status(200).json(deleted);
    } catch (err) {
        return res.status(400).json({
            error: err.toString(),
        })
    }
})

export default usersRouter;