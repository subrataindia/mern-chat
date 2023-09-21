import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { HomeScreenProps } from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constants } from "../../utils/constants";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { SingleUser } from "../../components";
import HeaderRight from "../../Navigator/HeaderRight";

const HomeComponent: FC<HomeScreenProps> = ({ navigation, users }) => {
  //console.log("Users with in component: ", users)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "MERN Chat",
      headerRight: () => <HeaderRight />,
    });
  }, []);

  return (
    <View>
      <View>
        {users.map((user, index) => (
          <SingleUser key={index} user={user} />
        ))}
      </View>
    </View>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  rightHeader: {
    flexDirection: "row",
    gap: 10,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
});
