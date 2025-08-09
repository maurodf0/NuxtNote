  import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  console.log('Fetching notes...', event);

interface Notes {
  id: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

try{
  const notes: Notes[] = await prisma.note.findMany({
  });
  return notes;   

} catch (error) {
  console.error('Error fetching notes:', error);
  };

})