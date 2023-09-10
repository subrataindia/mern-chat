import { View, Text, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import RegisterComponent from "./RegisterComponent";
import { RegisterContainerNavigationProp } from "../../Navigator/Stack";
import { Constants } from "../../utils/constants";

interface RegisterContainerProps {
  navigation: RegisterContainerNavigationProp;
}

const Register: React.FC<RegisterContainerProps> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handlePress = async () => {
    if (name == "" || email == "" || password == "") {
      setError("Fillup all the fields");
      return;
    }
    try {
      const user = {
        name,
        email,
        password,
      };
      console.log("Handle Press called", user);
      const response = await axios.post(Constants.endpoints.register, user);
      Alert.alert("Registration Successful!", "User registered successfully");
      alert("User registered successfully");
    } catch (err) {
      setError(`Unable to register! \n ${err?.response?.data?.message}`);
      console.log(err);
    }
  };

  const redirectLogin = () => {
    navigation?.navigate(Constants.screens.login);
  };

  return (
    <RegisterComponent
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handlePress={handlePress}
      redirectLogin={redirectLogin}
      error={error}
      setError={setError}
    />
  );
};

export default Register;
