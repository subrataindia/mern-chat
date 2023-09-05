import { View, Text } from "react-native";
import React from "react";

const Title = ({ text }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 22,
          textAlign: "center",
          color: "#4A55A2",
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Title;
