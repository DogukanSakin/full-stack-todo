import React, { useEffect, useState } from "react";
import { View, Pressable, Animated } from "react-native";

import { Entypo, Feather } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import Task from "../../models/Task";
import StyledText from "../StyledText";
import { colors } from "../../constants/colors";

interface IProps {
  item: Task;
  onPress?: () => void;
  onSwipeLeft?: (item: Task) => void;
  onSwipeRight?: (item: Task) => void;
}

export default function TaskCard({
  item,
  onPress,
  onSwipeRight,
  onSwipeLeft,
}: IProps) {
  //Mark: - States
  const [swipeStatus, setSwipeStatus] = useState<"began" | "ended">();

  //Mark: - Functions
  const handleSwipeableWillOpen = (direction: "left" | "right") => {
    console.log("direction", direction);

    if (direction === "left") {
    } else if (direction === "right") {
    }
  };

  const handleOnPress = () => {
    if (swipeStatus === "ended" && onPress) {
      onPress();
    }
  };

  //Mark: - Render
  const renderLeftActions = () => {
    return (
      <View className="bg-primary mt-[10px] p-[20px] rounded-[10px]">
        <Feather name="edit-3" size={20} color={colors.white} />
      </View>
    );
  };

  const renderRightActions = () => {
    return (
      <View className="bg-red mt-[10px] p-[20px] rounded-[10px] flex-1 justify-center items-center self-center">
        <Feather name="trash" size={20} color={colors.white} />
      </View>
    );
  };

  return (
    <Swipeable
      onSwipeableWillOpen={handleSwipeableWillOpen}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onBegan={() => setSwipeStatus("began")}
      onEnded={() => setSwipeStatus("ended")}
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
