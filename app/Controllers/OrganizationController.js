import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient()

// Get all organizations
export const getAllOrganizations = async (req, res) => {
    try {
      const organizations = await prisma.organization.findMany();
      res.status(200).json(organizations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Get an organization by id
  export const getOrganizationById = async (req, res) => {
    const { id } = req.params;
    try {
      const organization = await prisma.organization.findUnique({ where: { id: Number(id) } });
      if (organization) {
        res.status(200).json(organization);
      } else {
        res.status(404).json({ error: 'Organization not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Create a new organization
  export const createOrganization = async (req, res) => {
    try {
      const organization = await prisma.organization.create({ data: req.body });
      res.status(201).json(organization);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Get all groups in an organization
  export const getAllGroupsInOrganization = async (req, res) => {
      const { organizationId } = req.params;
      try {
        const groups = await prisma.patient.findMany({ 
          where: { organizationId: Number(organizationId) } 
        });
        if (groups) {
          res.status(200).json(groups);
        } else {
          res.status(404).json({ error: 'No groups found in this organization' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };
  
  // Update an organization by id
  export const updateOrganization = async (req, res) => {
    const { id } = req.params;
    try {
      const organization = await prisma.organization.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json(organization);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Delete an organization by id
  export const deleteOrganization = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.organization.delete({ where: { id: Number(id) } });
      res.status(204).send('Organization deleted');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };