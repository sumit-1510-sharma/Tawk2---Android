import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as InAppPurchases from "expo-iap";
import { SubscriptionContext } from "../context/SubscriptionContext";
import { useRouter } from "expo-router";

const PaymentBottomSheet = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const { updateSubscriptionStatus } = useContext(SubscriptionContext);
  const router = useRouter();

  const privacyPolicyURL =
    "https://blankcanvasdesignco.github.io/Tawk2/privacy-policy.html";
  const termsOfServiceURL =
    "https://blankcanvasdesignco.github.io/Tawk2/terms-of-service.html";

  const purchaseSubscription = async () => {
    try {
      // Step 1: Initialize the IAP connection
      const connectionResult = await InAppPurchases.initConnection();
      if (!connectionResult) {
        throw new Error("Failed to initialize IAP connection.");
      }
      console.log("IAP connection initialized.");

      // Step 2: Get subscriptions
      const skus = ["tawk2.premium.weekly"];
      const subscriptions = await InAppPurchases.getSubscriptions(skus);

      console.log(subscriptions);
      console.log(subscriptions[0]?.subscriptionOfferDetails[0]);
      // console.log(subscriptions[0]?.subscriptionOfferDetails[0]?.pricingPhases);

      if (!subscriptions || subscriptions.length === 0) {
        throw new Error("No subscriptions found for the given SKUs.");
      }

      // Step 3: Request the subscription
      const purchase = await InAppPurchases.requestSubscription({
        skus: [subscriptions[0]?.productId],
        subscriptionOffers: [
          {
            sku: subscriptions[0]?.productId,
            offerToken:
              subscriptions[0]?.subscriptionOfferDetails[0]?.offerToken,
          },
        ],
      });

      if (purchase) {
        console.log("Subscription successful:", purchase);
        updateSubscriptionStatus(true); // Update subscription status
      }
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      try {
        await InAppPurchases.endConnection();
      } catch (endConnectionError) {
        console.error("Error ending IAP connection:", endConnectionError);
      }
    }
  };

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
          <Text style={styles.pricingHeader}>Subscription Details:</Text>
          <Text style={styles.pricingText}>
            • Weekly plan: ₹10/week (auto-renews)
          </Text>
          <Text style={styles.pricingText}>
            • 3-day free trial, then ₹10/week
          </Text>
          <Text style={styles.pricingText}>
            • Cancel anytime through Google Play
          </Text>
        </BottomSheetView>

        {/* Money Back Guarantee */}
        {/* <Text style={styles.moneyBackText}>14 Day Money-Back Guarantee</Text> */}

        {/* Continue Button */}
        <TouchableOpacity
          onPress={() => purchaseSubscription()}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Footer */}
        <BottomSheetView style={styles.footer}>
          <Text style={styles.footerText}>Auto Renews. Cancel anytime.</Text>
          <BottomSheetView style={styles.footerLinks}>
            <Text style={styles.footerLink}>Restore Purchase</Text>
            <Pressable onPress={() => router.push(privacyPolicyURL)}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Pressable>
            <Pressable onPress={() => router.push(termsOfServiceURL)}>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </Pressable>
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
  pricingHeader: {
    color: "white",
  },
  pricingText: {
    color: "white",
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
