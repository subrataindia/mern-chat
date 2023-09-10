import { RootStackParamList } from "../Navigator/Stack";

interface ConstantsType {
  authToken: string;
  baseUrl: string;
  screens: {
    login: string;
    home: string;
    register: string;
  };
  endpoints: {
    login: string;
    register: string;
  };
}

export const Constants: ConstantsType = {
  authToken: "AUTH_TOKEN",
  baseUrl: "http://localhost:8000",
  screens: {
    login: "Login",
    home: "Home",
    register: "Register",
  },
  endpoints: {
    login: "",
    register: "",
  },
};

Constants.endpoints = {
  login: `${Constants.baseUrl}/login`,
  register: `${Constants.baseUrl}/register`,
};
