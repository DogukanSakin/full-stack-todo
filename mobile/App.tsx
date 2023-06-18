import React from "react";
import { View, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import { store } from "./src/store";
import { Provider } from "react-redux";

import Home from "./src/screens/Home";
import Tags from "./src/screens/Tags";
import AddModal from "./src/components/modals/AddModal";

import { AntDesign, Entypo } from "@expo/vector-icons";
import { colors } from "./src/constants/colors";
import { useAppDispatch, useAppSelector } from "./src/store/hooks";
import { closeModal, openModal } from "./src/store/features/modalSlice";

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

const Navigator = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();
  // Mark: - Add Modal
  const addModalVisible = useAppSelector((state) => state.modal.modals.add);
  return (
    <>
      <AddModal
        isVisible={addModalVisible}
        onClose={() => dispatch(closeModal("add"))}
      />
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          {/*Home Screen */}
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ focused }) => (
                <View className="flex-1 top-[10px] ">
                  <AntDesign
                    name="home"
                    size={24}
                    color={focused ? colors.focused : colors.unfocused}
                  />
                </View>
              ),
            }}
          />

          {/*Add Modal */}
          <Tab.Screen
            name="Add"
            component={View}
            options={{
              tabBarLabel: () => null,
              tabBarButton: () => (
                <Pressable
                  onPress={() => dispatch(openModal("add"))}
                  className="justify-center items-center self-center bottom-[20px]  w-[70px] h-[70px] rounded-full"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <View className="flex-1 bg-primary rounded-full w-[60px] h-[60px] justify-center items-center absolute">
                    <Entypo name="plus" size={24} color="white" />
                  </View>
                </Pressable>
              ),
            }}
          />

          {/*TagsScreen*/}
          <Tab.Screen
            name="Tags"
            component={Tags}
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ focused }) => (
                <View className="flex-1 top-[10px]">
                  <AntDesign
                    name="tagso"
                    size={24}
                    color={focused ? colors.focused : colors.unfocused}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};
