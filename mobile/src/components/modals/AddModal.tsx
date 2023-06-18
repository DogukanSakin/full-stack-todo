import React from "react";
import { View } from "react-native";

import Modal from "react-native-modal";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AddModal({ isVisible, onClose }: IProps) {
  return (
    <Modal
      isVisible={isVisible}
      className="justify-end m-[0]"
      onBackdropPress={onClose}
    >
      <View className="bg-white rounded-t-[20px] p-[20px]"></View>
    </Modal>
  );
}
