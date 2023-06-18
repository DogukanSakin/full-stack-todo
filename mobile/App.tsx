import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { store } from "./src/store";
import { Provider } from "react-redux";
import Navigator from "./src/components/Navigator";

export default function App() {
  // Mark: - Render
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Provider store={store}>
        <Navigator />
      </Provider>
    </NavigationContainer>
  );
}
