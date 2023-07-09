import React, { useState } from "react";
import { View } from "react-native";

import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import StyledText from "../StyledText";
import StyledButton from "../StyledButton";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  onYes: () => void;
}

export default function SelectableModal({
  message,
  isVisible,
  onClose,
  onYes,
}: IProps) {
  return (
    <Modal
      isVisible={isVisible}
      className="justify-center flex-1"
      onBackdropPress={onClose}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        className="rounded-[10px] p-[20px]"
        colors={colors.modalGradientColors}
      >
        <View className="justify-center items-center">
          <FontAwesome5 name="question" size={30} color={colors.white} />
          <StyledText
            text={message}
            fontFamily="family-semiBold"
            overrideStyles="mt-[10px] text-white text-xlarge text-center"
          />
          <View className="flex-row mt-[10px] justify-between">
            <StyledButton
              onPress={onClose}
              placeholder="Cancel"
              overrideStyles="flex-1 p-[10px] mr-[10px]"
            />
            <StyledButton
              onPress={onYes}
              placeholder="Yes"
              overrideStyles="flex-1 p-[10px] ml-[10px]"
            />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}
