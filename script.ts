import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Prisma Client Queries here
    // const user = await prisma.user.create({ data: { name: "User 1 test" } })
    // console.log(user)
    // const users = await prisma.user.findMany()
    // console.log(users)
    await prisma.user.deleteMany
}

// async function main() {
//     await prisma.user.create({
//         data: {
//             name: 'cantin'
//         }
//     })
// }

main()
    .catch(error => {
        console.log(error.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
