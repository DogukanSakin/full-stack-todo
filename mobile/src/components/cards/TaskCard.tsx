import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import Task from "../../models/Task";
import StyledText from "../StyledText";
import { colors } from "../../constants/colors";

interface IProps {
  item: Task;
  onPress?: () => void;
  onUpdate: (item: Task) => void;
  onDelete: (item: Task) => void;
}

export default function TaskCard({
  item,
  onPress,
  onUpdate,
  onDelete,
}: IProps) {
  //Mark: - States
  const [swipeFinished, setSwipeFinished] = useState<boolean>(true);

  //Mark: - Handlers

  const handleOnPress = () => {
    if (swipeFinished === true && onPress) {
      onPress();
    }
  };

  //Mark: - Render
  const renderActions = () => {
    return (
      <View className="flex-row">
        <Pressable
          onPress={() => onUpdate(item)}
          className="bg-primary mt-[10px] p-[20px] rounded-[10px]  justify-center items-center self-center"
        >
          <Feather name="edit-3" size={20} color={colors.white} />
        </Pressable>
        <Pressable
          onPress={() => onDelete(item)}
          className="bg-red mt-[10px] p-[20px] rounded-[10px] justify-center items-center self-center"
        >
          <Feather name="trash" size={20} color={colors.white} />
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable
      onActivated={() => setSwipeFinished(false)}
      onSwipeableClose={() => setSwipeFinished(true)}
      renderLeftActions={renderActions}
      renderRightActions={renderActions}
    >
      <Pressable
        onPress={handleOnPress}
        className="bg-lightOpacity mt-[10px] p-[20px] rounded-[10px] flex-row items-center"
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
    </Swipeable>
  );
}
