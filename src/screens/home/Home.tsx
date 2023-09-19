import { View, Text } from "react-native";
import React, {FC} from "react";
import { NoButton } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../../utils/constants";
import { HomeContainerNavigationProp } from "../../Navigator/RouteParams";
import { RouteKeys } from "../../Navigator/RouteKeys";
import HomeComponent from "./HomeComponent";

export interface HomeScreenProps {
  navigation: HomeContainerNavigationProp
}

const Home: FC<HomeScreenProps> = ({ navigation }) => {

  const handleLogout = () => {
    AsyncStorage.removeItem(Constants.authToken);
    navigation.replace(RouteKeys.Login);
  };
  return (
    <View>
      <Text>Home</Text>
      <NoButton text="Logout" onPress={handleLogout} />
      <HomeComponent navigation={navigation}/>
    </View>
  );
};

export default Home;
