import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register, Home, Chat } from "../screens";
import { RootStackParamList } from "./RouteParams";
import { RouteKeys } from "./RouteKeys";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteKeys.Login} component={Login} />
      <Stack.Screen name={RouteKeys.Register} component={Register} />
      <Stack.Screen
        name={RouteKeys.Home}
        component={Home}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={RouteKeys.Chat}
        component={Chat}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
