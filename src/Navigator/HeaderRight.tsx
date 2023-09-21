import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { RouteKeys } from "./RouteKeys";

const HeaderRight = () => {
  const navigation = useNavigation();
  const gotoChat = useCallback(() => {
    navigation.navigate(RouteKeys.Chat);
  }, []);

  return (
    <View style={styles.rightHeader}>
      <Ionicons
        name="chatbox-ellipses-outline"
        size={24}
        color="black"
        onPress={gotoChat}
      />
      <SimpleLineIcons name="people" size={24} color="black" />
    </View>
  );
};

export default HeaderRight;

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
