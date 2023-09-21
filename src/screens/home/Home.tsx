import { View, Text } from "react-native";
import React, {
  FC,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { NoButton } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../../utils/constants";
import { HomeContainerNavigationProp } from "../../Navigator/RouteParams";
import { RouteKeys } from "../../Navigator/RouteKeys";
import HomeComponent from "./HomeComponent";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { UserContext } from "../../App";

export interface HomeScreenProps {
  navigation: HomeContainerNavigationProp;
  users: any[];
}

const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const { userId, setUserId } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  console.log("fetched users:", users);

  useEffect(() => {
    const fetchUsers = async () => {
      const token: string | null = await AsyncStorage.getItem(
        Constants.authToken
      );
      //console.log("Token: ", token)
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        console.log("decoded userid:", userId);
        try {
          const users = await axios.get(
            `${Constants.endpoints.fetchUsers}/${userId}`
          );
          //console.log(users);
          setUsers(users.data);
        } catch (err) {
          //console.log("Error occured fetching users.")
        }
      }
    };
    fetchUsers();
  }, [userId]);

  const handleLogout = () => {
    AsyncStorage.removeItem(Constants.authToken);
    navigation.replace(RouteKeys.Login);
  };
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <HomeComponent navigation={navigation} users={users} />
      <NoButton text="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;
