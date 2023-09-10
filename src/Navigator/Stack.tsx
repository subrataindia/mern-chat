import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Login, Register, Home } from "../screens";
import { Constants } from "../utils/constants";

// Define the stack parameter list for your stack navigator
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the navigation prop type
type LoginContainerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Constants.screens.login
>;

// Define the navigation prop type
type RegisterContainerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Constants.screens.register
>;

// Define the navigation prop type
type HomeContainerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  Constants.screens.home
>;

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Constants.screens.login} component={Login} />
      <Stack.Screen name={Constants.screens.register} component={Register} />
      <Stack.Screen name={Constants.screens.home} component={Home} />
    </Stack.Navigator>
  );
};

export default MyStack;
export {
  LoginContainerNavigationProp,
  RegisterContainerNavigationProp,
  HomeContainerNavigationProp,
};
