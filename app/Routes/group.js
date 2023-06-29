import express from 'express';
const router = express.Router();
import {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroupById,
    deleteGroupById
} from '../Controllers/GroupController.js';

// Create a new group
router.post('/groups', createGroup);

// Get all groups
router.get('/groups', getAllGroups);

// Get all patients in a group
router.get('/groups/:groupId/patients', getPatientsByGroup);

// Get a group by id
router.get('/groups/:id', getGroupById);

// Update a group by id
router.put('/groups/:id', updateGroupById);

// Delete a group by id
router.delete('/groups/:id', deleteGroupById);



export default router;