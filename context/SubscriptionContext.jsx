import React, { createContext, useState, useEffect } from "react";
import * as InAppPurchases from "expo-iap";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [contextData, setContextData] = useState({});

  const updateContext = (key, value) => {
    setContextData((prev) => ({ ...prev, [key]: value }));
  };

  const checkSubscriptionStatus = async () => {
    try {
      const connectionResult = await InAppPurchases.initConnection();
      if (!connectionResult) {
        throw new Error("Failed to initialize IAP connection.");
      }
      console.log("IAP connection initialized");

      // Get available purchases (active subscriptions or items)
      const results = await InAppPurchases.getAvailablePurchases();
      console.log("Available Purchases:", results);

      // If the user has any active purchases, set the subscription status to true
      if (results && results.length > 0) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error("Error checking subscription status:", error);
      setIsSubscribed(false); // In case of error, assume the user is not subscribed
    } finally {
      await InAppPurchases.endConnection().catch((endConnectionError) =>
        console.error("Error ending IAP connection:", endConnectionError)
      );
    }
  };

  useEffect(() => {
    // Check subscription status when the component mounts
    checkSubscriptionStatus();

    // Cleanup on unmount
    return () => {
      InAppPurchases.endConnection().catch((endConnectionError) =>
        console.error(
          "Error ending IAP connection on unmount:",
          endConnectionError
        )
      );
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        setIsSubscribed,
        updateContext,
        contextData,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
