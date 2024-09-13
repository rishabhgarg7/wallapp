import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Redirect, router } from "expo-router";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";

import AddPostInput from "../components/AddPostInput";
import MessagesList from "../components/MessagesList";
import { auth, db } from "../lib/firebase";
import { useGlobalContext } from "../context/GlobalProvider";

const Home = () => {
  const { user, isLoading, isLoggedIn, setIsLoggedIn, setUser } =
    useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(() => {
    setIsLoadingPosts(true);
    setError(null);

    const postsQuery = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      postsQuery,
      async (snapshot) => {
        try {
          const fetchedPosts = await Promise.all(
            snapshot.docs.map(async (postDoc) => {
              const postData = postDoc.data();
              const userDoc = await getDoc(doc(db, "users", postData.userId));
              const userData = userDoc.data();

              return {
                id: postDoc.id,
                ...postData,
                userName: userData?.name || "Anonymous User",
                userPhotoURL: userData?.photoURL || null,
                timestamp: postData.timestamp
                  ?.toDate()
                  .toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toLowerCase()
                  .replace(" ", ""),
              };
            })
          );
          setPosts(fetchedPosts);
          setIsLoadingPosts(false);
        } catch (err) {
          console.error("Error processing posts: ", err);
          setError("Failed to process posts. Please try again.");
          setIsLoadingPosts(false);
        }
      },
      (err) => {
        console.error("Error fetching posts: ", err);
        setError("Failed to fetch posts. Please try again.");
        setIsLoadingPosts(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = fetchPosts();
    return () => unsubscribe();
  }, [fetchPosts]);

  if (!isLoading && (!user || !isLoggedIn)) {
    return <Redirect href="/" />;
  }

  const handleSignOut = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={handleSignOut}>
          <Text className="text-blue-500 font-semibold">Log Out</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold">Wall</Text>
        <Text className="text-xl text-white font-bold">Wall</Text>
      </View>

      <AddPostInput />

      {isLoadingPosts ? (
        <View className="flex-1 justify-center items-center">
          <Text>Loading posts...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 mb-4">{error}</Text>
          <TouchableOpacity
            onPress={fetchPosts}
            className="bg-blue-500 px-4 py-2 rounded-md"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <MessagesList messages={posts} />
      )}
    </SafeAreaView>
  );
};

export default Home;
