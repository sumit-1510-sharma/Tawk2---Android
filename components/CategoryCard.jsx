import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { wp } from "../helpers/common";
import { useRouter } from "expo-router";

export default function CategoryCard({ slug, title, description }) {
  const router = useRouter(); // Hook to handle navigation

  const handlePress = () => {
    router.push(`/cardscreen/${slug}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
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
