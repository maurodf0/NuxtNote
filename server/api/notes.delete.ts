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
 const prisma = new PrismaClient();
 const {id} = await readBody(event);
 console.log('ID to delete:', id);
 const cookies = parseCookies(event)
  const token = cookies.NuxtNoteJWT;
    
      if (!token) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized for delete note',
        });
      }
    
   const decodedToken:any = await jwt.verify(token, process.env.JWT_SECRET);
const noteToDelete = await prisma.note.findFirst({
  where: {
    id: id,
    userId: decodedToken.id
  }
});

console.log('Note to delete:', noteToDelete);
      if (!noteToDelete) {
        throw createError({
          statusCode: 404,
          message: 'Note not found',
        });
      }
      
      const deletedNote = await prisma.note.delete({
        where: { id: noteToDelete.id }
      });
      if(!deletedNote) {
        throw createError({
          statusCode: 404,
          message: 'Note not found',
        });
      }
      console.log('Note deleted successfully:', deletedNote);
      return 'Note deleted successfully';

  } catch (error) {
    console.error('Error updating note:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
})