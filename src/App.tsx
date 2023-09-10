import { StyleSheet } from "react-native";
import MyStack from "./Navigator/Stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
