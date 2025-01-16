import React, { useMemo, forwardRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Forward ref to allow parent components to control the BottomSheet
const PackBottomSheet = forwardRef(({ handleOpenPaymentBottomSheet }, ref) => {
  // Snap points for the BottomSheet
  const snapPoints = useMemo(() => ["50%"], []);

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
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Heart Icon Section */}
        <BottomSheetView style={styles.iconContainer}>
          <Image
            source={require("../assets/images/welcome.png")} // Replace with your hearts image
            style={styles.icon}
          />
        </BottomSheetView>

        {/* Text Section */}
        <Text style={styles.title}>Get closer to your close ones.</Text>
        <Text style={styles.subtitle}>Unlock all packs now.</Text>

        {/* Button Section */}
        <TouchableOpacity
          onPress={handleOpenPaymentBottomSheet}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Footer Section */}
        <Text style={styles.footerText}>
          You’ve reached the free content limit.
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default PackBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: "#000", // BottomSheet background color
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FF69B4",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
});
