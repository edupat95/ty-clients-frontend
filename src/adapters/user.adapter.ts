export const createUserAdapter = (user: any) => ({
  id_token: user.id_token,
  id: user.id,
  login: user.login,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  imageUrl: user.imageUrl,
  activated: user.activated,
  langKey: user.langKey,
  club: user.club
});
