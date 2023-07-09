import React, { useState } from "react";
import { View } from "react-native";

import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

import StyledInput from "../StyledInput";
import StyledText from "../StyledText";
import { colors } from "../../constants/colors";
import StyledButton from "../StyledButton";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewTodo, updateTodo } from "../../store/features/toDoSlice";
import Task from "../../models/Task";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TaskModal({ isVisible, onClose }: IProps) {
  //Mark: - States
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const selectedTodo = useAppSelector((state) => state.todo.selectedTodo);
  const [newTask, setNewTask] = useState<Task>({ ...selectedTodo });

  //Mark: - Handlers

  const handleAddTodo = async () => {
    if (newTask?.name === undefined || newTask?.name === "") return;
    setLoading(true);
    (await selectedTodo)
      ? dispatch(updateTodo({ ...selectedTodo, ...newTask }))
      : dispatch(addNewTodo(newTask));
    setLoading(false);
    onClose();
  };

  //Mark: - Render
  return (
    <Modal
      isVisible={isVisible}
      className="justify-end m-[0]"
      onBackdropPress={onClose}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        className="rounded-t-[20px] p-[20px]"
        colors={colors.modalGradientColors}
      >
        <View className="flex-row justify-between items-center mb-[20px]">
          <StyledText
            overrideStyles="text-white text-xlarge"
            text="Add a new item for your list"
            fontFamily="family-semiBold"
          />
          <AntDesign
            name="closecircle"
            size={24}
            color={colors.white}
            onPress={onClose}
          />
        </View>
        <StyledInput
          value={newTask?.name}
          placeholder="Write your task..."
          onChangeText={(t: string) => setNewTask({ name: t })}
        />
        <StyledButton
          loading={loading}
          overrideStyles="mt-[20px] mb-[20px]"
          placeholder="Add"
          onPress={handleAddTodo}
        />
      </LinearGradient>
    </Modal>
  );
}
