import { Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import RegisterComponent from "./RegisterComponent";
import { RegisterContainerNavigationProp } from "../../Navigator/RouteParams";
import { Constants } from "../../utils/constants";
import { RouteKeys } from "../../Navigator/RouteKeys";

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
      //console.log("Handle Press called", user);
      const response = await axios.post(Constants.endpoints.register, user);
      Alert.alert("Registration Successful!", "User registered successfully");
      //alert("User registered successfully");
      navigation.navigate(RouteKeys.Login);
    } catch (err: any) {
      if(err.response)
      setError(`Unable to register! \n ${err.response.data.message}`);
      //console.log(err);
    }
  };

  const redirectLogin = () => {
    navigation?.navigate(RouteKeys.Login);
  };

  return (
    <RegisterComponent
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      handlePress={handlePress}
      redirectLogin={redirectLogin}
      error={error}
    />
  );
};

export default Register;
