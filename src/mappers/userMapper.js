export function mapUserFromApi(apiUser) {
  return {
    id: apiUser.id,
    first_name: apiUser.first_name,
    last_name: apiUser.last_name,
    email: apiUser.email,
    avatar: apiUser.avatar,
  };
}