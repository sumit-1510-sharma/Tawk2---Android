import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import CategorySection from "../components/CategorySection";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "../components/ScreenWrapper";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wp } from "../helpers/common";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import PaymentBottomSheet from "../components/PaymentBottomSheet";

export default function Homescreen() {
  const [activeTab, setActiveTab] = useState("Fun");
  const flatListRef = useRef(null);
  const router = useRouter();
  const paymentBottomSheetRef = useRef();

  const handleOpenPaymentBottomSheet = () => {
    paymentBottomSheetRef.current.expand();
  };

  const tabs = [
    { key: "Fun", category: "Fun" },
    { key: "Connection", category: "Connection" },
    { key: "Reflection", category: "Reflection" },
  ];

  const onTabPress = (index) => {
    setActiveTab(tabs[index].key);
    flatListRef.current?.scrollToIndex({ index });
  };

  const onMomentumScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setActiveTab(tabs[index].key);
  };

  return (
    <ScreenWrapper bg="#121212" style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleOpenPaymentBottomSheet}
          style={styles.unlockPacks}
        >
          <Text>Unlock all packs now. Let's go </Text>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={styles.profileIconBg}
        >
          <FontAwesome5 name="user" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.packText}>Select a pack</Text>
      {/* Render content using FlatList */}
      <FlatList
        ref={flatListRef}
        data={tabs}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.content}>
            <CategorySection
              category={item.category}
              handleOpenPaymentBottomSheet={handleOpenPaymentBottomSheet}
            />
          </View>
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />

      {/* Tab bar at the bottom */}
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, activeTab === tab.key && styles.activeTab]}
            onPress={() => onTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <PaymentBottomSheet ref={paymentBottomSheetRef} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginHorizontal: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unlockPacks: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  profileIconBg: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  packText: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 12,
    fontFamily: "SyneFont",
  },
  content: {
    width: "100%", // Match FlatList item size
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
  tabBar: {
    // position: "absolute",
    // bottom: 20, // Adjust spacing from bottom
    flexDirection: "row",
    backgroundColor: "#242424",
    padding: 4,
    marginVertical: 4,
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 50,
    width: "90%", // Adjust tab bar width
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#464646", // Active tab background color
  },
  tabText: {
    color: "#888",
    fontSize: 16,
    fontFamily: "SyneFont",
  },
  activeTabText: {
    color: "#fff", // Active tab text color
  },
});
