import { View, Text } from "react-native";
import React from "react";
import { NoButton } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../utils/constants";

const Home = ({ navigation }) => {
  const handleLogout = () => {
    AsyncStorage.removeItem(Constants.authToken);
    navigation.replace(Constants.screens.login);
  };
  return (
    <View>
      <Text>Home</Text>
      <NoButton text="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;
