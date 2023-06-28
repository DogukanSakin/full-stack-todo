import React from "react";
import { Text, View } from "react-native";
import useFontFamily from "../hooks/useFontFamily";
interface IProps {
  text?: string;
  fontFamily?:
    | "family-black"
    | "family-bold"
    | "family-extraBold"
    | "family-semiBold"
    | "family-medium"
    | "family-regular";
  overrideStyles?: string;
  onPress?: () => void;
  numberOfLines?: number;
  isDecorated?: boolean;
}
export default function StyledText({
  overrideStyles,
  text,
  fontFamily = "family-regular",
  onPress,
  numberOfLines,
  isDecorated = false,
}: IProps) {
  const { onLayoutRootView, fontsLoaded } = useFontFamily();
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text
        numberOfLines={numberOfLines}
        onPress={onPress}
        className={`${overrideStyles}`}
        style={{
          fontFamily: fontFamily,
          textDecorationLine: isDecorated ? "line-through" : "none",
        }}
      >
        {text}
      </Text>
    </View>
  );
}
