import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const imageUri =
  "https://images.pexels.com/photos/541484/sun-flower-blossom-bloom-pollen-541484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const SingleFriend = ({ friend }) => {
  return (
    <View style={styles.singleUserContainer}>
      <Image
        style={styles.userImage}
        source={{
          uri: imageUri,
        }}
      />
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.userName}>{friend.name}</Text>
          <Text>3:00 PM</Text>
        </View>

        <Text>last message</Text>
      </View>
    </View>
  );
};

export default SingleFriend;

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
    flex: 1,
  },
});
