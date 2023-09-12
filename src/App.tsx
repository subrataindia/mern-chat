import { StyleSheet } from "react-native";
import MyStack from "./Navigator/Stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
