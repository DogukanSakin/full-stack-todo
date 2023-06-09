import React from "react";
import { View, TextInput } from "react-native";
import { colors } from "../constants/colors";

interface IProps {
  placeholder: string;
  overrideStyles?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export default function StyledInput({
  placeholder,
  overrideStyles,
  onChangeText,
  value,
}: IProps) {
  return (
    <View
      className={`flex flex-row items-center justify-center bg-lightOpacity rounded-[10px] p-[20px] ${overrideStyles}`}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.threeQuarterOpacity}
        className="flex-1 text-white text-xlarge  font-family-semiBold"
      />
    </View>
  );
}
