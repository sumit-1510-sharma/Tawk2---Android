import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font"; // Import the hook to load fonts

const _layout = () => {
  const [fontsLoaded] = useFonts({
    SyneFont: require("../assets/fonts/Syne-VariableFont_wght.ttf"), // Replace with your font path
  });

  // Main app screens
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="homescreen" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="history" />
      <Stack.Screen name="favourites" />
      <Stack.Screen name="bottomsheet" />
    </Stack>
  );
};

export default _layout;
