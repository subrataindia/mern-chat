import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/FontAwesome";

const MyTextInput = ({
  text = "",
  placeHolder = "",
  onLooseFocus,
  password = false,
}) => {
  const [value, setChangeValue] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(password);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <Text>{text}</Text>
      <View
        style={{
          flexDirection: "row",
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
        }}
      >
        <TextInput
          style={{
            flex: 1,
          }}
          placeholder={placeHolder}
          placeholderTextColor={"grey"}
          value={value}
          secureTextEntry={isPasswordVisible}
          onChangeText={setChangeValue}
          onBlur={() => onLooseFocus(value)} // When loose focus update parent component
        />
        {password && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? "eye-slash" : "eye"} // Use the appropriate icon name
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MyTextInput;
