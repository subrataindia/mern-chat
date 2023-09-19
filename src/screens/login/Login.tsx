import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginComponent from "./LoginComponent";

import { Constants } from "../../utils/constants";
import { LoginContainerNavigationProp } from "../../Navigator/RouteParams";
import { RouteKeys } from "../../Navigator/RouteKeys";

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
      if (token) {
        await AsyncStorage.setItem(Constants.authToken, token);
        navigation.replace(RouteKeys.Home);
      }
    } catch (err) {
      //console.log(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const redirectSignup = () => {
    navigation?.replace(RouteKeys.Register);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(Constants.authToken);
        if (token) {
          navigation.replace(RouteKeys.Home);
        }
      } catch (err) {
        console.log(err);
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
