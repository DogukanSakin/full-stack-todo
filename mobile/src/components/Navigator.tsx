import React from "react";
import { Pressable, View } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal, openModal } from "../store/features/modalSlice";

import AddModal from "./modals/AddModal";
import Home from "../screens/Home";
import Tags from "../screens/Tags";

import { colors } from "../constants/colors";

import { AntDesign, Entypo } from "@expo/vector-icons";
export default function Navigator() {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();
  // Mark: - Add Modal
  const addModalVisible = useAppSelector((state) => state.modal.modals.add);

  //Mark: - Render
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
              backgroundColor: colors.lightOpacity,
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
}
