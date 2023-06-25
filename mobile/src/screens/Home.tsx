import React, { useCallback, useEffect } from "react";
import { ImageBackground, SafeAreaView, View, FlatList } from "react-native";
import StyledText from "../components/StyledText";
import CircularProgress from "../components/CircularProgress";
import { fetchTodos } from "../store/features/toDoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Task from "../models/Task";
import TaskCard from "../components/cards/TaskCard";

export default function Home() {
  const date = new Date().toDateString();
  const dispatch = useAppDispatch();

  //Mark: - States
  const todoData = useAppSelector((state) => state.todo.todos);

  //Mark: - Hooks

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  //Mark: - Functions

  //Mark: - Render
  const renderTodos = useCallback(
    ({ item }: { item: Task }) => <TaskCard item={item} />,
    [todoData]
  );

  return (
    <ImageBackground
      blurRadius={50}
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
              <View className="flex-1 justify-end">
                <StyledText
                  overrideStyles="text-white text-small mt-[10px]"
                  text={date}
                  fontFamily="family-medium"
                />
              </View>
            </View>

            {/*dashboard progess*/}
            <CircularProgress size={50} strokeWidth={3} progress={0.4} />
          </View>

          {/*todo list data*/}

          <FlatList
            data={todoData}
            renderItem={renderTodos}
            keyExtractor={(item): any => item._id}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
