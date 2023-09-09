import { View, Text, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";

import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../components";
import { Constants } from "../utils/constants";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    const user = {
      name,
      email,
      password,
    };
    console.log("Handle Press called", user);
    axios
      .post("http://localhost:8000/register", user)
      .then((res) => {
        Alert.alert("Registration Successful!", "User registered successfully");
        alert("User registered successfully");
      })
      .catch((err) => {
        Alert.alert("Registration Error!", `${err.response.data.message}`);
        alert(`${err.response.data.message}`);
      });
  };

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
      <PrimaryButton text="Create Account" onPress={handlePress} />
      <NoButton
        onPress={() => navigation?.navigate(Constants.screens.login)}
        text="Already have an account? Login!"
      />
    </View>
  );
};

export default Register;
