import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Constants } from "../../utils/constants";
import ChatComponent from "./ChatComponent";

const Chat = () => {
  const { userId } = useContext(UserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch(Constants.endpoints.friends, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      let data = await response.json();
      console.log("Friends found: ", data);
      setFriends(data);
    };

    fetchFriends();
  }, [userId]);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ChatComponent friends={friends} />
    </ScrollView>
  );
};

export default Chat;
