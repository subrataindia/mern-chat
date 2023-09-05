import { View, Text, Pressable } from "react-native";
import React from "react";

const NoButton = ({ text }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          marginTop: 15,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
    >
      <Text style={{ textAlign: "center", color: "grey", fontSize: 16 }}>
        {text}
      </Text>
    </Pressable>
  );
};

export default NoButton;
