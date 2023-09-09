import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../components";
import { Constants } from "../utils/constants";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = {
      email,
      password,
    };

    axios
      .post("http://localhost:8000/login", user)
      .then((res) => {
        console.log(res.data.token);
        AsyncStorage.setItem(Constants.authToken, res.data.token);
        navigation.replace(Constants.screens.home);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem(Constants.authToken);
        if (token) {
          navigation.replace(Constants.screens.home);
        }
      } catch (err) {}
    };
    checkLoginStatus();
  });
  return (
    <View style={{ margin: "auto" }}>
      <Title text="Login" />
      <SubTitle text="Use Existing credentials!" style={{ marginBottom: 40 }} />
      <TextInput
        text="Email:"
        placeHolder="Enter Email Address"
        onLooseFocus={setEmail}
      />
      <TextInput
        text="Password:"
        placeHolder="Enter Password"
        onLooseFocus={setPassword}
        password={true}
      />
      <PrimaryButton text="Login" onPress={handleLogin} />
      <NoButton
        onPress={() => navigation?.navigate(Constants.screens.register)}
        text="Don't have an account? Sign Up"
      />
    </View>
  );
};

export default Login;
