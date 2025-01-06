import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { hp, wp } from "../helpers/common";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ViewShot from "react-native-view-shot";
import { shareAsync } from "expo-sharing";
import * as SQLite from "expo-sqlite";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Card({ item, category, index }) {
  const cardRef = useRef();
  const [isfavoritePressed, setIsFavouritePressed] = useState(false);

  useEffect(() => {
    checkIfFavourite();
  }, []);

  const checkIfFavourite = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");
      const selectQuery = `SELECT 1 FROM favouritesTable WHERE category = ? AND question = ? LIMIT 1;`;
      const result = await db.getFirstAsync(selectQuery, [category, item]);

      // If a result is found, set the state to true
      setIsFavouritePressed(result ? true : false);
    } catch (e) {
      console.log("Error checking if question is favourite:", e);
    }
  };

  const handleShare = async () => {
    try {
      setTimeout(async () => {
        const uri = await cardRef.current.capture();
        console.log(uri);

        await shareAsync(uri, {
          mimeType: "image/jpeg",
          dialogTitle: "Share this image",
          UTI: "public.jpeg",
        });
      }, 250); // 250 milliseconds delay so that share button is not seen inactive in the screenshot
    } catch (error) {
      console.log("Error sharing screenshot: ", error);
    }
  };

  const getBackgroundColor = (screen) => {
    switch (screen) {
      case "Deep Dark Secrets":
        return "#BEBEFF"; // Color for 'deep_dark_secrets'
      case "Drama Club":
        return "#CCFFD2"; // Color for 'drama_club'
      case "Forbidden Confessions":
        return "#FFC9C9"; // Color for 'forbidden_confessions'
      case "Mystery Moments":
        return "#C9D1FF"; // Color for 'mystery_moments'
      case "The Unfiltered Truth":
        return "#FFF6C7"; // Color for 'the_unfiltered_truth'
      case "Fantasies & Desires":
        return "#FFD5FD"; // Color for 'fantasies_and_desires'
      case "The Love Files":
        return "#FF6464"; // Color for 'the_love_files'
      case "Forever Questions":
        return "#FFF9B7"; // Color for 'forever_questions'
      case "Through Thick and Thin":
        return "#B4FFA2"; // Color for 'through_thick_and_thin'
      case "Untold Memories":
        return "#FFBF90"; // Color for 'untold_memories'
      case "The Meaning of Life":
        return "#FFD9BF"; // Color for 'the_meaning_of_life'
      case "Future Fantasies":
        return "#FFC9C9"; // Color for 'future_fantasies'
      case "Courage & Fears":
        return "#CAC7FF"; // Color for 'courage_and_fears'
      case "The Bucket List":
        return "#BCFFDD"; // Color for 'the_bucket_list'
      case "If You Knew Me…":
        return "#FBFFD0"; // Color for 'if_you_knew_me'
      default:
        return "gray"; // Default color
    }
  };

  const insertFavouriteQuestion = async () => {
    console.log("Inserting favourite question...");

    try {
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");
      const insertQuery = `INSERT INTO favouritesTable (category, question, created_at) VALUES (?, ?, ?);`;
      await db.runAsync(insertQuery, [
        category,
        item,
        new Date().toISOString(),
      ]);
      setIsFavouritePressed(true);
      console.log(`Inserted question: ${item}`);
    } catch (e) {
      console.log("Error inserting favourite question:", e);
    }
  };

  const removeFavouriteQuestion = async () => {
    console.log("Removing favourite question...");

    try {
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");
      const deleteQuery = `DELETE FROM favouritesTable WHERE category = ? AND question = ?;`;
      await db.runAsync(deleteQuery, [category, item]);
      setIsFavouritePressed(false);
      console.log(`Removed question: ${item}`);
    } catch (e) {
      console.log("Error removing favourite question:", e);
    }
  };

  return (
    <ViewShot
      ref={cardRef}
      options={{ format: "jpg", quality: 1 }}
      style={[
        styles.outerContainer,
        { backgroundColor: getBackgroundColor(category) },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{item}</Text>
        </View>
        <View style={styles.cardBottom}>
          <View style={styles.bottomTextContainer}>
            <Image
              style={styles.bottomImage}
              source={require("../assets/images/welcome.png")}
              resizeMode="contain"
            ></Image>
            <Text style={styles.bottomText}>TAWK2</Text>
          </View>
        </View>
      </View>
      {isfavoritePressed ? (
        <TouchableOpacity
          onPress={removeFavouriteQuestion}
          style={styles.favoriteButton}
        >
          <Ionicons name="heart" size={32} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={insertFavouriteQuestion}
          style={styles.favoriteButton}
        >
          <Ionicons name="heart-outline" size={32} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
        <Ionicons name="share-outline" size={32} color="black" />
      </TouchableOpacity>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    height: hp(65),
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    zIndex: -1,
  },
  card: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: wp(85),
    marginHorizontal: "auto",
    height: hp(40),
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "SyneFont",
  },
  cardBottom: {
    position: "relative",
    height: hp(8),
    backgroundColor: "black",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomTextContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    right: wp(6),
    top: hp(2.5),
  },
  bottomImage: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  bottomText: {
    color: "white",
    fontFamily: "SyneFont",
  },
  buttons: {
    position: "relative", // Optional, ensures buttons are inside this container
  },
  favoriteButton: {
    position: "absolute", // Absolute positioning
    bottom: 10, // Position from the top of the container
    left: 16, // Position from the left of the container
    background: "transparent", //
    borderRadius: 20, // Rounded button
  },
  shareButton: {
    position: "absolute", // Absolute positioning
    bottom: 10, // Position from the top of the container
    right: 16, // Position from the right of the container
    backgound: "transparent",
    borderRadius: 20, // Rounded button
  },
});
