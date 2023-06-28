import React from "react";
import { View, Pressable } from "react-native";

import { Entypo } from "@expo/vector-icons";

import Task from "../../models/Task";
import StyledText from "../StyledText";
import { colors } from "../../constants/colors";

interface IProps {
  item: Task;
  onPress?: () => void;
}

export default function TaskCard({ item, onPress }: IProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-lightOpacity mt-[10px] p-[20px] rounded-[20px] flex-row items-center"
    >
      <View
        className={`h-[16px] w-[16px] rounded-full mr-[6px] justify-center items-center ${
          item.completed ? "bg-halfOpacity" : "border-lightOpacity border"
        }`}
      >
        {item.completed && (
          <Entypo name="check" size={12} color={colors.white} />
        )}
      </View>
      <StyledText
        isDecorated={item.completed}
        text={item.name}
        overrideStyles={` text-large ${
          item.completed ? "text-halfOpacity" : "text-white"
        }`}
        fontFamily="family-semiBold"
      />
    </Pressable>
  );
}
