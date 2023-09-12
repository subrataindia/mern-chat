import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RouteKeys } from "./RouteKeys";

// Define the stack parameter list for your stack navigator
export type RootStackParamList = {
  [RouteKeys.Login]: undefined;
  [RouteKeys.Register]: undefined;
  [RouteKeys.Home]: undefined;
};

// Define the navigation prop type
export type LoginContainerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteKeys.Login
>;

// Define the navigation prop type
export type RegisterContainerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteKeys.Register
>;

// Define the navigation prop type
export type HomeContainerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RouteKeys.Home
>;
