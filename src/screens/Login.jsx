import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Title text="Login" />
      <SubTitle text="Use Existing credentials!" />
      <TextInput
        text="Email:"
        placeHolder="Enter Email Address"
        onLooseFocus={setEmail}
      />
      <TextInput
        text="Password:"
        placeHolder="Enter Password"
        onLooseFocus={setEmail}
        password={true}
      />
      <PrimaryButton text="Login" />
      <NoButton text="Don't have an account? Sign Up" />
    </View>
  );
};

export default Login;
