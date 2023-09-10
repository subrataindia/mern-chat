import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginComponent from "./LoginComponent";

import { Constants } from "../../utils/constants";
import { LoginContainerNavigationProp } from "../../Navigator/Stack";

interface LoginContainerProps {
  navigation: LoginContainerNavigationProp;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const redirectSignup = () => {
    navigation?.navigate(Constants.screens.register);
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
  }, []);

  return (
    <LoginComponent
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      handleLogin={handleLogin}
      redirectSignup={redirectSignup}
    />
  );
};

export default LoginContainer;
