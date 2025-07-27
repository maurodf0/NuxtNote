// Post User API Endpoint
export default defineEventHandler( async (event) => {
  const {email, password} = await readBody(event);
  await prisma.user.create({
    data: {
      email,
      password
    }
  });
  return {
    message: 'User created successfully',
} 
});