import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { store } from "./src/store";
import { Provider } from "react-redux";
import Navigator from "./src/components/Navigator";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ToastNotification from "./src/components/ToastNotification";

export default function App() {
  // Mark: - Render
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Provider store={store}>
          <ToastNotification />
          <Navigator />
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
