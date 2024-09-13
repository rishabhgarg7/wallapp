import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";

export default function AppLayout() {
  const { user, isLoading } = useGlobalContext();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  );
}
