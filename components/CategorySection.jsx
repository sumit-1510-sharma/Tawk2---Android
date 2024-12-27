import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { useRouter } from "expo-router";
import { hp, wp } from "../helpers/common";

export default function CategorySection({ category }) {
  // Define card data for each category
  const categoryContent = {
    Fun: [
      {
        title: "Deep Dark Secrets",
        description: "Spill your juiciest secrets",
        slug: "deep_dark_secrets",
      },
      {
        title: "Drama Club",
        description: "Juicy stories and suspense",
        slug: "drama_club",
      },
      {
        title: "Forbidden Confessions",
        description: "Naughty thoughts and confessions",
        slug: "forbidden_confessions",
      },
      {
        title: "Mystery Moments",
        description: "Uncover the untold mysteries",
        slug: "mystery_moments",
      },
      {
        title: "The Unfiltered Truth",
        description: "Raw truths, no holding back",
        slug: "the_unfiltered_truth",
      },
    ],
    Connection: [
      {
        title: "Fantasies & Desires",
        description: "Dive into naughty dreams",
        slug: "fantasies_and_desires",
      },
      {
        title: "The Love Files",
        description: "Unlock romantic, steamy thoughts",
        slug: "the_love_files",
      },
      {
        title: "Forever Questions",
        description: "Soulmate-level questions await",
        slug: "forever_questions",
      },
      {
        title: "Through Thick and Thin",
        description: "Commitment and growth questions",
        slug: "through_thick_and_thin",
      },
      {
        title: "Untold Memories",
        description: "Connect through hidden stories",
        slug: "untold_memories",
      },
    ],
    Reflection: [
      {
        title: "The Meaning of Life",
        description: "Ponder life's purpose deeply",
        slug: "the_meaning_of_life",
      },
      {
        title: "Future Fantasies",
        description: "Dream big, plan together",
        slug: "future_fantasies",
      },
      {
        title: "Courage & Fears",
        description: "Reveal fears and brave moments",
        slug: "courage_and_fears",
      },
      {
        title: "The Bucket List",
        description: "Reveal ultimate life goals",
        slug: "the_bucket_list",
      },
      {
        title: "If You Knew Me...",
        description: "Uncover hidden sides together",
        slug: "if_you_knew_me",
      },
    ],
  };

  const router = useRouter();
  // Get the cards for the current category
  const cards = categoryContent[category] || [];

  return (
    <View style={styles.container}>
      {/* <View>
        <Button title="Profile Page" onPress={() => router.push("/profile")} />
      </View> */}

      <View>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {cards.map((card, index) => (
            <CategoryCard
              key={index}
              slug={card.slug}
              title={card.title}
              description={card.description}
              style={styles.card}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 0,
    width: wp(100),
    backgroundColor: "#121212",
  },
  cardContainer: {
    padding: 0,
  },
  card: {
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#121212",
  },
});
