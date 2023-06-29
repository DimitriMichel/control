import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// Get all groups
export const getAllGroups = async (req, res) => {
    try {
        const groups = await prisma.group.findMany();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a group by id
export const getGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await prisma.group.findUnique({ where: { id: Number(id) } });
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new group
export const createGroup = async (req, res) => {
    try {
        const group = await prisma.group.create({ data: req.body });
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a group by id
export const updateGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const group = await prisma.group.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a group by id
export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.group.delete({ where: { id: Number(id) } });
        res.status(204).send('Group deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
