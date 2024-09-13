import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  const { isLoading, isLoggedIn, user } = useGlobalContext();

  console.log(
    "user and isLoggedIn in index splash screen",
    user,
    isLoggedIn,
    isLoading
  );
  if (!isLoading && isLoggedIn && user) {
    return <Redirect href="/home" />;
  }
  const handleContinue = () => {
    router.push("/sign-in");
    // router.push("/home");
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center w-full h-full px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-white mt-24">
              Share your thoughts with
              <Text className="text-secondary-200"> Wall</Text>
            </Text>
            <Text className="mt-2 text-center text-white">
              Wall helps you connect with the people in your life.
            </Text>
            <CustomButton
              title="Continue with Email"
              containerStyles={"mt-6"}
              handlePress={handleContinue}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
