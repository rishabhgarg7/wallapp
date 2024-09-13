import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTGSrAkhMF3cC1MySSfpQjX2rhmxNJVNk",
  authDomain: "wallapp-rn.firebaseapp.com",
  projectId: "wallapp-rn",
  storageBucket: "wallapp-rn.appspot.com",
  messagingSenderId: "258047702501",
  appId: "1:258047702501:web:d81c260d3930453c112b0c",
  measurementId: "G-KVDD4F5WNG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export const db = getFirestore(app);
