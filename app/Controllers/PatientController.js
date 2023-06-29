import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a patient by id
export const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.findUnique({ where: { id: Number(id) } });
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all patients in a group
export const getPatientsByGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
      const patients = await prisma.patient.findMany({ 
        where: { groupId: Number(groupId) } 
      });
      if (patients) {
        res.status(200).json(patients);
      } else {
        res.status(404).json({ error: 'No patients found for this group' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Create a new patient
export const createPatient = async (req, res) => {
  try {
    const patient = await prisma.patient.create({ data: req.body });
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a patient by id
export const updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a patient by id
export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.patient.delete({ where: { id: Number(id) } });
    res.status(204).send('Patient deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
