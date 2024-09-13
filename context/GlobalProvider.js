import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../lib/firebase";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("user state change checking: useeffect ");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        };
        setUser(userDoc);
        setIsLoggedIn(true);
      } else {
        console.log("user is not logged in");
        setIsLoggedIn(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
