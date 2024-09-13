import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const createUser = async () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    console.log("Creating user with email:", email, "and password:", password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
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
            <TextInput
              className="w-full h-12 bg-white/10 rounded-lg px-4 mb-4 text-white"
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              className="w-full h-12 bg-white/10 rounded-lg px-4 mb-1 text-white"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={validatePassword}
              secureTextEntry
            />
            {passwordError ? (
              <Text className="text-red-500 mb-4 text-sm">{passwordError}</Text>
            ) : (
              <View className="mb-4" />
            )}
            <CustomButton
              title="Sign Up"
              containerStyles="mb-4"
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
  );
}
