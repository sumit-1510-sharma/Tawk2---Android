import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import PackBottomSheet from "../components/PackBottomSheet";
import CategoryBottomSheet from "../components/CategoryBottomSheet";
import ResumeBottomSheet from "../components/ResumeBottomSheet";
import PaymentBottomSheet from "../components/PaymentBottomSheet";

export default function Bottomsheet() {
  // ref
  const bottomSheetRef = useRef();
  const categoryBottomSheetRef = useRef();
  const resumeBottomSheetRef = useRef();
  const paymentBottomSheetRef = useRef();

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current.close();
  const handleOpenPress = () => bottomSheetRef.current.expand();

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <PackBottomSheet ref={bottomSheetRef} /> */}
      {/* <CategoryBottomSheet category={"Deep Dark Secrets"} ref={categoryBottomSheetRef} /> */}
      {/* <ResumeBottomSheet
        category={"Deep Dark Secrets"}
        ref={resumeBottomSheetRef}
      /> */}
      <PaymentBottomSheet ref={paymentBottomSheetRef} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BCFFDD",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
