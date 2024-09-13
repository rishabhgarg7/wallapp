import { View, Text } from "react-native";
import React from "react";
import { Stack, Redirect } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { user, isLoading } = useGlobalContext();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (user) {
    return <Redirect href="/home" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default AuthLayout;
