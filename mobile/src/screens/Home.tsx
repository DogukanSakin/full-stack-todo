import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import StyledText from "../components/StyledText";
import CircularProgress from "../components/CircularProgress";
import {
  calculateCompletedPercentage,
  clearSelectedTodo,
  deleteTodoById,
  fetchTodos,
  setSelectedTodo,
  setTodos,
  updateTodo,
} from "../store/features/toDoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Task from "../models/Task";
import TaskCard from "../components/cards/TaskCard";
import StyledInput from "../components/StyledInput";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { showSuccessNotification } from "../store/features/notificationSlice";
import { closeModal, openModal } from "../store/features/modalSlice";
import TaskModal from "../components/modals/TaskModal";

export default function Home() {
  const dispatch = useAppDispatch();

  //Mark: - States
  const fetchedData = useAppSelector((state) => state.todo.todos);
  const taskModalVisible = useAppSelector((state) => state.modal.modals.task);

  const [dashboardComponent, setDashboardComponent] = useState<
    "dashboard" | "searchBar"
  >("dashboard");
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  //Mark: - Hooks

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  //Mark: - Functions

  const handleSearchBarOpen = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setDashboardComponent("searchBar");
  };

  const handleSearchBarClose = () => {
    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setDashboardComponent("dashboard");
      dispatch(fetchTodos());
    });
  };

  const handleSearch = (text: string) => {
    const searchResult = fetchedData.filter((item) =>
      item.name!!.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(setTodos(searchResult));
  };

  const handleEditTodo = (item: Task) => {
    dispatch(setSelectedTodo(item));
    dispatch(openModal("task"));
  };

  const handleModalClose = () => {
    dispatch(closeModal("task"));
    dispatch(clearSelectedTodo());
  };

  //Mark: - Render
  const renderTodos = ({ item }: { item: Task }) => (
    <TaskCard
      item={item}
      onUpdate={handleEditTodo}
      onDelete={() => dispatch(deleteTodoById(item))}
      onPress={() => {
        dispatch(updateTodo({ ...item, completed: !item.completed }));
        dispatch(calculateCompletedPercentage());
      }}
    />
  );

  return (
    <ImageBackground
      blurRadius={50}
      className="flex-1"
      source={require("../../assets/background/background.jpg")}
    >
      <SafeAreaView className="flex-1">
        {/*Task modal */}
        {taskModalVisible && (
          <TaskModal isVisible={taskModalVisible} onClose={handleModalClose} />
        )}
        {/*main container */}
        <View className="p-[20px]">
          {/*actions button */}
          <View className="flex-row justify-end">
            <Pressable
              className="bg-lightOpacity h-[24px] w-[24px] rounded justify-center items-center"
              onPress={
                dashboardComponent === "dashboard"
                  ? handleSearchBarOpen
                  : handleSearchBarClose
              }
            >
              {dashboardComponent === "dashboard" ? (
                <AntDesign name="search1" size={20} color={colors.white} />
              ) : (
                <Animated.View style={{ opacity: opacityAnimation }}>
                  <AntDesign name="close" size={24} color={colors.white} />
                </Animated.View>
              )}
            </Pressable>
          </View>

          {/*dashboard */}
          <View className=" mt-[10px] mb-[10px]">
            {dashboardComponent === "dashboard" ? (
              <Dashboard />
            ) : (
              <Animated.View style={{ opacity: opacityAnimation }}>
                <StyledInput
                  placeholder="Search"
                  overrideStyles="h-[60px]"
                  onChangeText={handleSearch}
                />
              </Animated.View>
            )}
          </View>

          {/*todo list data*/}
          <FlatList
            data={fetchedData}
            renderItem={renderTodos}
            keyExtractor={(item) => item._id!!}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function Dashboard() {
  //Mark: - States
  const date = new Date().toDateString();
  const completedPercentage =
    useAppSelector((state) => state.todo.completedPercentage) || 0;

  //Mark: - Render
  return (
    <View className="flex-row justify-between h-[60px]">
      {/*dashboard header*/}
      <View>
        <StyledText
          overrideStyles="text-white text-xlarge"
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

      <CircularProgress
        size={50}
        strokeWidth={3}
        progress={completedPercentage}
      />
    </View>
  );
}
