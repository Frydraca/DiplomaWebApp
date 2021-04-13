export function generateAuthenticationHeader(state) {
  const jwtToken = state.auth.token;

  return {
    Authorization: "Bearer " + jwtToken,
  };
}
