// Post User API Endpoint

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import validator from 'validator';


const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
  try {
  const {email, psw} = await readBody(event);

  if(!validator.isEmail(email)){
    console.error('Invalid email format:', email);
    throw createError({
        statusCode: 400,
        message: 'Invalid email format',
      });
  } 

  if(!validator.isStrongPassword(psw, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })){
    console.error('Weak password:', psw );
    throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
      });
  }

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
  } catch (error: any) {
    console.error('Error creating user:', error.code);
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'User already exists',
      });
    }
   throw error;
  }
});