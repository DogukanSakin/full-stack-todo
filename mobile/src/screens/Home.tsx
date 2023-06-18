import React from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import StyledText from "../components/StyledText";
import CircularProgress from "../components/CircularProgress";

export default function Home() {
  const date = new Date().toDateString();

  return (
    <ImageBackground
      className="flex-1"
      source={require("../../assets/background/background.jpg")}
    >
      <SafeAreaView className="flex-1">
        {/*main container */}
        <View className="p-[20px]">
          {/*dashboard */}
          <View className="bg-lightOpacity p-[20px] rounded justify-between flex-row">
            {/*dashboard header*/}
            <View>
              <StyledText
                overrideStyles="text-white"
                text="Hello 👋"
                fontFamily="family-semiBold"
              />
              <StyledText
                overrideStyles="text-white text-small mt-[10px]"
                text={date}
                fontFamily="family-medium"
              />
            </View>

            {/*dashboard progess*/}
            <CircularProgress size={60} strokeWidth={3} progress={0.7} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
