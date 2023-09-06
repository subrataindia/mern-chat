import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../components";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ margin: "auto" }}>
      <Title text="Register" />
      <SubTitle text="Create an account" style={{ marginBottom: 40 }} />
      <TextInput
        text="Name:"
        placeHolder="Enter your name"
        onLooseFocus={setName}
      />
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
      <PrimaryButton text="Create Account" />
      <NoButton
        onPress={() => navigation?.navigate("Login")}
        text="Already have an account? Login!"
      />
    </View>
  );
};

export default Register;
