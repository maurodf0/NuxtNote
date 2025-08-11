interface Note {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

import { PrismaClient } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('Received body:', body);
    const prisma = new PrismaClient();

    const updatedNote: Note = body.updatedNote;

    if(!updatedNote || !updatedNote.id) {
      throw createError({
        statusCode: 400,
        message: 'Invalid note data',
      });
    }

    await prisma.note.update({
      where: {
        id: body.noteId,
      },
      data: {
        text: updatedNote.text,
        updatedAt: new Date(),
      }
    })

  } catch (error) {
    console.error('Error in notes handler:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
})