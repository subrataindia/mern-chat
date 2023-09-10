import { View, Text, StyleSheet } from "react-native";
import React from "react";

import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../../components";
import { Constants } from "../../utils/constants";

const LoginComponent = ({ setEmail, setPassword, error, handleLogin }) => {
  return (
    <View style={styles.container}>
      <Title text="Login" />
      <SubTitle text="Use Existing credentials!" style={styles.subtitle} />
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
      {error && <Text style={styles.errorText}>{error}</Text>}
      <PrimaryButton text="Login" onPress={handleLogin} />

      <NoButton
        onPress={() => navigation?.navigate(Constants.screens.register)}
        text="Don't have an account? Sign Up"
      />
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    margin: "auto",
  },
  subtitle: {
    marginBottom: 40,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
