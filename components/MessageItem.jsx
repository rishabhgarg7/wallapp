import { View, Text, Image } from "react-native";
import React from "react";

const MessageItem = ({ name, message, time }) => (
  <View className="flex-row items-center mb-4">
    {/* <Image
        source={require("../assets/default-avatar.png")}
        className="w-10 h-10 rounded-full mr-3"
      /> */}
    <View className="flex-1">
      <View className="flex-row justify-between">
        <Text className="font-bold">{name}</Text>
        <Text className="text-gray-500">{time}</Text>
      </View>
      <Text>{message}</Text>
    </View>
  </View>
);

export default MessageItem;
