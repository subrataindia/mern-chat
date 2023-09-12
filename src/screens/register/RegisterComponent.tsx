import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";

import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../../components";

interface RegisterComponentProps {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  error: string | null;
  handlePress: () => void;
  redirectLogin: () => void;
}

const RegisterComponent: FC<RegisterComponentProps> = ({
  setName,
  setEmail,
  setPassword,
  error,
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
