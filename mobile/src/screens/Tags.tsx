import React from "react";
import { View, Text, ImageBackground } from "react-native";
export default function Tags() {
  return (
    <ImageBackground
      blurRadius={50}
      className="flex-1"
      source={require("../../assets/background/background.jpg")}
    ></ImageBackground>
  );
}
