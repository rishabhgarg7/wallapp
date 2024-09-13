import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../context/GlobalProvider";

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

const Home = () => {
  const { user } = useGlobalContext();
  console.log("user in home", user);
  const messages = [
    { id: "1", name: "Henry", message: "Message 1", time: "8:22pm" },
    { id: "2", name: "Zach", message: "Message 2", time: "8:21pm" },
    { id: "3", name: "Zach", message: "Message 3", time: "8:20pm" },
    { id: "4", name: "Henry", message: "Message 4", time: "8:19pm" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text className="text-blue-500 font-semibold">Log Out</Text>
        <Text className="text-xl font-bold">Wall</Text>
        <Text className="text-xl text-white font-bold">Wall</Text>
      </View>

      <View className="p-2 border-b border-gray-300 ">
        <TextInput className="p-2 mb-2" placeholder="Write something here..." />
        <TouchableOpacity className="bg-[#00A3FF] rounded-md w-32 py-2 items-center">
          <Text className="text-white font-semibold">Add to the wall</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        className="px-4 mt-4"
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageItem
            name={item.name}
            message={item.message}
            time={item.time}
          />
        )}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
};

export default Home;
