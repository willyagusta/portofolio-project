import express from 'express';
const usersRouter = express.Router();
import {
    VALID_ROLES,
    isValid,
    sortById,
    getUser,
    userExists,
    deleteUser,
    updateUser,
    getUserByEmail,
    getUserById,
    usersMaxId,
    addUser,
} from '../data/users.js';

//GET all users
usersRouter.get ('/', function (req, res) {
    const data = getUser();
    res.json(data)
})

//GET single user
usersRouter.get ('/:id', function (req, res){
    const { id } = req.params;
    const user = getUserById(id);
    if (!user) {
        return res.status(404).json({ error: 'user not found'});
    }
    res.status(200).json(blog)
})

//POST user
usersRouter.post ('/', (req, res) => {
    try {
        const { name, email, role } = req.body;
        //Validate user
        if ( !name || !email ) {
            throw new Error('Either name or email is not there')
        }
        
        //Validate user does not exist before
        const existing = getUserByEmail({ name, email });
        if (!existing) {
            throw new Error('User with email exists');
        }

        //Adding user
        const user = addUser({ name, email, role });

        console.log ('posted user: ', user)
    }   catch (err) {
        return res.status(404).json({
            message: `invalid request: ${err.message}`,
        });
    }
    res.json(users)
});


//UPDATE user
usersRouter.put ('/:id', (req,res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        //Validate content
        if ( !id || !name || !email ) {
            throw new Error('Either title or content is not there')
        }
        const existing = getUserById(id);
        if (!existing) {
            throw new Error("required values: user or email are empty");
        }

        //Update the record
        const updated = updateUser({ id, name, email, role });
        console.log(`udpated blog: ${updated}`);
        res.status(200).json(updated);
    }   catch (err) {
        return res.status(400).json({
            error: err.toString(),
        })
    } 
});


//DELETE user
usersRouter.delete ('/:id', (req,res) => {
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