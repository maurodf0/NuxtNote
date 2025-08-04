export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return

  const { $verifyJwtToken } = useNuxtApp()

  console.log('middleware fired')
  const jwt = useCookie('NuxtNoteJWT')
  console.log('Token JSON:' , jwt.value)

  if (!jwt.value) {
    return navigateTo('/register')
  }

  try {
    await $verifyJwtToken(jwt.value, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  } catch (error) {
    console.log(error)
    return navigateTo('/register')
  }
})