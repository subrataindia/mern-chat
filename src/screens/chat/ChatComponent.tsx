import { View, Text } from "react-native";
import React from "react";
import SingleFriend from "../../components/SingleFriend";

const ChatComponent = ({ friends }) => {
  console.log(friends.length);
  return (
    <View>
      {friends.map((friend, index) => (
        <SingleFriend key={index} friend={friend} />
      ))}
    </View>
  );
};

export default ChatComponent;
