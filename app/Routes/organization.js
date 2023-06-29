import express from 'express';
const router = express.Router();
import {
    createOrganization,
    getAllGroupsInOrganization,
    getOrganizationById,
    getAllOrganizations,
    updateOrganization,
    deleteOrganization,
} from '../Controllers/OrganizationController.js';

// Create
router.post('/organizations', createOrganization);

// Get All
router.get('/organizations', getAllOrganizations);

// Get
router.get('/organizations/:id', getOrganizationById);

// Update
router.put('/organizations/:id', updateOrganization);

// Delete
router.delete('/organizations/:id', deleteOrganization);

// Get Groups
router.get('/groups/:groupId/organizations', getAllGroupsInOrganization);

export default router;