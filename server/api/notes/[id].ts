interface Note {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
  const { noteId, updatedNote } = await readBody<{ noteId: number; updatedNote: Note }>(event);
    const prisma = new PrismaClient();

    const res = await prisma.note.update({
      where: {
        id: Number(noteId),
      },
      data: {
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