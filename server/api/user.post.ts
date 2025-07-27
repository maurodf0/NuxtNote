// Post User API Endpoint

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
  const {email, psw} = await readBody(event);
  await prisma.user.create({
    data: {
      email,
      password: psw, 
    }
  });
  return {
    message: 'User created successfully',
} 
});