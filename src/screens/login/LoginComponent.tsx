import { View, Text, StyleSheet } from "react-native";
import React, {useRef} from "react";

import {
  PrimaryButton,
  NoButton,
  Title,
  SubTitle,
  TextInput,
} from "../../components";

interface LoginComponentProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string | null;
  handleLogin: () => void;
  redirectSignup: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  setEmail,
  setPassword,
  error,
  handleLogin,
  redirectSignup,
}) => {

  return (
    <View style={styles.container}>
      <Title text="Login" />
      <SubTitle text="Use Existing credentials!" style={styles.subtitle} />
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
      <PrimaryButton text="Login" onPress={handleLogin} />

      <NoButton
        onPress={redirectSignup}
        text="Don't have an account? Sign Up"
      />
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    maxWidth: 500,
    margin:'auto'
  },
  subtitle: {
    marginBottom: 40,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
