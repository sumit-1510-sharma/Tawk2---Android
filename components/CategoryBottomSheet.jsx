import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import CategoryCard from "./CategoryCard";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

// const PackBottomSheet = forwardRef((props, ref) =>
const CategoryBottomSheet = forwardRef(({ category }, ref) => {
  // Define groups of categories and their corresponding cards
  const categoryGroups = {
    group1: [
      "deep_dark_secrets",
      "drama_club",
      "forbidden_confessions",
      "mystery_moments",
      "the_unfiltered_truth",
    ],
    group2: [
      "fantasies_and_desires",
      "the_love_files",
      "forever_questions",
      "through_thick_and_thin",
      "untold_memories",
    ],
    group3: [
      "the_meaning_of_life",
      "future_fantasies",
      "courage_and_fears",
      "the_bucket_list",
      "if_you_knew_me",
    ],
  };

  const cards1 = [
    {
      slug: "deep_dark_secrets",
      title: "Deep Dark Secrets",
      description: "Uncover hidden truths",
    },
    {
      slug: "drama_club",
      title: "Drama Club",
      description: "Reveal dramatic moments",
    },
    {
      slug: "forbidden_confessions",
      title: "Forbidden Confessions",
      description: "Expose untold stories",
    },
    {
      slug: "mystery_moments",
      title: "Mystery Moments",
      description: "Share enigmatic memories",
    },
    {
      slug: "the_unfiltered_truth",
      title: "The Unfiltered Truth",
      description: "Reveal raw, unfiltered truths",
    },
  ];

  const cards2 = [
    {
      slug: "fantasies_and_desires",
      title: "Fantasies & Desires",
      description: "Dream about life’s desires",
    },
    {
      slug: "the_love_files",
      title: "The Love Files",
      description: "Explore love stories",
    },
    {
      slug: "forever_questions",
      title: "Forever Questions",
      description: "Unanswered questions",
    },
    {
      slug: "through_thick_and_thin",
      title: "Through Thick and Thin",
      description: "Celebrate partnerships",
    },
    {
      slug: "untold_memories",
      title: "Untold Memories",
      description: "Revisit hidden memories",
    },
  ];

  const cards3 = [
    {
      slug: "the_meaning_of_life",
      title: "The Meaning of Life",
      description: "Ponder life’s purpose",
    },
    {
      slug: "future_fantasies",
      title: "Future Fantasies",
      description: "Dream big, plan together",
    },
    {
      slug: "courage_and_fears",
      title: "Courage & Fears",
      description: "Reveal fears and brave moments",
    },
    {
      slug: "the_bucket_list",
      title: "The Bucket List",
      description: "Reveal ultimate life goals",
    },
    {
      slug: "if_you_knew_me",
      title: "If You Knew Me…",
      description: "What you don’t know yet",
    },
  ];

  let cards = [];
  if (categoryGroups.group1.includes(category)) {
    cards = cards1;
  } else if (categoryGroups.group2.includes(category)) {
    cards = cards2;
  } else if (categoryGroups.group3.includes(category)) {
    cards = cards3;
  }

  const snapPoints = useMemo(() => ["50%", "80%"]);

  const handlePresentModalPress = useCallback(() => {
    ref.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={ref} // Pass the forwarded ref here
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      index={-1}
    >
      <BottomSheetView style={styles.container}>
        <BottomSheetScrollView contentContainerStyle={styles.cardContainer}>
          {cards.map((card, index) => (
            <CategoryCard
              key={index}
              slug={card.slug}
              title={card.title}
              description={card.description}
              style={styles.card}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default CategoryBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
    backgroundColor: "#1E1E1E",
  },
});
