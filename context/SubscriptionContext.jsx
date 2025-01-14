import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load subscription status from AsyncStorage on app load
  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      const status = await AsyncStorage.getItem("isSubscribed");
      setIsSubscribed(status === "true");
    };

    loadSubscriptionStatus();
  }, []);

  // Function to update subscription status
  const updateSubscriptionStatus = (status) => {
    setIsSubscribed(status);
    AsyncStorage.setItem("isSubscribed", status.toString());
  };

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, updateSubscriptionStatus }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
