interface Note {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

import {PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
const { newNote } = await readBody <{ newNote: Note }>(event);
 const prisma = new PrismaClient();
 const cookies = parseCookies(event)
      const token = cookies.NuxtNoteJWT;
    
      if (!token) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized for updating note',
        });
      }
    
   const decodedToken:any = await jwt.verify(token, process.env.JWT_SECRET);

    await prisma.note.create({
      data: {
        text: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
  } catch (error) {
    console.error('Error updating note:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
})