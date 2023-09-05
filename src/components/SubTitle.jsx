import { View, Text } from "react-native";
import React from "react";

const SubTitle = ({ text }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "grey",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default SubTitle;
