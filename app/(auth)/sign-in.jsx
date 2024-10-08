import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../lib/firebase";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsLoggedIn, user, isLoggedIn, isLoading, setIsLoading } =
    useGlobalContext();

  console.log(
    "user and isLoggedIn in sign-in screen",
    user,
    isLoggedIn,
    isLoading
  );

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userData = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
      };
      setUser(userData);
      setIsLoggedIn(true);
      setIsLoading(false);
      console.log("Logged in successfully");
      router.replace("/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <LinearGradient colors={["#000033", "#000000"]} className="h-full">
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="items-center justify-center w-full h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <View className="w-full mt-10">
              <Text className="text-3xl font-bold text-center text-white mb-6">
                Sign in to <Text className="text-secondary-200">Wall</Text>
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
                className="w-full h-12 bg-white/10 rounded-lg px-4 mb-6 text-white"
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <CustomButton
                title="Sign In"
                containerStyles="mb-4"
                handlePress={handleLogin}
              />
              <View className="flex flex-row justify-center">
                <Text className="text-white">Don't have an account? </Text>
                <Link href="/sign-up" className="text-secondary-200">
                  Sign up
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
