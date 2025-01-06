import React, { forwardRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const PaymentBottomSheet = forwardRef((props, ref) => {
  return (
    <BottomSheet
      ref={ref}
      snapPoints={["100%"]}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetView style={styles.container}>
        {/* Header Image */}
        <BottomSheetView style={styles.headerContainer}>
          <BottomSheetView style={styles.phoneContainer}>
            <BottomSheetView style={styles.phone}>
              <Text style={styles.heartIcon}>❤️</Text>
            </BottomSheetView>
            <BottomSheetView style={[styles.phone, styles.phoneRight]}>
              <Text style={styles.heartIcon}>❤️</Text>
            </BottomSheetView>
          </BottomSheetView>
          <BottomSheetView style={styles.lineConnector} />
        </BottomSheetView>

        {/* Features */}
        <BottomSheetView style={styles.featuresContainer}>
          <Text style={styles.featureText}>✔ Unlock all packs</Text>
          <Text style={styles.featureText}>✔ Unlimited questions</Text>
          <Text style={styles.featureText}>✔ Regularly updated</Text>
          <Text style={styles.featureText}>✔ No Ads</Text>
        </BottomSheetView>

        {/* Pricing Options */}
        <BottomSheetView style={styles.pricingContainer}>
          <TouchableOpacity style={styles.optionDisabled}>
            <Text style={styles.optionTextDisabled}>Weekly : 699 INR/week</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionActive}>
            <Text style={styles.optionTextActive}>Annual : 6999 INR/year</Text>
            <BottomSheetView style={styles.introBadge}>
              <Text style={styles.introBadgeText}>Intro Offer</Text>
            </BottomSheetView>
          </TouchableOpacity>
        </BottomSheetView>

        {/* Money Back Guarantee */}
        <Text style={styles.moneyBackText}>14 Day Money-Back Guarantee</Text>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Footer */}
        <BottomSheetView style={styles.footer}>
          <Text style={styles.footerText}>Auto Renews. Cancel anytime.</Text>
          <BottomSheetView style={styles.footerLinks}>
            <Text style={styles.footerLink}>Restore Purchase</Text>
            <Text style={styles.footerLink}>Privacy Policy</Text>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  phoneContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  phone: {
    width: 60,
    height: 120,
    backgroundColor: "#FEB9E1",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneRight: {
    marginLeft: 16,
  },
  heartIcon: {
    fontSize: 24,
    color: "#fff",
  },
  lineConnector: {
    width: 100,
    height: 2,
    backgroundColor: "#F96E46",
    position: "absolute",
    top: 60,
  },
  featuresContainer: {
    marginBottom: 24,
    alignItems: "flex-start",
  },
  featureText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  pricingContainer: {
    width: "100%",
    marginBottom: 16,
  },
  optionDisabled: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionTextDisabled: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
  },
  optionActive: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FEB9E1",
    position: "relative",
  },
  optionTextActive: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  introBadge: {
    position: "absolute",
    top: -12,
    right: 12,
    backgroundColor: "#FEB9E1",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  introBadgeText: {
    fontSize: 12,
  },
  moneyBackText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 16,
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#FEB9E1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#FEB9E1",
    fontSize: 12,
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerLink: {
    color: "#FEB9E1",
    fontSize: 12,
    marginHorizontal: 8,
  },
});

export default PaymentBottomSheet;
