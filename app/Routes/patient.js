import express from 'express';
const router = express.Router();
import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientsByGroup,
} from '../Controllers/PatientController.js';

// Create a new patient
router.post('/patients', createPatient);

// Get all patients
router.get('/patients', getAllPatients);

// Get a patient by id
router.get('/patients/:id', getPatientById);

// Update a patient by id
router.put('/patients/:id', updatePatient);

// Delete a patient by id
router.delete('/patients/:id', deletePatient);

// Get all patients in a group
router.get('/groups/:groupId/patients', getPatientsByGroup);

export default router;