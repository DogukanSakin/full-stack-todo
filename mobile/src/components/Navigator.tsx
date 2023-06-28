import React from "react";
import { Pressable, View, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal, openModal } from "../store/features/modalSlice";

import AddModal from "./modals/AddModal";
import Home from "../screens/Home";
import Tags from "../screens/Tags";

import { colors } from "../constants/colors";

import { AntDesign, Entypo } from "@expo/vector-icons";

import { BlurView } from "expo-blur";

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
          tabBar={(props) => <BluredTabBar {...props} />}
          screenOptions={{
            headerShown: false,
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
                  className="justify-center items-center self-center bottom-[40px]  w-[70px] h-[70px] rounded-full"
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

function BluredTabBar(props: any) {
  return (
    <BlurView
      intensity={50}
      tint="light"
      className="absolute bottom-0 left-0 right-0"
    >
      <View className="flex-1 flex-row justify-between items-center bg-transparent h-[80px] w-full">
        {props.state.routes.map((route: any, index: any) => {
          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={route.name}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.descriptors[route.key]?.options?.tabBarIcon &&
                props.descriptors[route.key].options.tabBarIcon({
                  focused: isFocused,
                })}
              {props.descriptors[route.key]?.options?.tabBarButton &&
                props.descriptors[route.key].options.tabBarButton({
                  focused: isFocused,
                })}
            </TouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
}
