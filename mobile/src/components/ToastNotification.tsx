import React, { useEffect } from "react";
import { View } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { useAppSelector } from "../store/hooks";
import StyledText from "./StyledText";
import { TOAST_TYPES } from "../constants/toastTypes";
export default function ToastNotification() {
  //Mark: - States

  const toast = useAppSelector((state) => state.notification.toast);
  const isVisible = useSharedValue(false);

  //Mark: - Styles

  const toastStyle = useAnimatedStyle(() => {
    //transform and position animation
    return {
      opacity: withTiming(isVisible.value ? 1 : 0, { duration: 300 }),
      transform: [
        {
          translateY: withTiming(isVisible.value ? 0 : -50, { duration: 300 }),
        },
      ],
    };
  });

  let backgroundColor;

  switch (toast?.type) {
    case TOAST_TYPES.SUCCESS:
      backgroundColor = "bg-notificationSuccess";
      break;
    case TOAST_TYPES.ERROR:
      backgroundColor = "bg-notificationError";
      break;
    case TOAST_TYPES.INFO:
      backgroundColor = "bg-notificationInfo";
      break;
    default:
      backgroundColor = "bg-primary";
      break;
  }

  //Mark: - Hooks
  useEffect(() => {
    onNewToast();
  }, [toast]);

  //Mark: - Functions

  const onNewToast = () => {
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, toast.duration);
  };

  if (!toast?.message) {
    return null;
  }

  return (
    <Animated.View
      className={"absolute top-4 self-center rounded-full z-10 p-10"}
      style={toastStyle}
    >
      <View
        className={`${backgroundColor} p-[10px] rounded-full flex-row justify-center items-center`}
      >
        <StyledText
          overrideStyles={`${
            toast.type !== TOAST_TYPES.SUCCESS ? "text-white" : "text-black"
          } text-center`}
          text={toast.message}
          fontFamily="family-semiBold"
        />
      </View>
    </Animated.View>
  );
}
