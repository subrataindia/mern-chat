import { StyleSheet } from "react-native";
import MyStack from "./Navigator/Stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

export const UserContext = createContext();

const App = () => {
  const [userId, setUserId] = useState("");

  return (
    // <ErrorBoundary>
    <UserContext.Provider value={{ userId, setUserId }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </UserContext.Provider>
    // {/* </ErrorBoundary> */}
  );
};

export default App;
