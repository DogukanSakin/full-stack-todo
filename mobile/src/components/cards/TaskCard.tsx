import React from "react";
import { View } from "react-native";

import Task from "../../models/Task";
import StyledText from "../StyledText";

interface IProps {
  item: Task;
}

export default function TaskCard({ item }: IProps) {
  return (
    <View className="bg-lightOpacity mt-[10px] p-[20px] rounded-[20px]">
      <StyledText
        text={item.name}
        overrideStyles="text-white text-large"
        fontFamily="family-semiBold"
      />
    </View>
  );
}
