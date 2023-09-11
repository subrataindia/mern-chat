import { View, Text, Pressable } from "react-native";
import React from "react";

const PrimaryButton = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: 200,
          backgroundColor: "#4A55A2",
          padding: 15,
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 6,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      onPress={onPress}
      testID={`${text.toLowerCase().replace(/ /g, "-")}-button`}
    >
      <Text
        style={{
          color: "#FFF",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;
