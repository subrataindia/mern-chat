import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useContext } from "react";
import { Constants } from "../utils/constants";
import { UserContext } from "../App";

const imageUri =
  "https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const SingleUser = ({
  user,
}: {
  user: { _id: string; name: "string"; email: "string" };
}) => {
  const { userId } = useContext(UserContext);
  console.log("user id with in single user: ", userId);

  const sendFriendRequest = async (
    currentUserId: string,
    selecteduserId: string
  ) => {
    try {
      const response = await fetch(Constants.endpoints.friendRequest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selecteduserId }),
      });
      if (response.ok) {
        console.log("Sent");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnect = useCallback(
    (currentUserId: string, selecteduserId: string) => {
      sendFriendRequest(currentUserId, selecteduserId);
    },
    [userId]
  );

  return (
    <View style={styles.singleUserContainer}>
      <Image
        style={styles.userImage}
        source={{
          uri: imageUri,
        }}
      />
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <Pressable
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : { opacity: 1 })}
        onPress={() => handleConnect(userId, user._id)}
      >
        <Text>Connect</Text>
      </Pressable>
    </View>
  );
};

export default SingleUser;

const styles = StyleSheet.create({
  singleUserContainer: {
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
