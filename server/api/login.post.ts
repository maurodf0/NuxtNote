// Post User API Endpoint

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';

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

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  const isValid:boolean = await bcrypt.compare(psw, user.password);

  if(!isValid) {
    console.error('Invalid email or password');
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password',
    });

    return {
      message: 'User logged in successfully',
    }

  const token:string = jwt.sign({id: user.id}, process.env.JWT_SECRET);
  setCookie(event, 'NuxtNoteJWT', token);

  return {
    message: 'User created successfully',
} 
} 

}
catch (error: any) {
    console.error('Error creating user:', error.code);
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'User already exists',
      });
    }
   throw error;
  }
}
);