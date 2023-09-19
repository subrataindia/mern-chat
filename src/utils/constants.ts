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
    fetchUsers: string;
    friendRequest: string;
  };
}

export const Constants: ConstantsType = {
  authToken: "AUTH_TOKEN",
  baseUrl: "http://192.168.29.171:8000",
  screens: {
    login: "Login",
    home: "Home",
    register: "Register",
  },
  endpoints: {
    login: "",
    register: "",
    fetchUsers: "",
    friendRequest: ""
  },
};

Constants.endpoints = {
  login: `${Constants.baseUrl}/login`,
  register: `${Constants.baseUrl}/register`,
  fetchUsers: `${Constants.baseUrl}/users`,
  friendRequest: `${Constants.baseUrl}/friend-request`
};
