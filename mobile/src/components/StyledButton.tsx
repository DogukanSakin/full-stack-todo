import React from "react";
import { Pressable, ActivityIndicator } from "react-native";

import StyledText from "./StyledText";

interface IProps {
  placeholder: string;
  onPress: () => void;
  overrideStyles?: string;
  loading?: boolean;
}

export default function StyledButton({
  placeholder,
  onPress,
  overrideStyles,
  loading,
}: IProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-row items-center justify-center bg-lightOpacity rounded-[20px] p-[20px] ${overrideStyles}`}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <StyledText
          text={placeholder}
          fontFamily="family-bold"
          overrideStyles="text-white text-xlarge"
        />
      )}
    </Pressable>
  );
}
