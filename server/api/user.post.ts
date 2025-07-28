// Post User API Endpoint

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
  const {email, psw} = await readBody(event);

  const salt = await bcrypt.genSalt(10);
  const pswhash = await bcrypt.hash(psw, salt);



  await prisma.user.create({
    data: {
      email,
      password: pswhash, 
    }
  });
  return {
    message: 'User created successfully',
} 
});