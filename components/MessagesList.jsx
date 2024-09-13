import React from "react";
import { View, Text, FlatList, Image } from "react-native";

const MessageItem = ({ item }) => (
  <View className="flex-row items-center py-2 px-4">
    {item.userPhotoURL ? (
      <Image
        source={{ uri: item.userPhotoURL }}
        className="w-8 h-8 rounded-full mr-2"
      />
    ) : (
      <View
        className="w-12 h-12 rounded-full
          bg-gray-300 mr-3"
      />
    )}
    <View className="flex-1">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">{item.userName}</Text>
        <Text className="text-gray-500 text-sm">{item.timestamp}</Text>
      </View>
      <Text className="text-gray-600">{item.content}</Text>
    </View>
  </View>
);

const MessagesList = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageItem item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
};

export default MessagesList;
