const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient()

async function main() {

  const roleSuperAdmin = await prisma.role.create({
    data: { name: 'SUPER_ADMIN' },
  })

  const roleAdmin = await prisma.role.create({
    data: { name: 'ADMIN' },
  })

  const roleStaff = await prisma.role.create({
    data: { name: 'STAFF' },
  })

  const roleCommunityMember = await prisma.role.create({
    data: { name: 'COMMUNITY_MEMBER' },
  })

  const tiers = ['ESSENTIALS', 'SILVER', 'GOLD']

  //random tier
  const randomTier = () => tiers[Math.floor(Math.random() * tiers.length)]

  // Decide how many seed organizations to create
  const numOfOrgs = 10
  const numOfGroupsPerOrg = 3
  const numOfCommunityMembersPerGroup = 10

  // Iterate over the number of records
  for (let i = 0; i < numOfOrgs; i++) {

    const organization = await prisma.organization.create({
      data: { name: faker.company.name(), tier: randomTier() },
    })

    // Organization Super Admin
    const superAdmin = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: 'super.admin@' + organization.name.toLowerCase().replace(/\s/g, '') + '.com',
        password: 'password',
        role: { connect: { id: roleSuperAdmin.id } },
        organization: { connect: { id: organization.id } },
        phone: faker.phone.number('###-###-####'), // Get a 10-digit phone number
        isCommunityMember: false,
      },
    })

    for (let i = 0; i < numOfGroupsPerOrg; i++) {

      const group = await prisma.group.create({
        data: { name: faker.word.noun({ length: { min: 5, max: 7 }, strategy: "closest" }), orgId: organization.id },
      })
      const admin = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: 'admin@' + organization.name.toLowerCase().replace(/\s/g, '') + `${group.name}-${i.toString()}` + '.com',
          password: 'password',
          role: { connect: { id: roleAdmin.id } },
          organization: {
            connect: { id: organization.id }
          },
          phone: faker.phone.number('###-###-####'),
          isCommunityMember: false
        },
      })

      const staff = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: 'staff@' + organization.name.toLowerCase().replace(/\s/g, '') + `${group.name}-${i.toString()}` + '.com',
          password: faker.internet.password(),
          role: { connect: { id: roleStaff.id } },
          organization: {
            connect: { id: organization.id }
          },
          phone: faker.phone.number('###-###-####'),
          isCommunityMember: false
        },
      })

      for (let i = 0; i < numOfCommunityMembersPerGroup; i++) {
        // Create community members
        const communityMember = await prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: { connect: { id: roleCommunityMember.id } },
            organization: {
              connect: { id: organization.id }
            },
            phone: faker.phone.number('###-###-####'),
            isCommunityMember: true
          },
        })

        // Create a patient
        const patient = await prisma.patient.create({
          data: {
            name: faker.person.fullName(),
            dateOfBirth: faker.date.past(),
            diagnosis: faker.word.adjective(),
            carePlan: faker.lorem.sentence(5),
            emergencyContact: faker.phone.number('###-###-####'),
            communityMemberId: communityMember.id
          },
        })

        // Create a note for the patient
        const note = await prisma.note.create({
          data: {
            date: faker.date.recent(),
            content: faker.lorem.paragraph({ min: 1, max: 2 }),
            patientId: patient.id,
          },
        })

        // Create an incident report for the patient
        const incidentReport = await prisma.incidentReport.create({
          data: {
            date: faker.date.recent(),
            description: faker.lorem.paragraph({ min: 2, max: 4 }),
            patientId: patient.id,
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })