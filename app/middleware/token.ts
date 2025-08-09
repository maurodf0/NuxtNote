export default defineNuxtRouteMiddleware(async (event) => {
  if (process.client) return

  const { $verifyJwtToken } = useNuxtApp()
  const jwt = useCookie('NuxtNoteJWT')

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