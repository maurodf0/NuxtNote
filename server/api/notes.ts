  import { PrismaClient } from '@prisma/client'
  import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

interface Notes {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

try{
  const cookies = useCookies(event)
  const token = cookies.NuxtNoteJWT;

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized, login required',
    });
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET) as string;
  const notes: Notes[] = await prisma.note.findMany({
    where: {
      userId: decodedToken.id,
    }
  });
  return notes;   

} catch (error) {
  console.error('Error fetching notes:', error);
  };

})