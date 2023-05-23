// import { Request, Response } from 'express';
// import { User } from 'prisma';

// export const addUser = async (req: Request, res: Response): Promise<void> => {
//     const user = new User(req.body);
//     try {
//         await user.save();
//         res.json(user);
//     } catch (error) {
//         res.status(500).send(`Error: ${error}`);
//     }
// };

import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
      data: {
        email: 'me@sidali.dev',
        password: '123456',
        Role: BASIC,
      },
    })
    console.log(user)
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })