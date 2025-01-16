import React, { forwardRef, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const ResumeBottomSheet = forwardRef(
  ({ category, handleStartOver, index }, ref) => {
    // Calculate progress based on index
    const progressWidth = `${(index / 30) * 100}%`; // Convert index to a percentage

    // Handle Resume button
    const handleResume = useCallback(() => {
      ref.current?.close();
    }, []);

    return (
      <BottomSheet
        ref={ref}
        snapPoints={["35%"]}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView style={styles.container}>
          <View style={styles.divider} />
          <Text style={styles.title}>Resume or start over?</Text>
          <BottomSheetView style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.resumeButton]}
              onPress={handleResume}
            >
              <Text style={styles.resumeButtonText}>Resume</Text>
            </TouchableOpacity>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: progressWidth }]} />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.startOverButton]}
              onPress={handleStartOver}
            >
              <Text style={styles.startOverButtonText}>Start over</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#1C1C1E",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
  },
  divider: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#444",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  resumeButton: {
    backgroundColor: "#fff",
  },
  resumeButtonText: {
    color: "#1C1C1E",
    fontSize: 16,
    fontWeight: "600",
  },
  startOverButton: {
    backgroundColor: "#444",
  },
  startOverButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#2C2C2E",
    borderRadius: 2,
    marginBottom: 16,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#F96E46",
    borderRadius: 2,
  },
});

export default ResumeBottomSheet;
