import React, { useState, useEffect, useRef } from "react";
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

export default function CardScreen() {
  const { cardscreen } = useLocalSearchParams(); // Get the dynamic category from URL
  const [entries, setEntries] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryPrompt, setCategoryPrompt] = useState("");
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(10); // Track the current index
  const flatListRef = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false); // To manage loading state
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const bottomSheetRef = useRef();
  const categoryBottomSheetRef = useRef();
  const resumeBottomSheetRef = useRef();

  useEffect(() => {
    categoryTitleFunction(cardscreen);
  }, [cardscreen]);

  useEffect(() => {
    const initialize = async () => {
      if (categoryTitle) {
        await fetchCurrentQuestions(categoryTitle);
      }
    };

    initialize();
  }, [categoryTitle]);

  const getCurrentIndex = async () => {
    try {
      const key = `category_${categoryTitle}`; // Unique key for the category
      const storedIndex = await AsyncStorage.getItem(key);

      setCurrentIndex(storedIndex);
    } catch (e) {
      console.error("Error retrieving category index", e);
      return 0;
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
      console.log("Fetching questions for category:", category);

      // Open a new database connection
      db = await SQLite.openDatabaseAsync("ProductionDatabase");

      // Fetch the questions for the given category
      const rows = await db.getAllAsync(
        `SELECT * FROM questionsTable WHERE category = ? AND type = ?`,
        [category, "current"]
      );

      // Extract the questions from the result rows
      const extractedQuestions = rows.map((item) => item.question);

      // Append "Loading more questions..." to the list
      const questionsWithLoading = [
        ...extractedQuestions,
        "Loading more questions...", // Add the extra item
      ];

      setCurrentQuestions(questionsWithLoading);
      console.log(questionsWithLoading);
      console.log("Fetched and updated current questions successfully.");
    } catch (e) {
      console.error("Error fetching current questions:", e);
    } finally {
      // Ensure the database connection is closed after the operation
      if (db) {
        await db.closeAsync(); // Close the database connection
        console.log("Database connection closed.");
      }
    }
  };

  const moveToHistory = async (db, category) => {
    console.log(`Moving questions of category "${category}" to history`);
    try {
      await db.runAsync(
        `UPDATE questionsTable SET type = ? WHERE category = ? AND type = ?`,
        ["history", category, "current"]
      );
      console.log("Moved current questions to history");
    } catch (error) {
      console.error("Error moving questions to history:", error);
      throw error;
    }
  };

  const addNewQuestions = async (db, category, questions) => {
    console.log(`Adding new questions to category: "${category}"`);
    try {
      for (const question of questions) {
        await db.runAsync(
          `INSERT INTO questionsTable (category, question, type, created_at) VALUES (?, ?, ?, ?)`,
          [category, question, "current", new Date().toISOString()]
        );
      }
      console.log("New questions added successfully!");
    } catch (error) {
      console.error("Error adding new questions:", error);
      throw error;
    }
  };

  const handleGenerateQuestions = async (category, newQuestions) => {
    let db;
    try {
      db = await SQLite.openDatabaseAsync("ProductionDatabase"); // Open a single connection

      // Step 1: Move current questions to history
      await moveToHistory(db, category);

      // Step 2: Add new questions as current
      await addNewQuestions(db, category, newQuestions);

      console.log("Questions updated successfully!");
    } catch (error) {
      console.error("Error in handleGenerateQuestions:", error);
      throw error; // Ensure the caller knows if this fails
    } finally {
      if (db) {
        await db.closeAsync(); // Ensure the connection is closed
        console.log("Database connection closed.");
      }
    }
  };

  const fetchMoreCards = async () => {
    // setLoadingMore(true); // Show the loader
    try {
      console.log("Fetching more cards...");
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
      router.back();
    } catch (error) {
      console.error("Error fetching more cards:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = wp(100); // Width of each item (adjust to your card's width)
    const index = Math.floor(contentOffsetX / itemWidth);
    setCurrentIndex(index);
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

  // Function to go to the previous item
  const scrollToPrevious = () => {
    if (flatListRef.current && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const renderIndicator = () => {
    const dots = [];
    const totalDots = 5; // Number of visible dots
    const start = Math.max(currentIndex - 2, 0);
    const end = Math.min(start + totalDots, currentQuestions.length);

    for (let i = start; i < end; i++) {
      let size = 8;
      let opacity = 0.5;

      if (i === currentIndex) {
        size = 12;
        opacity = 1;
      } else if (Math.abs(i - currentIndex) === 1) {
        size = 10;
        opacity = 0.7;
      }

      dots.push(
        <View
          key={i}
          style={[styles.dot, { width: size, height: size, opacity }]}
        />
      );
    }

    return dots;
  };

  return (
    <GestureHandlerRootView>
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
              <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{categoryTitle}</Text>
            <TouchableOpacity
              // onPress={handleOpenCategoryBottomSheet}
              style={styles.shareButton}
            >
              <Ionicons name="share-outline" size={32} color="black" />
            </TouchableOpacity>
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
              onMomentumScrollEnd={handleScroll}
              initialScrollIndex={currentIndex}
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
                }); // Fallback
              }}
            />
          )}

          {/* // onScroll={handleScroll}
            // scrollEventThrottle={16}
            // initialScrollIndex={currentIndex}
            // getItemLayout={(data, index) => ({
            //   length: wp(100),
            //   offset: wp(100) * currentIndex,
            //   index,
            // })} */}

          {/* <View style={styles.indicatorContainer}>{renderIndicator()}</View> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={scrollToPrevious}
              style={[
                styles.button,
                currentIndex === 0 && styles.disabledButton,
              ]}
              disabled={currentIndex === 0}
            >
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
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
      {/* {currentIndex === 20 && <PackBottomSheet ref={bottomSheetRef} />}
      <CategoryBottomSheet category={cardscreen} ref={categoryBottomSheetRef} />
      <ResumeBottomSheet category={categoryTitle} ref={resumeBottomSheetRef} /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
  },
  header: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#121212",
    padding: 15,
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 5,
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    fontFamily: "SyneFont",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
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
    width: "80%",
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
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
    backgroundColor: "#ddd",
  },
  disabledButtonText: {
    color: "#aaa",
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
});
