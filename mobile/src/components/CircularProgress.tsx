import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

import { Svg, Circle } from "react-native-svg";
import { colors } from "../constants/colors";

import StyledText from "./StyledText";

interface IProps {
  progress: number;
  size: number;
  strokeWidth: number;
}

export default function CircularProgress({
  progress,
  size,
  strokeWidth,
}: IProps) {
  //Mark: - Animaton
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>(null);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const circumference = size * Math.PI;
  const radius = size / 2;
  const animatedStrokeWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  //Mark: - Hooks
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  //Mark: - Render
  return (
    <View className="justify-center items-center">
      <Svg width={size} height={size}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={colors.lightOpacity}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          ref={circleRef}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={colors.white}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={animatedStrokeWidth}
        />
      </Svg>
      <View
        className="justify-center items-center"
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <StyledText
          text={`${Math.round(progress * 100)}%`}
          overrideStyles="text-medium text-white  position-absolute"
          fontFamily="family-semiBold"
        />
      </View>
    </View>
  );
}
