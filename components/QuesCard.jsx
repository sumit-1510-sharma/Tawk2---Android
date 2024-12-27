import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "../helpers/common";
import ViewShot from "react-native-view-shot";
import { shareAsync } from "expo-sharing";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function QuesCard({ text, categoryTab }) {
  const cardRef = useRef();

  const handleShare = async () => {
    try {
      const uri = await cardRef.current.capture();
      console.log(uri);

      await shareAsync(uri, {
        mimeType: "image/jpeg",
        dialogTitle: "Share this image",
        UTI: "public.jpeg",
      });
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

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTextMain}>{text}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.hiddenContainer}>
        <ViewShot
          ref={cardRef}
          options={{ format: "jpg", quality: 1 }}
          style={[
            styles.outerContainer,
            { backgroundColor: getBackgroundColor(categoryTab) },
          ]}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.cardText}>{text}</Text>
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.bottomText}>TAWK2</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <MaterialIcons name="favorite" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <FontAwesome name="share" size={20} color="black" />
          </TouchableOpacity>
        </ViewShot>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 8,
    elevation: 30, // Adds shadow for Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  cardTextMain: {
    color: "#000",
    fontSize: 16,
    flex: 1,
    marginRight: 32,
    marginVertical: "auto",
    fontFamily: "SyneFont",
  },
  iconContainer: {
    // backgroundColor: "red",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 20,
    minHeight: 60,
  },
  hiddenContainer: {
    position: "absolute",
    top: -1000, // Place it off-screen to keep it hidden
    opacity: 0,
  },
  outerContainer: {
    position: "relative",
    height: hp(65),
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
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
  },
  cardBottom: {
    position: "relative",
    height: hp(8),
    backgroundColor: "black",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bottomText: {
    color: "white",
    position: "absolute",
    right: wp(6),
    top: hp(2.5),
  },
  buttons: {
    position: "relative", // Optional, ensures buttons are inside this container
  },
  favoriteButton: {
    position: "absolute", // Absolute positioning
    bottom: 10, // Position from the top of the container
    left: 16, // Position from the left of the container
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: button background
    borderRadius: 20, // Rounded button
    padding: 10,
  },
  shareButton: {
    position: "absolute", // Absolute positioning
    bottom: 10, // Position from the top of the container
    right: 16, // Position from the right of the container
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: button background
    borderRadius: 20, // Rounded button
    padding: 10,
  },
});
