import { RootStackParamList } from "../Navigator/Stack";

interface ConstantsType {
  authToken: string;
  baseUrl: string;
  screens: {
    login: string;
    home: string;
    register: string;
  };
  friendRequest: {
    waiting: string;
    accept: string;
    connect: string;
    friend: string;
  }
  endpoints: {
    login: string;
    register: string;
    fetchUsers: string;
    friendRequest: string;
    acceptFriendRequest: string;
    revokeFriendRequest: string;
    rejectFriendRequest: string;
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
  friendRequest: {
    waiting: "Waiting",
    accept: "Accept",
    connect: "Connect",
    friend: "Friend"
  },
  endpoints: {
    login: "",
    register: "",
    fetchUsers: "",
    friendRequest: "",
    acceptFriendRequest: "",
    rejectFriendRequest: "",
    revokeFriendRequest: ""
  },
};

Constants.endpoints = {
  login: `${Constants.baseUrl}/login`,
  register: `${Constants.baseUrl}/register`,
  fetchUsers: `${Constants.baseUrl}/users`,
  friendRequest: `${Constants.baseUrl}/friend-request`,
  acceptFriendRequest: `${Constants.baseUrl}/friend-request/accept`,
  revokeFriendRequest: `${Constants.baseUrl}/friend-request/revoke`,
  rejectFriendRequest: `${Constants.baseUrl}/friend-request/reject`,
};
