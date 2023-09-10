import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginComponent from "./LoginComponent";

import { Constants } from "../../utils/constants";

const LoginContainer = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const user = {
        email,
        password,
      };

      const response = await axios.post(Constants.endpoints.login, user);
      const { token } = response.data;

      await AsyncStorage.setItem(Constants.authToken, token);
      navigation.replace(Constants.screens.home);
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(Constants.authToken);
        if (token) {
          navigation.replace(Constants.screens.home);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkLoginStatus();
  });
  return (
    <LoginComponent
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      setError={setError}
      handleLogin={handleLogin}
    />
  );
};

export default LoginContainer;
