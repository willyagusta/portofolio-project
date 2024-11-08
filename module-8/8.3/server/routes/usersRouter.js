import express from 'express';
import db from '../db/dbconn.js';
import { getAllUsers, getUserById, createUser, deleteUser } from '../db/userQueries.js'


const usersRouter = express.Router();

//GET all users
usersRouter.get ('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//GET single user
usersRouter.get ('/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
        return res.status(404).json({ error: error.message });
    }
    res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

//POST user
usersRouter.post ('/', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const newUser = await db.query(
            'INSERT INTO users (name, email, role, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()'
            [name, email, role]
        );
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: message.error });
    }
});


//UPDATE user
usersRouter.put ('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        const updatedUser = await updateUser (id, name, email, role);
        if (!updatedUser) {
            return res.status(404).json({ error: error.message});
        }
        res.json(updatedUser);
        
    }   catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//DELETE user
usersRouter.delete ('/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const deletedUser = await deleteUser(id);
        if(!deletedUser) {
            return res.status(404).json({ error: 'User not found'});
        }
        res.json(deletedUser);
    } catch (err) {
        res.status(404).json({ error: error.message});
    }
})

export default usersRouter;