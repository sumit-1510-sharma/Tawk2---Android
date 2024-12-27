import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import QuesCard from "../components/QuesCard";
import * as SQLite from "expo-sqlite";

export default function Favourites() {
  const [activeCategory, setActiveCategory] = useState("Deep Dark Secrets");
  const [favourites, setFavourites] = useState([]);

  const categories = [
    "Deep Dark Secrets",
    "Drama Club",
    "Forbidden Confessions",
    "Mystery Moments",
    "The Unfiltered Truth",
    "Fantasies & Desires",
    "The Love Files",
    "Forever Questions",
    "Through Thick and Thin",
    "Untold Memories",
    "The Meaning of Life",
    "Future Fantasies",
    "Courage & Fears",
    "The Bucket List",
    "If You Knew Me…",
  ];

  const fetchFavouriteQuestions = async (category) => {
    try {
      console.log("Fetching favourite questions for category:", category);
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");
      const rows = await db.getAllAsync(
        `SELECT * FROM favouritesTable WHERE category = ?`,
        [category]
      );
      const extractedQuestions = rows.map((item) => item.question);
      console.log(extractedQuestions);
      setFavourites(extractedQuestions);
    } catch (e) {
      console.error("Error fetching current questions:", e);
    }
  };

  useEffect(() => {
    fetchFavouriteQuestions(activeCategory);
  }, [activeCategory]);

  const cards = {
    "Deep Dark Secrets": [
      { id: 1, text: "What's a secret you've been keeping for years?" },
      {
        id: 2,
        text: "Have you ever done something illegal and not told anyone?",
      },
      {
        id: 3,
        text: "What’s your most embarrassing moment that no one knows?",
      },
      { id: 4, text: "What’s a guilty pleasure you’ve never confessed?" },
      { id: 5, text: "What’s the darkest thought you’ve ever had?" },
      {
        id: 6,
        text: "Have you ever lied about something serious to someone close?",
      },
    ],
    "Drama Club": [
      { id: 1, text: "What’s the most dramatic moment you’ve witnessed?" },
      {
        id: 2,
        text: "Have you ever been in the middle of someone else’s drama?",
      },
      { id: 3, text: "What’s a time you made a scene in public?" },
      { id: 4, text: "Who is the most dramatic person in your family?" },
      { id: 5, text: "What’s the biggest argument you’ve ever been in?" },
    ],
    "Forbidden Confessions": [
      { id: 1, text: "What’s something you’ve done that you know was wrong?" },
      {
        id: 2,
        text: "Have you ever had feelings for someone you shouldn’t have?",
      },
      { id: 3, text: "What’s a rule you broke and never admitted?" },
      { id: 4, text: "What’s a secret you’ve kept from your best friend?" },
      { id: 5, text: "Have you ever betrayed someone’s trust?" },
    ],
    "Mystery Moments": [
      {
        id: 1,
        text: "What’s the strangest thing that’s ever happened to you?",
      },
      {
        id: 2,
        text: "Have you ever encountered something you couldn’t explain?",
      },
      { id: 3, text: "What’s the biggest mystery in your life right now?" },
      { id: 4, text: "Have you ever felt like you were being watched?" },
      { id: 5, text: "What’s the creepiest experience you’ve ever had?" },
    ],
    "The Unfiltered Truth": [
      { id: 1, text: "What’s one truth you’re scared to admit?" },
      { id: 2, text: "Have you ever lied to save yourself?" },
      { id: 3, text: "What’s something you’ve never told your family?" },
      { id: 4, text: "What’s the hardest truth you’ve ever heard?" },
      { id: 5, text: "What’s a truth you wish more people knew about you?" },
    ],
    "Fantasies & Desires": [
      { id: 1, text: "What’s your wildest dream you hope to achieve?" },
      { id: 2, text: "What’s your ultimate romantic fantasy?" },
      { id: 3, text: "If money weren’t an issue, what would you do?" },
      { id: 4, text: "What’s a place you’ve always dreamed of visiting?" },
      { id: 5, text: "What’s a hidden desire you’ve never shared?" },
    ],
    "The Love Files": [
      { id: 1, text: "What’s your favorite memory of being in love?" },
      { id: 2, text: "What’s the most romantic thing you’ve ever done?" },
      { id: 3, text: "What’s a deal-breaker in a relationship for you?" },
      { id: 4, text: "What’s the most important lesson love has taught you?" },
      { id: 5, text: "Who was your first crush, and why?" },
    ],
    "Forever Questions": [
      { id: 1, text: "What’s something you could never live without?" },
      { id: 2, text: "What’s a promise you’ve made and kept forever?" },
      { id: 3, text: "What’s a belief you’ll hold onto forever?" },
      { id: 4, text: "What’s the most meaningful relationship in your life?" },
      { id: 5, text: "What’s a memory you’ll cherish forever?" },
    ],
    "Through Thick and Thin": [
      { id: 1, text: "Who’s the one person you can always count on?" },
      {
        id: 2,
        text: "What’s the hardest challenge you’ve overcome together with someone?",
      },
      { id: 3, text: "What’s a friendship that has stood the test of time?" },
      { id: 4, text: "What’s the most loyal thing someone has done for you?" },
      { id: 5, text: "What’s a time you proved your loyalty to someone?" },
    ],
    "Untold Memories": [
      { id: 1, text: "What’s a memory you never talk about?" },
      { id: 2, text: "What’s a moment in your life that changed everything?" },
      { id: 3, text: "What’s a childhood memory you still hold dear?" },
      { id: 4, text: "What’s a memory you’d love to relive?" },
      { id: 5, text: "What’s a bittersweet memory you’ll never forget?" },
    ],
    "The Meaning of Life": [
      { id: 1, text: "What’s your personal philosophy on life?" },
      { id: 2, text: "What do you think is the purpose of your life?" },
      { id: 3, text: "What’s the most important thing to you in life?" },
      { id: 4, text: "What’s a lesson life has taught you recently?" },
      { id: 5, text: "How do you define happiness in your life?" },
    ],
    "Future Fantasies": [
      { id: 1, text: "What’s a future goal you’re excited about?" },
      { id: 2, text: "What’s your dream career, and why?" },
      { id: 3, text: "Where do you see yourself in 10 years?" },
      { id: 4, text: "What’s a future adventure you want to go on?" },
      { id: 5, text: "What’s one thing you hope to achieve in life?" },
    ],
    "Courage & Fears": [
      { id: 1, text: "What’s a fear you’ve conquered?" },
      { id: 2, text: "What’s the bravest thing you’ve ever done?" },
      { id: 3, text: "What’s a fear you still struggle with?" },
      { id: 4, text: "What’s something that takes courage to admit?" },
      {
        id: 5,
        text: "What’s a situation that pushed you out of your comfort zone?",
      },
    ],
    "The Bucket List": [
      { id: 1, text: "What’s one thing on your bucket list?" },
      { id: 2, text: "What’s a dream experience you want to have?" },
      { id: 3, text: "What’s a country you’ve always wanted to visit?" },
      { id: 4, text: "What’s an activity you’d try at least once in life?" },
      { id: 5, text: "What’s a goal you’ve been putting off for too long?" },
    ],
    "If You Knew Me…": [
      { id: 1, text: "What’s one thing people misunderstand about you?" },
      {
        id: 2,
        text: "What’s something you’ve never told anyone about yourself?",
      },
      { id: 3, text: "What’s the most surprising thing about you?" },
      { id: 4, text: "What’s a talent or skill you rarely talk about?" },
      {
        id: 5,
        text: "What’s a part of your personality most people don’t see?",
      },
    ],
  };

  return (
    <ScreenWrapper bg="#121212">
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
        <Text style={styles.placeholder}></Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.outerTabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.tabButton,
                activeCategory === category && styles.activeTab,
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeCategory === category && styles.activeTabText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Cards Section */}
      <View style={styles.outerCardsContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {favourites.map((card, index) => (
            <QuesCard key={index} text={card} categoryTab={activeCategory} />
          ))}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  backButton: {
    color: "white",
    fontSize: 24,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "SyneFont",
  },
  placeholder: {},
  outerTabsContainer: {
    marginHorizontal: 16,
  },
  tabsContainer: {
    paddingVertical: 20,
    gap: 18,
  },
  tabButton: {
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SyneFont",
  },
  activeTabText: {
    color: "black",
  },
  scrollContent: {
    gap: 20,
  },
  outerCardsContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
});
