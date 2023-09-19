import React from "react";
import { View, StyleSheet } from "react-native";
import MyApp from "./src/App";

// https://www.youtube.com/watch?v=vy_KfVfxIDk&t=1735s

const App: React.FC = () => {
  return <View style={stylesheet.container}><MyApp /></View>;
};

export default App;


const stylesheet = StyleSheet.create({
  container: {
    flex:1
  }
})