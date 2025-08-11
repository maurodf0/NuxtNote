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

    const res = await prisma.note.update({
      where: {
        id: body.noteId,
      },
      data: {
        text: body.updatedNote,
        updatedAt: new Date(),
      }
    })

    console.log('Update response:', res);

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