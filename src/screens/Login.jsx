import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../components";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <PrimaryButton text="Login" />
      <NoButton
        onPress={() => navigation?.navigate("Register")}
        text="Don't have an account? Sign Up"
      />
    </View>
  );
};

export default Login;
