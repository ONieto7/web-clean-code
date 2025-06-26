export function mapUserFromApi(apiUser) {
  return {
    id: apiUser.id,
    first_name: apiUser.first_name,
    last_name: apiUser.last_name,
    email: apiUser.email,
    avatar: apiUser.avatar,
  };
}

export function mapUserToApi(user) {
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar,
  };
}