import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { wp } from "../helpers/common";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CategoryCard({ slug, title, description, index }) {
  const router = useRouter(); // Hook to handle navigation

  // Mapping categories to their respective images
  const categoryImages = {
    "Deep Dark Secrets": require("../assets/images/ddsemoji.png"),
    "Drama Club": require("../assets/images/dcemoji.png"),
    "Forbidden Confessions": require("../assets/images/fcemoji.png"),
    "Mystery Moments": require("../assets/images/mmemoji.png"),
    "The Unfiltered Truth": require("../assets/images/tutemoji.png"),
    "Fantasies & Desires": require("../assets/images/fndemoji.png"),
    "The Love Files": require("../assets/images/tlfemoji.png"),
    "Forever Questions": require("../assets/images/fqemoji.png"),
    "Through Thick and Thin": require("../assets/images/ttntemoji.png"),
    "Untold Memories": require("../assets/images/umemoji.png"),
    "The Meaning of Life": require("../assets/images/tmolemoji.png"),
    "Future Fantasies": require("../assets/images/ffemoji.png"),
    "Courage & Fears": require("../assets/images/cnfemoji.png"),
    "The Bucket List": require("../assets/images/tblemoji.png"),
    "If You Knew Me...": require("../assets/images/iykmemoji.png"),
  };

  const handlePress = async () => {
    try {
      const isSubscribed = await AsyncStorage.getItem("isSubscribed");

      if (isSubscribed === "true" || index < 3) {
        // Allow access if the user is subscribed or the category index is within free range
        router.push(`/cardscreen/${slug}`);
      } else {
        // Show alert for locked categories
        Alert.alert(
          "Upgrade Required",
          "Unlock this category and more by upgrading to a premium account."
        );
      }
    } catch (error) {
      console.error(
        "Error reading subscription status from AsyncStorage",
        error
      );
      Alert.alert(
        "Error",
        "Unable to check subscription status. Please try again."
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {/* Dynamic Image */}
      {categoryImages[title] && (
        <Image source={categoryImages[title]} style={styles.image} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    marginHorizontal: "auto",
    width: wp(95),
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(204, 204, 204, 0.5)", // Sleek border color
    borderRadius: 8,
    position: "relative", // Ensures child elements can be absolutely positioned
  },
  image: {
    width: 40, // Adjust size as needed
    height: 40,
    position: "absolute",
    right: 10,
    top: "50%",
  },
  title: {
    fontSize: 24,
    fontFamily: "SyneFont",
    color: "white",
  },
  description: {
    fontSize: 12,
    fontFamily: "SyneFont",
    color: "rgba(204, 204, 204, 0.5)",
  },
});
