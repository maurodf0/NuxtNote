import jsonwebtoken from 'jsonwebtoken'

export default defineNuxtRouteMiddleware( (event) => {

  if(process.client) return;
  const jwt = useCookie<string | undefined>('NuxtNoteJWT');
  if(!jwt.value){
   return navigateTo('/register');
  }
  var decoded: any = jsonwebtoken.verify(jwt.value, process.env.JWT_SECRET);

});