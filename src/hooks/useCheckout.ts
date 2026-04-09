import { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useCartStore } from "@/src/store/useCartStore";

export type CheckoutStep =
  | "summary"
  | "checkout_setup"
  | "address_list"
  | "payment_list"
  | "add_card"
  | "edit_address"
  | "confirmation"
  | "success"
  | "order_summary";

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  number: string;
}

export const useCheckout = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, updateQuantity } = useCartStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("summary");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isOrdering, setIsOrdering] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  const [orderedTotal, setOrderedTotal] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedShipping, setSelectedShipping] = useState("pickup");
  const [isShippingModalVisible, setIsShippingModalVisible] = useState(false);

  const steps: CheckoutStep[] = [
    "summary",
    "checkout_setup",
    "address_list",
    "add_card",
    "edit_address",
    "confirmation",
    "success",
  ];

  const changeStep = (newStep: CheckoutStep) => {
    const currentIndex = steps.indexOf(currentStep);
    const nextIndex = steps.indexOf(newStep);
    setDirection(nextIndex > currentIndex ? "forward" : "backward");
    setCurrentStep(newStep);
  };

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      firstName: "Iris",
      lastName: "Watson",
      street: "606-3727 Ullamcorper. Street",
      city: "Roseville",
      state: "NH",
      zipCode: "11523",
      phone: "(786) 713-8616",
    },
    {
      id: "2",
      firstName: "James",
      lastName: "Smith",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(212) 555-0199",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", brand: "Master Card", number: "5124 **** **** 1234" },
    { id: "2", brand: "Visa", number: "4215 **** **** 5678" },
  ]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("1");

  const [card, setCard] = useState({
    name: "Iris Watson",
    number: "2353 3543 2365 3698",
    expiry: "03/25",
    cvv: "123",
  });

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const selectedPayment =
    paymentMethods.find((p) => p.id === selectedPaymentId) || paymentMethods[0];

  const [tempAddress, setTempAddress] = useState<Address>(selectedAddress);

  useEffect(() => {
    if (currentStep === "edit_address") {
      if (editingAddressId) {
        const addr = addresses.find((a) => a.id === editingAddressId);
        if (addr) setTempAddress(addr);
      } else {
        setTempAddress({
          id: Date.now().toString(),
          firstName: "",
          lastName: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          phone: "",
        });
      }
    }
  }, [currentStep, editingAddressId, addresses]);

  const total = getTotalPrice();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep === "summary") {
      router.back();
    } else if (currentStep === "checkout_setup") {
      changeStep("summary");
    } else if (currentStep === "address_list") {
      changeStep("checkout_setup");
    } else if (currentStep === "add_card") {
      changeStep("checkout_setup");
    } else if (currentStep === "edit_address") {
      changeStep("address_list");
    } else if (currentStep === "confirmation") {
      changeStep("checkout_setup");
    } else if (currentStep === "success") {
      router.replace("/");
    } else if (currentStep === "order_summary") {
        router.back();
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (currentStep !== "summary" && currentStep !== "success") {
        handleBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [currentStep]);

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep === "summary") {
      changeStep("checkout_setup");
    } else if (currentStep === "edit_address") {
      if (editingAddressId) {
        const newAddresses = addresses.map((a) =>
          a.id === editingAddressId ? tempAddress : a,
        );
        setAddresses(newAddresses);
      } else {
        setAddresses([...addresses, tempAddress]);
        setSelectedAddressId(tempAddress.id);
      }
      changeStep("address_list");
    } else if (currentStep === "address_list") {
      changeStep("checkout_setup");
    } else if (currentStep === "add_card") {
      if (activeCardIndex < paymentMethods.length) {
        const selected = paymentMethods[activeCardIndex];
        setSelectedPaymentId(selected.id);
        changeStep("checkout_setup");
      } else {
        if (card.number.trim()) {
          const newPm = {
            id: Date.now().toString(),
            brand: "Master Card",
            number: card.number.replace(/(\d{4})/g, "$1 ").trim()
          };
          setPaymentMethods([...paymentMethods, newPm]);
          setSelectedPaymentId(newPm.id);
          changeStep("checkout_setup");
        }
      }
    } else if (currentStep === "checkout_setup") {
      changeStep("confirmation");
    } else if (currentStep === "confirmation") {
      confirmOrder();
    }
  };

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const finalPrice = selectedShipping === "delivery" ? total + 15 : total;
    setOrderedItems([...items]);
    setOrderedTotal(finalPrice);

    const randomId = Math.floor(1000000 + Math.random() * 9000000).toString();
    setOrderId(randomId);

    setTimeout(() => {
      setIsOrdering(false);
      changeStep("success");
      clearCart();
    }, 1500);
  };

  const confirmOrder = () => {
    const finalPrice = selectedShipping === "delivery" ? total + 15 : total;
    Alert.alert(
      "ORDER CONFIRMATION",
      `Are you sure you want to purchase ${items.length} items for $${finalPrice.toLocaleString()}?`,
      [
        { text: "CANCEL", style: "cancel" },
        { text: "CHECKOUT", onPress: handlePlaceOrder }
      ]
    );
  };

  return {
    currentStep,
    changeStep,
    direction,
    isOrdering,
    orderId,
    orderedItems,
    orderedTotal,
    selectedRating,
    setSelectedRating,
    selectedShipping,
    setSelectedShipping,
    isShippingModalVisible,
    setIsShippingModalVisible,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    editingAddressId,
    setEditingAddressId,
    paymentMethods,
    selectedPaymentId,
    setSelectedPaymentId,
    card,
    setCard,
    tempAddress,
    setTempAddress,
    activeCardIndex,
    setActiveCardIndex,
    handleBack,
    handleNext,
    total,
    selectedAddress,
    selectedPayment,
    items,
    updateQuantity,
  };
};
