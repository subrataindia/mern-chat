import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Constants } from "../utils/constants";
import { UserContext } from "../App";

const imageUri =
  "https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const SingleUser = ({ user }) => {
  const { userId } = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [title, setTitle] = useState("");

  const { accept, connect, waiting, friend } = Constants.friendRequest;

  useEffect(() => {
    setTitle(
      user?.receivedFriendRequests?.includes(userId) || requestSent
        ? waiting
        : user?.sentFriendRequests?.includes(userId)
        ? accept
        : user?.friends?.includes(userId)
        ? friend
        : connect
    );
  }, []);
  const sendFriendRequest = async (
    currentUserId: string,
    selectedUserId: string
  ) => {
    try {
      const response = await fetch(Constants.endpoints.friendRequest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });
      if (response.ok) {
        // setRequestSent(true);
        setTitle((prev) => waiting);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const acceptFriendRequest = useCallback(
    async (senderId: string, receiverId: string) => {
      try {
        const response = await fetch(Constants.endpoints.acceptFriendRequest, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderId, receiverId }),
        });
        if (response.ok) {
          console.log("Successfully Accepted!");
          //setRequestAccepted(true);
          setTitle((prev) => friend);
        }
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const handleConnect = useCallback(
    (currentUserId: string, selecteduserId: string) => {
      if (title === connect) {
        sendFriendRequest(currentUserId, selecteduserId);
        return;
      }
      if (title === waiting) {
        console.log(" Withdraw friend request!");
        return;
      }
      if (title === accept) {
        console.log(" Accept friend request!");
        acceptFriendRequest(selecteduserId, currentUserId);
        return;
      }
    },
    []
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
        <Text style={styles.userName}>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <Pressable
        style={({ pressed }) =>
          user.receivedFriendRequests?.includes(userId) ||
          pressed ||
          title === friend ||
          title === waiting
            ? { opacity: 0.5, ...styles.button }
            : { opacity: 1, ...styles.button }
        }
        onPress={() => handleConnect(userId, user._id)}
        disabled={title === friend}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default SingleUser;

const styles = StyleSheet.create({
  singleUserContainer: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F2f2f2",
    padding: 15,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#0066b2",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
