import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser } = useGlobalContext();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to upload a photo!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNameChange = async () => {
    if (user?.uid && name !== user.name) {
      try {
        await updateDoc(doc(db, "users", user.uid), { name });
        setUser((prevUser) => ({ ...prevUser, name }));
        alert("Name updated successfully");
        setIsProfileUpdated(true);
      } catch (error) {
        console.error("Error updating name:", error);
        alert("Failed to update name. Please try again.");
      }
    }
  };

  const handleGoBack = () => {
    if (isProfileUpdated) {
      router.replace({ pathname: "/home", params: { refresh: true } });
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={handleGoBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Profile</Text>
        </View>

        {/* <View className="items-center mb-6">
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center">
                <Text className="text-gray-600">Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View> */}

        <View className="mb-4">
          <Text className="text-gray-600 mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-md p-2"
          />
        </View>

        <TouchableOpacity
          onPress={handleNameChange}
          className="bg-blue-500 rounded-md p-3 items-center"
        >
          <Text className="text-white font-semibold">Update Name</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
