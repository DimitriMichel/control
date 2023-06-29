import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../Controllers/UserController.js';

// This route gets all users
router.get('/', getAllUsers);

// This route gets a single user by id
router.get('/:id', getUserById);

// This route creates a new user
router.post('/', createUser);

// This route updates a user by id
router.put('/:id', updateUser);

// This route deletes a user by id
router.delete('/:id', deleteUser);

export default router;