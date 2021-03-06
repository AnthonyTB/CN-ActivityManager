import jwtDecode from "jwt-decode";

const TokenService = {
  // saves the user's current api token to their browsers local storage
  saveAuthToken(token: string) {
    window.localStorage.setItem("authToken", token);
  },
  // gets the user's current api token from their browsers local storage
  getAuthToken() {
    return window.localStorage.getItem("authToken");
  },
  // clears the user's current api token from their browsers local storage
  clearAuthToken() {
    window.localStorage.removeItem("authToken");
  },
  // checks if the user has a api token stored in their browsrs local storage
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  // parses the user's web token
  parseJwt(jwt: string) {
    return jwtDecode(jwt);
  },
  // creates the user's web token
  parseAuthToken() {
    const authToken = TokenService.getAuthToken();
    if (authToken) return TokenService.parseJwt(authToken);
    else return undefined;
  },
};

export default TokenService;
