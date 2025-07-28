// Post User API Endpoint

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
  try {
  const {email, psw} = await readBody(event);

  const salt = await bcrypt.genSalt(10);
  const pswhash = await bcrypt.hash(psw, salt);

  await prisma.user.create({
    data: {
      email,
      password: pswhash, 
      salt: salt
    }
  });
  return {
    message: 'User created successfully',
} 
  } catch (error) {
    console.error('Error creating user:', error);
    throw createError({
      statusCode: 409,
      message: 'User already exists or other error occurred',
    })
  }
});