import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../lib/firebase";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createUser = async () => {
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userDoc = {
        uid: user.uid,
        email: user.email,
        name: name,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      setUser(userDoc);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setErrors({ submit: error.message });
    }
  };

  return (
    <LinearGradient colors={["#000033", "#000000"]} className="h-full">
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="items-center justify-center w-full h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <View className="w-full mt-10">
              <Text className="text-3xl font-bold text-center text-white mb-6">
                Signup for <Text className="text-secondary-200">Wall</Text>
              </Text>
              <View className="mb-4">
                <TextInput
                  className="w-full h-12 bg-white/10 rounded-lg px-4 text-white"
                  placeholder="Name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                {errors.name && (
                  <Text className="text-red-500 mt-1 text-sm">
                    {errors.name}
                  </Text>
                )}
              </View>
              <View className="mb-4">
                <TextInput
                  className="w-full h-12 bg-white/10 rounded-lg px-4 text-white"
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text className="text-red-500 mt-1 text-sm">
                    {errors.email}
                  </Text>
                )}
              </View>
              <View className="mb-4">
                <TextInput
                  className="w-full h-12 bg-white/10 rounded-lg px-4 text-white"
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                {errors.password && (
                  <Text className="text-red-500 mt-1 text-sm">
                    {errors.password}
                  </Text>
                )}
              </View>
              {errors.submit && (
                <Text className="text-red-500 mb-2 text-sm">
                  {errors.submit}
                </Text>
              )}
              <CustomButton
                title="Sign Up"
                containerStyles="mt-4 mb-4"
                handlePress={createUser}
              />
              <View className="flex flex-row justify-center">
                <Text className="text-white">Already have an account? </Text>
                <Link href="/sign-in" className="text-secondary-200">
                  Sign in
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaView>
    </LinearGradient>
  );
}
