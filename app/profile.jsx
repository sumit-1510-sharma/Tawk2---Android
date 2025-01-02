import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "../components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  return (
    <ScreenWrapper bg="#121212">
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Header */}
        <TouchableOpacity style={styles.header}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Get closer to your close ones.</Text>
          <TouchableOpacity style={styles.unlockButton}>
            <Text style={styles.unlockText}>Unlock all packs</Text>
          </TouchableOpacity>
          <View style={styles.profileIcon}>
            <Image
              source={require("../assets/images/welcome.png")}
              resizeMode="contain"
              style={styles.profileImage}
            />
          </View>
        </View>

        <Text style={styles.settingsText}>Settings</Text>
        {/* Settings */}
        <ScrollView style={styles.settingsContainer}>
          <TouchableOpacity
            onPress={() => router.push("/favourites")}
            style={styles.settingItem}
          >
            <Text style={styles.settingText}>Favorites</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/history")}
            style={styles.settingItem}
          >
            <Text style={styles.settingText}>History</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push("/bottomsheet")}
          >
            <Text style={styles.settingText}>FAQs</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Restore Purchase</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemSupport]}
          >
            <Text style={styles.settingText}>Get Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </ScrollView>

        {/* Footer */}
        <Text style={styles.footerText}>Version 1.0</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  doneText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SyneFont",
  },
  profileIcon: {
    position: "absolute",
    right: 0,
    top: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFB6C1",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  banner: {
    position: "relative",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#000000",
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: "white",
    padding: 20,
    marginBottom: 40,
  },
  bannerText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "SyneFont",
  },
  unlockButton: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  unlockText: {
    color: "black",
    fontSize: 12,
    fontFamily: "SyneFont",
  },
  settingsText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    fontFamily: "SyneFont",
  },
  settingsContainer: {
    flexGrow: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  settingItem: {
    backgroundColor: "#3E3E3E",
    padding: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: "white",
    flexDirection: "row",
    justifyContent: "space-between", // Separate text and icon
    alignItems: "center", // Align vertically center
  },
  settingItemSupport: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 0,
  },
  settingText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "SyneFont",
  },
  footerText: {
    color: "#AAA",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 12,
    fontFamily: "SyneFont",
  },
});
