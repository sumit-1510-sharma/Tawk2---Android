import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Card from "../../components/Card";
import * as SQLite from "expo-sqlite";
import { wp } from "../../helpers/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PackBottomSheet from "../../components/PackBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CategoryBottomSheet from "../../components/CategoryBottomSheet";
import { Ionicons } from "@expo/vector-icons";
import ResumeBottomSheet from "../../components/ResumeBottomSheet";
import PaymentBottomSheet from "../../components/PaymentBottomSheet";
import { SubscriptionContext } from "../../context/SubscriptionContext";

export default function CardScreen() {
  const { cardscreen } = useLocalSearchParams(); // Get the dynamic category from URL
  const [entries, setEntries] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryPrompt, setCategoryPrompt] = useState("");
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(); // Track the current index
  const flatListRef = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false); // To manage loading state
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const bottomSheetRef = useRef();
  const categoryBottomSheetRef = useRef();
  const resumeBottomSheetRef = useRef();
  const paymentBottomSheetRef = useRef();
  const { updateContext } = useContext(SubscriptionContext);
  const { contextData } = useContext(SubscriptionContext);

  const handleOpenPaymentBottomSheet = () => {
    paymentBottomSheetRef.current.expand();
  };

  useEffect(() => {
    // Set the categoryTitle based on cardscreen
    categoryTitleFunction(cardscreen);
  }, [cardscreen]);

  useEffect(() => {
    const initialize = async () => {
      if (categoryTitle) {
        await fetchCurrentQuestions(categoryTitle); // Fetch questions for the category
        await getCurrentIndex(categoryTitle, setCurrentIndex); // Get and set saved index
      }
    };

    initialize();
  }, [categoryTitle]);

  const getCurrentIndex = async (categoryTitle, setCurrentIndex) => {
    try {
      const key = `category_${categoryTitle}`;
      const savedIndex = await AsyncStorage.getItem(key);
      if (savedIndex !== null) {
        setCurrentIndex(parseInt(savedIndex, 10)); // Set the saved index
      } else {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error fetching index from AsyncStorage:", error);
    }
  };

  const categoryTitleFunction = (cardscreen) => {
    let title = "";
    let prompt = "";
    switch (cardscreen) {
      case "deep_dark_secrets":
        title = "Deep Dark Secrets";
        prompt =
          "Generate 30 questions for the 'Deep Dark Secrets' pack. 50% of the questions (15) should be NSFW, and the rest should remain playful, daring, or revealing. The questions should be mixed together so the NSFW content is integrated within the overall set. Keep the tone mischievous and fun, with each question no more than 7-8 words. Ensure the NSFW content is playful, respectful, and encouraging open, honest conversation.";
        break;
      case "drama_club":
        title = "Drama Club";
        prompt =
          "Generate 30 couple questions 'For all those juicy stories you just can’t resist sharing—expect drama, suspense, and laughter' pack. 50% of the questions (15) should be NSFW, with the rest focusing on juicy, dramatic, and laughter-filled stories. The questions should be mixed together so the NSFW content fits naturally. Keep them playful, exciting, and engaging, with each question no more than 7-8 words. Ensure the NSFW content is playful, respectful, and encouraging open, honest conversation.";
        break;
      case "forbidden_confessions":
        title = "Forbidden Confessions";
        prompt =
          "Generate 30 questions for the 'Forbidden Confessions' pack. 50% of the questions (15) should be NSFW, with the rest being slightly risqué, secretive, or taboo. The questions should be mixed together, with NSFW content flowing naturally within the pack. Keep them playful, teasing, and concise (7-8 words), encouraging open sharing. Ensure the NSFW content is playful, respectful, and encouraging open, honest conversation.";
        break;
      case "mystery_moments":
        title = "Mystery Moments";
        prompt =
          "Generate 30 questions for the 'Mystery Moments' pack. These should explore mysterious, untold stories or “what really happened” moments. Keep the tone fun, engaging, and lighthearted. All questions should be concise (7-8 words).";
        break;
      case "the_unfiltered_truth":
        title = "The Unfiltered Truth";
        prompt =
          "Generate 30 questions for the 'Unfiltered Truth' pack. These should be bold, honest, and raw—things people wouldn’t usually admit. Keep the tone conversational and all questions concise (7-8 words).";
        break;
      case "fantasies_and_desires":
        title = "Fantasies & Desires";
        prompt =
          "Generate 30 questions for the 'Fantasies & Desires' pack. 50% of the questions (15) should be NSFW, exploring fantasies and intimate desires, while the rest should be playful and intimate. The NSFW questions should be mixed naturally with the non-NSFW ones. Keep the tone fun, slightly daring, and concise (7-8 words). Ensure the NSFW content is playful, respectful, and encouraging open, honest conversation.";
        break;
      case "the_love_files":
        title = "The Love Files";
        prompt =
          "Generate 30 questions for 'The Love Files' pack. These should bring out heartfelt, romantic thoughts and memories. Keep the tone warm and endearing. All questions should be concise (7-8 words).";
        break;
      case "forever_questions":
        title = "Forever Questions";
        prompt =
          "Generate 30 questions for the 'Forever Questions' pack. These should focus on deep, soulmate-level questions about long-term connection and love. Keep the tone warm, introspective, and concise (7-8 words).";
        break;
      case "through_thick_and_thin":
        title = "Through Thick and Thin";
        prompt =
          "Generate 30 questions for the 'Through Thick and Thin' pack. These should explore commitment, challenges, and growth in the relationship. Keep the tone supportive and conversational. All questions should be concise (7-8 words).";
        break;
      case "untold_memories":
        title = "Untold Memories";
        prompt =
          "Generate 30 questions for the 'Untold Memories' pack. These should encourage sharing never-revealed personal stories and experiences. Keep the tone curious and warm. All questions should be concise (7-8 words).";
        break;
      case "the_meaning_of_life":
        title = "The Meaning of Life";
        prompt =
          "Generate 30 questions for 'The Meaning of Life' pack. These should challenge beliefs and spark deep, philosophical discussions. Keep the tone reflective and curious. All questions should be concise (7-8 words).";
        break;
      case "future_fantasies":
        title = "Future Fantasies";
        prompt =
          "Generate 30 questions for the 'Future Fantasies' pack. These should inspire discussions about future goals, dreams, and possibilities. Keep the tone imaginative and hopeful. All questions should be concise (7-8 words).";
        break;
      case "courage_and_fears":
        title = "Courage & Fears";
        prompt =
          "Generate 30 questions for the 'Courage & Fears' pack. These should explore personal fears and acts of bravery. Keep the tone empathetic and engaging. All questions should be concise (7-8 words).";
        break;
      case "the_bucket_list":
        title = "The Bucket List";
        prompt =
          "Generate 30 questions for 'The Bucket List' pack. These should uncover life goals, travel dreams, and ultimate aspirations. Keep the tone fun and optimistic. All questions should be concise (7-8 words).";
        break;
      case "if_you_knew_me":
        title = "If You Knew Me…";
        prompt =
          "Generate 30 questions for the 'If You Knew Me' pack. 50% of the questions (15) should be NSFW, mixed with the rest being revealing, lighthearted, and daring. The questions should be designed to spark deep revelations while encouraging a sense of curiosity and fun. Keep them concise (7-8 words) and open for honest, often playful sharing. Ensure the NSFW content is playful, respectful, and encouraging open, honest conversation.";
        break;
      default:
        title = "Unknown Category"; // Default case
        prompt = "Unknown Category"; // Default case
    }
    setCategoryTitle(title); // Update the state with the title
    setCategoryPrompt(prompt);
  };

  const fetchCurrentQuestions = async (category) => {
    let db;
    try {
      db = await SQLite.openDatabaseAsync("ProductionDatabase");

      const rows = await db.getAllAsync(
        `SELECT * FROM questionsTable WHERE category = ? AND type = ?`,
        [category, "current"]
      );

      const extractedQuestions = rows.map((item) => item.question);

      const questionsWithLoading = [
        ...extractedQuestions,
        "Loading more questions...",
      ];

      setCurrentQuestions(questionsWithLoading);
    } catch (e) {
      console.error("Error fetching current questions:", e);
    } finally {
      // Ensure the database connection is closed after the operation
      if (db) {
        await db.closeAsync(); // Close the database connection
      }
    }
  };

  const moveToHistory = async (db, category) => {
    try {
      await db.runAsync(
        `UPDATE questionsTable SET type = ? WHERE category = ? AND type = ?`,
        ["history", category, "current"]
      );
    } catch (error) {
      console.error("Error moving questions to history:", error);
      throw error;
    }
  };

  const addNewQuestions = async (db, category, questions) => {
    try {
      for (const question of questions) {
        await db.runAsync(
          `INSERT INTO questionsTable (category, question, type, created_at) VALUES (?, ?, ?, ?)`,
          [category, question, "current", new Date().toISOString()]
        );
      }
    } catch (error) {
      console.error("Error adding new questions:", error);
      throw error;
    }
  };

  const handleGenerateQuestions = async (category, newQuestions) => {
    let db;
    try {
      db = await SQLite.openDatabaseAsync("ProductionDatabase");
      await moveToHistory(db, category);
      await addNewQuestions(db, category, newQuestions);
    } catch (error) {
      console.error("Error in handleGenerateQuestions:", error);
      throw error;
    } finally {
      if (db) {
        await db.closeAsync();
      }
    }
  };

  const fetchMoreCards = async () => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`, // Replace with your actual API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a conversation assistant designed to create engaging, fun, and meaningful questions for various categories of conversation packs for couples. Each pack has a unique theme, tone, and purpose. All questions should be concise (7-8 words), readable at an 8th-grade level, and encourage open, honest, and sometimes daring conversation. Maintain the tone that fits the pack’s theme—whether mischievous, fun, romantic, or introspective—while ensuring the content flows naturally.",
              },
              {
                role: "user",
                content: `${categoryPrompt}`,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "question_response",
                schema: {
                  type: "object",
                  properties: {
                    questions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                  required: ["questions"],
                  additionalProperties: false,
                },
                strict: true,
              },
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.statusText}`);
      }

      const data = await response.json();
      const parsedContent = JSON.parse(data.choices[0].message.content);

      await handleGenerateQuestions(categoryTitle, parsedContent.questions);
      await AsyncStorage.removeItem(`category_${categoryTitle}`);

      updateContext(categoryTitle, "new questions generated");
      router.back();
    } catch (error) {
      console.error("Error fetching more cards:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = wp(100);
    const index = Math.floor(contentOffsetX / itemWidth);
    setCurrentIndex(index);
    saveCurrentIndex(index);
  };

  const saveCurrentIndex = async (index) => {
    try {
      const key = `category_${categoryTitle}`;
      await AsyncStorage.setItem(key, index.toString());
    } catch (error) {
      console.error("Error saving index to AsyncStorage:", error);
    }
  };

  const scrollToNext = () => {
    if (flatListRef.current && currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const scrollToPrevious = () => {
    if (flatListRef.current && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleOpenCategoryBottomSheet = () => {
    categoryBottomSheetRef.current?.expand(); // Expands the bottom sheet
  };

  const handleStartOver = async () => {
    try {
      const key = `category_${categoryTitle}`; // Replace with your dynamic category
      await AsyncStorage.removeItem(key);
      resumeBottomSheetRef.current.close();
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    } catch (e) {
      console.error("Error clearing category data", e);
    }
  };

  return (
    <ScreenWrapper bg="#121212">
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.indexTextContainer}>
            <Text style={styles.indexText}>
              {currentIndex + 1} / {currentQuestions.length}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerInnerContainer}
            onPress={handleOpenCategoryBottomSheet}
          >
            <Text style={styles.headerTitle}>{categoryTitle}</Text>
            <View style={styles.downArrowButton}>
              <Ionicons name="caret-down-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <View></View>
        </View>

        {currentQuestions.length > 0 && typeof currentIndex === "number" && (
          <FlatList
            ref={flatListRef}
            data={currentQuestions}
            renderItem={({ item, index }) => (
              <Card item={item} category={categoryTitle} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToAlignment="center"
            onEndReached={fetchMoreCards}
            onEndReachedThreshold={0.5}
            initialScrollIndex={currentIndex}
            onMomentumScrollEnd={handleScroll}
            getItemLayout={(data, index) => ({
              length: wp(100), // Width of each item
              offset: wp(100) * index,
              index,
            })}
            onScrollToIndexFailed={(error) => {
              console.warn("Scroll to index failed:", error);
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: false,
              });
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={scrollToPrevious}
            style={[styles.button, currentIndex === 0 && styles.disabledButton]}
            disabled={currentIndex === 0}
          >
            <Ionicons name="chevron-back" size={28} color={"white"} />
            <Text
              style={[
                styles.buttonText,
                currentIndex === 0 && styles.disabledButtonText,
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={scrollToNext}
            style={[
              styles.button,
              currentIndex === currentQuestions.length - 1 &&
                styles.disabledButton,
            ]}
            disabled={currentIndex === currentQuestions.length - 1}
          >
            <Text
              style={[
                styles.buttonText,
                currentIndex === currentQuestions.length - 1 &&
                  styles.disabledButtonText,
              ]}
            >
              Next
            </Text>
            <Ionicons name="chevron-forward" size={28} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      {contextData[categoryTitle] && (
        <View style={styles.newGenerationTag}>
          <Text style={styles.newGenerationTagText}>
            ✨ This pack has new set of questions
          </Text>
        </View>
      )}

      {(currentIndex === 20 || currentIndex === 10) && (
        <PackBottomSheet
          ref={bottomSheetRef}
          handleOpenPaymentBottomSheet={handleOpenPaymentBottomSheet}
        />
      )}
      <CategoryBottomSheet
        category={cardscreen}
        handleOpenPaymentBottomSheet={handleOpenPaymentBottomSheet}
        ref={categoryBottomSheetRef}
      />
      {currentIndex > 0 && currentIndex < currentQuestions.length - 1 && (
        <ResumeBottomSheet
          category={categoryTitle}
          handleStartOver={handleStartOver}
          index={currentIndex}
          ref={resumeBottomSheetRef}
        />
      )}
      <PaymentBottomSheet ref={paymentBottomSheetRef} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#121212",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(95),
  },
  headerInnerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
  },
  backButton: {},
  backButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    fontFamily: "SyneFont",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    fontFamily: "SyneFont",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "SyneFont",
  },
  loader: {
    marginVertical: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  flatlistContainer: {
    position: "relative",
  },
  indexTextContainer: {
    position: "absolute",
    zIndex: 1,
    top: 70,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black with 50% opacity
    borderRadius: 10, // Border radius for rounded corners
    paddingHorizontal: 6, // Padding inside the container
    paddingVertical: 2,
  },
  indexText: {
    color: "white",
    fontSize: 14, // Optional: Adjust text size if needed
    fontFamily: "SyneFont",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  dot: {
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 4,
  },
  newGenerationTag: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#717171",
    borderRadius: 4,
    padding: 8,
  },
  newGenerationTagText: {
    color: "white",
    fontFamily: "SyneFont",
    fontSize: 16,
  },
});
