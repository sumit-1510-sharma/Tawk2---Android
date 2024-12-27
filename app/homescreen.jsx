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
import { useRouter } from "expo-router";

const Homescreen = () => {
  const [activeTab, setActiveTab] = useState("Fun");
  const flatListRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const setupDatabase = async () => {
      const isInitialized = await AsyncStorage.getItem("prod_db_init");

      // If database has not been initialized, proceed with table creation and inserting hardcoded questions
      if (!isInitialized) {
        await createTable();
        await createFavouritesTable();
        await insertHardcodedQuestions();
        await AsyncStorage.setItem("prod_db_init", "true"); // Mark as initialized
      } else {
        console.log("Database already initialized.");
      }
    };

    setupDatabase();
  }, []); // Empty dependency array ensures this runs once when the app is loaded

  const createTable = async () => {
    console.log("Initializing DB...");
    try {
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");

      // Creating table if it doesn't exist
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS questionsTable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            question TEXT NOT NULL,
            type TEXT NOT NULL,
            created_at TEXT NOT NULL
          );`
      );

      console.log("Table created successfully!");
    } catch (e) {
      console.log("Error creating table:", e);
    }
  };

  const createFavouritesTable = async () => {
    console.log("Initializing favourites table...");
    try {
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS favouritesTable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            question TEXT NOT NULL,
            created_at TEXT NOT NULL
          );`
      );

      console.log("Favourites table created successfully!");
    } catch (e) {
      console.log("Error creating table:", e);
    }
  };

  const insertHardcodedQuestions = async () => {
    console.log("Inserting hardcoded questions...");
    const hardcodedQuestions = [
      {
        category: "Deep Dark Secrets",
        questions: [
          "What’s your most embarrassing secret crush?",
          "Ever told a lie that got way too big?",
          "What’s the naughtiest thing you’ve ever done?",
          "Have you ever sneaked into someone’s room?",
          "What’s a secret talent you’re hiding?",
          "What’s the wildest place you've ever hooked up?",
          "Do you have any guilty pleasure songs?",
          "What’s your biggest secret about love?",
          "Which secret turns you on the most?",
          "Ever had a crush on a teacher?",
          "What’s a fantasy you’ve never shared?",
          "What’s your biggest secret obsession?",
          "What’s the strangest thing you've done alone?",
          "Ever sent a flirty text to the wrong person?",
          "What’s a secret fear you keep hidden?",
          "What’s a secret recipe you never share?",
          "Have you ever done something crazy for love?",
          "What’s your biggest guilty pleasure movie?",
          "What’s the wildest dare you’ve ever accepted?",
          "Do you ever have dreams that embarrass you?",
          "What’s a secret you’d love to confess?",
          "How do you feel about secret hookups?",
          "What’s your biggest unsent text about someone?",
          "What have you stolen and never returned?",
          "What’s a questionable decision you still think about?",
          "Ever had a crush on a friend’s partner?",
          "What’s your secret vice you can't resist?",
          "What’s the biggest lie you ever told?",
          "Ever created a fake account online?",
          "Have you ever ghosted someone you dated?",
        ],
      },
      {
        category: "Drama Club",
        questions: [
          "What’s the craziest thing you’ve ever done?",
          "Tell me your wildest party story!",
          "Share a funny rumor you’ve heard about yourself.",
          "What’s your funniest bathroom fail story?",
          "Describe your most embarrassing crush moment.",
          "What’s the most dramatic moment in your life?",
          "Have you ever had a crush on a teacher?",
          "Share an awkward date story you’ve had.",
          "What’s the most spontaneous thing you've ever done?",
          "What's your most embarrassing childhood memory?",
          "What’s your favorite secret about us?",
          "Ever had a wardrobe malfunction in public?",
          "What’s our dirtiest secret that we can share?",
          "What’s the most daring thing you’ve ever done?",
          "Tell me a time you laughed until you cried.",
          "What's the craziest place you've ever been intimate?",
          "Have you ever had a fling with a friend?",
          "What’s the most ridiculous thing you've cried about?",
          "Do you remember any funny childhood pranks?",
          "What’s the craziest wager you've ever made?",
          "Where's the weirdest place you've ever kissed someone?",
          "Tell me about a hilarious misunderstanding you've had.",
          "What’s your favorite naughty memory of us?",
          "What’s the wildest fantasy you’ve kept secret?",
          "Have you ever sent a cringy text by mistake?",
          "What’s your favorite way to make me laugh?",
          "What’s the funniest thing you've ever overheard?",
          "What outlandish outfit did you once wear?",
          "What’s your most embarrassing bedroom story?",
          "What’s a romantic scene you long to recreate?",
        ],
      },
      {
        category: "Forbidden Confessions",
        questions: [
          "What's a secret fantasy you've never shared?",
          "Have you ever had a crush on my friend?",
          "What's the naughtiest thing you've done in public?",
          "Do you have a secret indulgence you love?",
          "What's your most embarrassing bedroom moment?",
          "Have you ever sent a naughty message accidentally?",
          "What's a forbidden desire you wish to explore?",
          "Where's the wildest place you've ever been intimate?",
          "Have you ever cheated on a partner before?",
          "What's your biggest turn-on that you hide?",
          "Tell me about a crush you had recently.",
          "What's the sexiest dream you've ever had?",
          "Do you ever fantasize about someone else?",
          "What's a secret you kept from your last partner?",
          "Have you ever lied about a hookup?",
          "What's the riskiest thing you've done for love?",
          "If you could have one wild night, where?",
          "Have you ever played the field without commitment?",
          "What's your guilty pleasure when you're alone?",
          "What’s the most scandalous outfit you've worn?",
          "Do you have a secret talent no one knows?",
          "What’s the most daring thing you’d want to try?",
          "Have you ever had a fling without telling anyone?",
          "What's a secret you would never ever reveal?",
          "What’s your favorite spot for sneaky makeouts?",
          "Would you ever do something crazy for love?",
          "Have you ever had a fling with a co-worker?",
          "What’s the craziest thing you’ve done on a dare?",
          "What secret hobby would surprise me?",
          "What’s the most romantic thing you’d like to do?",
        ],
      },
      {
        category: "Mystery Moments",
        questions: [
          "What's the funniest secret you’ve hidden from me?",
          "Which childhood story still makes you laugh?",
          "What’s your most mysterious memory from school?",
          "Have you ever pretended to be someone else?",
          "What’s the strangest coincidence you ever experienced?",
          "What’s the craziest thing you did as a kid?",
          "Is there a secret you still haven’t shared?",
          "What's your favorite 'I can't believe that happened' story?",
          "Have you ever been part of a prank?",
          "What was your most embarrassing moment as a child?",
          "What's the most spontaneous thing you've ever done?",
          "What’s a mystery from your family’s past?",
          "What’s the wildest rumor you’ve heard about you?",
          "Can you think of a funny coincidence we shared?",
          "What was the most adventurous trip you’ve taken?",
          "What's a mischievous secret you’d reveal today?",
          "Which movie plot twists blew your mind?",
          "What’s your most memorable late-night story?",
          "Do you have a hidden talent no one knows?",
          "What’s the weirdest thing you believed as a child?",
          "Have you ever made up a story for fun?",
          "What's a moment that changed your perspective completely?",
          "Do you have a childhood crush no one knows about?",
          "What’s the biggest misunderstanding you’ve ever had?",
          "What’s your most forgotten but hilarious memory?",
          "Have you ever witnessed something unexplained?",
          "What's a family secret that made you laugh?",
          "What’s a buried treasure you’d like to find?",
          "What mystery would you love to solve together?",
          "If you could unearth one secret, what would it be?",
        ],
      },
      {
        category: "The Unfiltered Truth",
        questions: [
          "What’s a secret you’ve never shared?",
          "When was the last time you lied?",
          "What’s your biggest fear in relationships?",
          "Have you ever cheated or been tempted to?",
          "What’s the most embarrassing thing you’ve done?",
          "What’s a bad habit you can’t break?",
          "What do you secretly judge people for?",
          "How do you truly feel about your job?",
          "What’s something you regret not doing?",
          "Have you ever wished we weren’t together?",
          "What’s a dark thought you’ve had recently?",
          "What’s the last thing that upset you?",
          "Have you ever stolen something, even small?",
          "What’s your guilty pleasure you hide?",
          "What do you think is your worst quality?",
          "What’s a misconception people have about you?",
          "How many people have you truly loved?",
          "What’s your biggest insecurity right now?",
          "What’s a lie you’ve told to protect someone?",
          "What do you dislike about yourself most?",
          "Have you ever felt truly alone, even in company?",
          "When was the last time you cried, why?",
          "What’s the most painful experience you’ve endured?",
          "What part of your life feels unfinished?",
          "What’s something you’ve wanted to say but haven’t?",
          "How do you cope with overwhelming emotions?",
          "What’s a boundary you should enforce more?",
          "What’s one thing you fear losing the most?",
          "What’s a dream you’ve given up on?",
          "What’s one toxic trait you wish to change?",
        ],
      },
      {
        category: "Fantasies & Desires",
        questions: [
          "What’s a fantasy you’ve never shared with me?",
          "Describe your ultimate romantic getaway together.",
          "What’s the wildest place you’d like to kiss?",
          "Do you have a specific intimate fantasy in mind?",
          "What makes you feel most desired by me?",
          "If we could roleplay, who would we be?",
          "Share a secret desire that excites you.",
          "What’s your favorite way we connect intimately?",
          "If you could try any new thing together, what?",
          "What kind of music would set the mood for us?",
          "What is your favorite fantasy you’ve acted out?",
          "How do you envision our perfect date night?",
          "What’s a daring fantasy you’d love to explore?",
          "Do you have a favorite type of foreplay?",
          "What surprise would make you feel extra desired?",
          "If you could choose anywhere to kiss me, where?",
          "What makes you feel adventurous in our relationship?",
          "Describe a playful intimate moment you cherish.",
          "What’s your guilty pleasure in romance?",
          "Which fictional couple inspires your desires?",
          "What’s something intimate you’ve always wanted to try?",
          "Do you have a secret passion for role-playing?",
          "What’s a fantasy date you dream about us having?",
          "What’s a steamy scenario you’d love to plan?",
          "What’s the most daring thing you’ve ever done?",
          "If we could escape anywhere, where would it be?",
          "What’s a spontaneous idea for a fun evening?",
          "How would you describe your ideal romantic surprise?",
          "What is one thing that always turns you on?",
          "If you could spice up our routine, what would it be?",
        ],
      },
      {
        category: "The Love Files",
        questions: [
          "What’s your favorite memory of us together?",
          "How did you know you loved me?",
          "What do you love most about our relationship?",
          "When did you first realize we were in love?",
          "What’s a romantic place you want to visit?",
          "How do you feel when I hold your hand?",
          "What song reminds you of our love?",
          "What little things make you feel loved?",
          "What’s your idea of a perfect date night?",
          "How do you show love in your own way?",
          "What’s your favorite ‘us’ moment to relive?",
          "What’s the best gift you’ve ever received from me?",
          "How has our love changed you for the better?",
          "What does love mean to you now?",
          "What do you admire most about my personality?",
          "What’s one thing you want us to do together?",
          "What’s your favorite way to spend time together?",
          "What’s the most romantic thing we've done together?",
          "How do you feel after we argue?",
          "How do you see our future together?",
          "What keeps our love alive and exciting?",
          "What would be your dream vacation with me?",
          "What’s a secret you cherish about our relationship?",
          "What silly moment made you fall for me?",
          "How do you feel about public displays of affection?",
          "What’s one thing you want to learn together?",
          "How do you know when I need affection?",
          "What’s a goal you have for our life together?",
          "What do you want to always remember about us?",
          "What’s something special you love that only I do?",
        ],
      },
      {
        category: "Forever Questions",
        questions: [
          "What does unconditional love mean to you?",
          "How do you envision our life in 20 years?",
          "What moments made you feel deeply loved?",
          "What are your hopes for our future together?",
          "How do you define true partnership for us?",
          "What sacrifices are you willing to make for love?",
          "What is your biggest fear about our relationship?",
          "What values do you cherish the most in love?",
          "How can we grow together as a couple?",
          "What’s your favorite memory of us so far?",
          "What inspires you to be a better partner?",
          "How do you feel loved when times are tough?",
          "What does commitment mean to you personally?",
          "What promises do you want us to keep?",
          "How do you want to celebrate our love?",
          "In what ways do we complement each other?",
          "What role does trust play in our relationship?",
          "What boundaries do you feel are important for us?",
          "What’s a dream we should pursue together?",
          "How do you want to resolve conflicts together?",
          "What makes our love unique and special?",
          "How can we support each other's dreams?",
          "What does intimacy look like for us?",
          "What fears have challenged our connection before?",
          "How do you want us to grow old together?",
          "What impact do you hope we have on others?",
          "What are the little things that make you smile?",
          "How can we keep our romance alive?",
          "What makes you feel secure in our relationship?",
          "What do you appreciate most about me today?",
        ],
      },
      {
        category: "Through Thick and Thin",
        questions: [
          "What does unconditional love mean to you?",
          "How do you envision our life in 20 years?",
          "What moments made you feel deeply loved?",
          "What are your hopes for our future together?",
          "How do you define true partnership for us?",
          "What sacrifices are you willing to make for love?",
          "What is your biggest fear about our relationship?",
          "What values do you cherish the most in love?",
          "How can we grow together as a couple?",
          "What’s your favorite memory of us so far?",
          "What inspires you to be a better partner?",
          "How do you feel loved when times are tough?",
          "What does commitment mean to you personally?",
          "What promises do you want us to keep?",
          "How do you want to celebrate our love?",
          "In what ways do we complement each other?",
          "What role does trust play in our relationship?",
          "What boundaries do you feel are important for us?",
          "What’s a dream we should pursue together?",
          "How do you want to resolve conflicts together?",
          "What makes our love unique and special?",
          "How can we support each other's dreams?",
          "What does intimacy look like for us?",
          "What fears have challenged our connection before?",
          "How do you want us to grow old together?",
          "What impact do you hope we have on others?",
          "What are the little things that make you smile?",
          "How can we keep our romance alive?",
          "What makes you feel secure in our relationship?",
          "What do you appreciate most about me today?",
        ],
      },
      {
        category: "Untold Memories",
        questions: [
          "What’s a childhood secret you’ve never told anyone?",
          "Describe a moment that changed your life forever.",
          "What was your biggest fear as a child?",
          "Recall a time you felt truly alive.",
          "What’s your most treasured memory from school?",
          "Share a time you broke a rule.",
          "What’s a dream you had that scared you?",
          "What’s the most embarrassing moment in your life?",
          "Tell me about a childhood friend you miss.",
          "What’s a story from your family you love?",
          "What’s an adventure you never spoke about?",
          "Describe your first crush and what happened.",
          "What’s a mistake you learned a lot from?",
          "Recall a time you felt completely vulnerable.",
          "What’s a secret talent you’ve never shown anyone?",
          "Was there a moment you surprised yourself?",
          "What’s the most spontaneous thing you’ve done?",
          "Tell me about a risky choice you made.",
          "What’s a trend you loved as a kid?",
          "Share a memory that always makes you smile.",
          "What was your favorite secret hiding spot?",
          "What’s your biggest regret from your past?",
          "Describe a family tradition that means a lot.",
          "What’s a lesson from your past you cherish?",
          "Share a funny misunderstanding you experienced.",
          "What’s an event that shaped your beliefs?",
          "What’s a time you overcame a big challenge?",
          "Describe a comfort food memory from childhood.",
          "What’s the best gift you ever received?",
          "Share a moment you felt proud of yourself.",
        ],
      },
      {
        category: "The Meaning of Life",
        questions: [
          "What is your personal definition of happiness?",
          "Do you believe in fate or free will?",
          "What brings you the most joy in life?",
          "How do you define success in your life?",
          "What role does love play in your life?",
          "Do you think life has an inherent meaning?",
          "What legacy do you wish to leave behind?",
          "How does fear influence your life choices?",
          "What lessons have you learned from suffering?",
          "How do you find purpose in your daily routine?",
          "What beliefs shape your understanding of existence?",
          "How do you view death and its significance?",
          "What experiences have shaped your worldview most?",
          "Do you think we create our own meaning?",
          "How do relationships enhance your life’s purpose?",
          "What do you think happens after we die?",
          "How can we discover our true selves?",
          "What inspires you to keep going in life?",
          "How important is self-reflection for personal growth?",
          "When do you feel most connected to others?",
          "What is the biggest question about life you ponder?",
          "How do dreams and ambitions shape your journey?",
          "In what ways do you seek spiritual fulfillment?",
          "Can happiness exist without purpose or meaning?",
          "What values do you prioritize in your life?",
          "How does art influence your understanding of life?",
          "What does it mean to live authentically?",
          "How do you cope with uncertainty in life?",
          "What brings you peace in a chaotic world?",
          "How does nature affect your view on life?",
        ],
      },
      {
        category: "Future Fantasies",
        questions: [
          "What’s our dream travel destination together?",
          "How do you see us in ten years?",
          "What adventure do you wish to embark on?",
          "What’s one goal we should pursue together?",
          "What’s your vision for our ideal home?",
          "How would you like to celebrate our future milestones?",
          "What skills do you want to learn together?",
          "Which future technology excites you the most?",
          "Where do you want to retire someday?",
          "What changes do you hope to see in the world?",
          "What legacy do you want to create together?",
          "Imagine our perfect weekend in the future, describe it.",
          "What hobbies do you envision us enjoying together?",
          "What’s your dream job you’d like to pursue?",
          "How do you envision our family dynamics?",
          "What is one future luxury you hope to enjoy?",
          "What adventure would you love to try together?",
          "How do you want to grow as a couple?",
          "What’s a dream festival you want to attend?",
          "What mythical creature would you like to encounter?",
          "What change in lifestyle would you like to embrace?",
          "What future memories do you hope we share?",
          "What inspires you about our future together?",
          "How do you picture our retirement years?",
          "What role do you want to play in our community?",
          "What future invention do you wish existed now?",
          "What kind of pets do you want in the future?",
          "What funny scenario do you hope we experience?",
          "How do you imagine spending our anniversary?",
          "What unique tradition would you like to start together?",
        ],
      },
      {
        category: "Courage & Fears",
        questions: [
          "What fear have you recently overcome?",
          "Describe a courageous moment in your life.",
          "How do you feel about trying new things?",
          "What scares you the most about failure?",
          "Have you ever faced a fear publicly?",
          "What's a risky choice you’ve made before?",
          "How do you motivate yourself to be brave?",
          "What person inspires your courage the most?",
          "What’s a fear you would like to conquer?",
          "Have you ever regretted not facing a fear?",
          "What role does fear play in your decisions?",
          "How do you feel about vulnerability?",
          "When do you feel most courageous?",
          "What would you do if you weren’t afraid?",
          "Has fear ever stopped you from trying something?",
          "How do you support others in facing fears?",
          "What's your bravest memory from childhood?",
          "What’s a fear you’ve always had?",
          "Describe a time you surprised yourself with courage.",
          "How do you celebrate small acts of bravery?",
          "Do you believe courage can be learned?",
          "What advice would you give someone fearful?",
          "Which situation makes you feel anxious or fearful?",
          "How does fear change your perspective on life?",
          "What does courage look like to you?",
          "What fear would you cherish to conquer?",
          "How do you cope with fear during challenges?",
          "What’s your perspective on anxiety and courage?",
          "What is your biggest source of inner strength?",
          "How can your partner help with your fears?",
        ],
      },
      {
        category: "The Bucket List",
        questions: [
          "What's one country you must visit someday?",
          "If you could live anywhere, where would it be?",
          "What adventure would you take with no limits?",
          "Which skill do you want to master one day?",
          "What's a unique food you want to try?",
          "Name a festival you dream of attending someday.",
          "If you could own any animal, which would it be?",
          "What's a dream job you'd love to have?",
          "Where would you take a month-long vacation?",
          "What kind of art would you love to create?",
          "If you could meet any celebrity, who would it be?",
          "What's an extreme sport you'd like to try?",
          "Name a historical site you wish to explore.",
          "What's on your must-read book list?",
          "If you could build your dream home, what features?",
          "What's a special event you want to host?",
          "Which personal challenge do you want to conquer?",
          "What's your dream car or vehicle to own?",
          "If you could learn any language, which one?",
          "What's your fantasy vacation destination right now?",
          "What charitable cause do you want to support?",
          "If you could travel back in time, where to?",
          "What's a talent you'd love to share with others?",
          "Which movie would you want to live in?",
          "What's the most daring thing you'd want to try?",
          "If you could go on a road trip, where to?",
          "What's the best concert you want to attend?",
          "Which iconic landmark do you want to visit?",
          "What's a meaningful experience you wish to have?",
          "If you could write a book, what genre?",
        ],
      },
      {
        category: "If You Knew Me…",
        questions: [
          "What's your biggest turn-on during intimacy?",
          "Ever had a wild fantasy you wish fulfilled?",
          "Describe your ideal romantic getaway together.",
          "What's your secret guilty pleasure movie?",
          "What do you wish more people knew about you?",
          "What's your favorite way to be seduced?",
          "Which song makes you feel most alive?",
          "What’s a daring thing you’ve always wanted to try?",
          "What’s the most embarrassing thing you’ve done?",
          "If we could only eat one food forever, what?",
          "What do you want to achieve in the next year?",
          "How do you handle stress when it hits hard?",
          "What’s your favorite childhood memory that still matters?",
          "What unexpected talent do you wish others knew?",
          "Where's your dream travel destination, and why?",
          "Ever had a crush on a fictional character?",
          "If you could change one thing about yourself, what?",
          "How do you feel about public displays of affection?",
          "What’s a risk you took that paid off?",
          "What do you admire the most about me?",
          "If we could switch lives for a day, what?",
          "What’s your go-to activity when you're feeling low?",
          "What’s a misconception people often have about you?",
          "What would you do if you had a week off?",
          "What's the craziest thing you’ve done for love?",
          "If you could relive one memory, which one?",
          "What's a secret you've never told anyone?",
          "How do you feel about love at first sight?",
          "What’s your favorite way to spend a lazy day?",
          "What’s one thing you find irresistibly charming?",
        ],
      },
    ];

    try {
      const db = await SQLite.openDatabaseAsync("ProductionDatabase");
      const insertQuery = `INSERT INTO questionsTable (category, question, type, created_at) VALUES (?, ?, ?, ?);`;
      for (const { category, questions } of hardcodedQuestions) {
        for (const question of questions) {
          await db.runAsync(insertQuery, [
            category,
            question,
            "current", // This can be adjusted to fit your data structure
            new Date().toISOString(),
          ]);
          console.log(`Inserted question: ${question}`);
        }
      }
    } catch (e) {
      console.log("Error inserting hardcoded questions:", e);
    }
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
        <Text style={styles.packText}>Select a pack</Text>
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          style={styles.profileIconBg}
        >
          <FontAwesome5 name="user" size={20} color="black" />
        </TouchableOpacity>
      </View>
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
            <CategorySection category={item.category} />
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
    </ScreenWrapper>
  );
};

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginVertical: 20,
    // marginHorizontal: wp(2.5),
    // fontWeight: "bold",
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

export default Homescreen;
