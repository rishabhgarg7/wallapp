import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

const AddPostInput = () => {
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addPost = async () => {
    if (!postContent.trim()) {
      Alert.alert("Error", "Post content cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to post");
        return;
      }

      await addDoc(collection(db, "posts"), {
        content: postContent,
        userId: user.uid,
        timestamp: serverTimestamp(),
      });
      setIsLoading(false);
      setPostContent("");
    } catch (error) {
      console.error("Error adding post: ", error);
      Alert.alert("Error", "Failed to add post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="p-2 border-b border-gray-300">
      <TextInput
        className="p-2 mb-2"
        placeholder="Write something here..."
        value={postContent}
        onChangeText={setPostContent}
        multiline
        editable={!isLoading}
      />
      <TouchableOpacity
        className={`rounded-md ml-2 w-32 py-2 items-center ${
          isLoading ? "bg-gray-400" : "bg-[#00A3FF]"
        }`}
        onPress={addPost}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">Add to the wall</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddPostInput;
