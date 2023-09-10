export const Constants = {
  authToken: "AUTH_TOKEN",
  baseUrl: "http://localhost:8000",
  screens: {
    login: "Login",
    home: "Home",
    register: "Register",
  },
};

Constants.endpoints = {
  login: `${Constants.baseUrl}/login`,
};
