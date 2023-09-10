import { View, Text, Alert, StyleSheet } from "react-native";
import React from "react";

import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../../components";

const RegisterComponent = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  handlePress,
  redirectLogin,
}) => {
  return (
    <View style={{ margin: "auto" }}>
      <Title text="Register" />
      <SubTitle text="Create an account" style={{ marginBottom: 40 }} />
      <TextInput
        text="Name:"
        placeHolder="Enter your name"
        onLooseFocus={setName}
        password={false}
      />
      <TextInput
        text="Email:"
        placeHolder="Enter Email Address"
        onLooseFocus={setEmail}
        password={false}
      />
      <TextInput
        text="Password:"
        placeHolder="Enter Password"
        onLooseFocus={setPassword}
        password={true}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <PrimaryButton text="Create Account" onPress={handlePress} />
      <NoButton
        onPress={redirectLogin}
        text="Already have an account? Login!"
      />
    </View>
  );
};

export default RegisterComponent;

const styles = StyleSheet.create({
  container: {
    margin: "auto",
  },
  subtitle: {
    marginBottom: 40,
  },
  errorText: {
    flex: 1,
    color: "red",
    textAlign: "center",
  },
});
