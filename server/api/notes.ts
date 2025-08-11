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
  const cookies = parseCookies(event)
  const token = cookies.NuxtNoteJWT;

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized, login required',
    });
  }

  const decodedToken:any = await jwt.verify(token, process.env.JWT_SECRET);
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