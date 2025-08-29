interface Note {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  try {
  const { noteId, updatedNote, title } = await readBody<{ noteId: number; updatedNote: Note, titleNote: string }>(event);
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
      

      const noteTryingToUpdate = await prisma.note.findUnique({
        where: {
          id: Number(noteId),
          userId: decodedToken.id,
        }
      });

      if(!noteTryingToUpdate) {
        throw createError({
          statusCode: 401,
          message: 'Note not found or you do not have permission to update it',
        });

      }

      if(noteTryingToUpdate.userId !== decodedToken.id) {
        throw createError({
          statusCode: 403,
          message: 'Forbidden, you do not have permission to update this note',
        });
      }

    const res = await prisma.note.update({
      where: {
        id: Number(noteId),
      },
      data: {
        title: title,
        text: updatedNote,
        updatedAt: new Date(),
      }
    })
    if(!res) {
      throw createError({
        statusCode: 404,
        message: 'Note not found',
      });
    }
    console.log('Note updated:', res);
    return {
      message: 'Note updated successfully',
    }

  } catch (error) {
    console.error('Error in notes handler:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
})