import { useState, useEffect, useMemo } from 'react';
import { Alert, BackHandler } from 'react-native';
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useCartStore } from "@/src/store/useCartStore";
import { memberService } from "../api/services/memberService";
import { orderService } from "../api/services/orderService";
import { Address, PaymentMethod } from "../api/types";

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

export const DEFAULT_ADDRESS: Address = {
  id: "new",
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  isDefault: false
};

export const DEFAULT_PAYMENT: PaymentMethod = {
  id: "new",
  brand: "Card",
  lastFour: "0000",
  expiryDate: "00/00"
};

export const useCheckout = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart, updateQuantity } = useCartStore();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("summary");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  const [orderedTotal, setOrderedTotal] = useState(0);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedShipping, setSelectedShipping] = useState("pickup");
  const [isShippingModalVisible, setIsShippingModalVisible] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [addrData, payData] = await Promise.all([
          memberService.getAddresses(),
          memberService.getPaymentMethods(),
        ]);
        
        setAddresses(addrData);
        setPaymentMethods(payData);

        if (addrData.length > 0) setSelectedAddressId(addrData[0].id);
        if (payData.length > 0) setSelectedPaymentId(payData[0].id);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || addresses[0] || DEFAULT_ADDRESS,
    [addresses, selectedAddressId]
  );
  const selectedPayment = useMemo(
    () => paymentMethods.find((p) => p.id === selectedPaymentId) || paymentMethods[0] || DEFAULT_PAYMENT,
    [paymentMethods, selectedPaymentId]
  );

  const [tempAddress, setTempAddress] = useState<Address>(DEFAULT_ADDRESS);

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
          isDefault: false
        });
      }
    }
  }, [currentStep, editingAddressId, addresses]);

  const total = getTotalPrice();

  const changeStep = (newStep: CheckoutStep) => {
    const steps: CheckoutStep[] = [
      "summary", "checkout_setup", "address_list", "payment_list", 
      "add_card", "edit_address", "confirmation", "success", "order_summary"
    ];
    const currentIndex = steps.indexOf(currentStep);
    const nextIndex = steps.indexOf(newStep);
    setDirection(nextIndex > currentIndex ? "forward" : "backward");
    setCurrentStep(newStep);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep === "summary") {
      router.back();
    } else if (currentStep === "checkout_setup") {
      changeStep("summary");
    } else if (currentStep === "address_list") {
      changeStep("checkout_setup");
    } else if (currentStep === "add_card" || currentStep === "payment_list") {
      changeStep("checkout_setup");
    } else if (currentStep === "edit_address") {
      changeStep("address_list");
    } else if (currentStep === "confirmation") {
      changeStep("checkout_setup");
    } else if (currentStep === "success") {
      router.replace("/");
    } else {
      router.back();
    }
  };

  const updateTempAddress = (updates: Partial<Address>) => {
    setTempAddress((prev) => ({ ...prev, ...updates }));
  };

  const updateCard = (updates: Partial<typeof card>) => {
    setCard((prev) => ({ ...prev, ...updates }));
  };

  const detectCardBrand = (number: string) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "Amex";
    return "Card";
  };

  const onActiveCardChange = (index: number) => {
    setActiveCardIndex(index);
    if (index < paymentMethods.length) {
      const pm = paymentMethods[index];
      setSelectedPaymentId(pm.id);
      setCard({
        name: "Stored Card",
        number: `•••• •••• •••• ${pm.lastFour}`,
        expiry: pm.expiryDate,
        cvv: "•••",
      });
    } else {
      setSelectedPaymentId("");
      setCard({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
      });
    }
  };

  const handleNext = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentStep === "summary") {
      changeStep("checkout_setup");
    } else if (currentStep === "edit_address") {
      if (!tempAddress?.firstName?.trim() || 
          !tempAddress?.lastName?.trim() || 
          !tempAddress?.street?.trim() || 
          !tempAddress?.city?.trim() || 
          !tempAddress?.state?.trim() || 
          !tempAddress?.zipCode?.trim()) {
        Alert.alert("REQUIRED FIELDS", "Please fill in all required address fields.");
        return;
      }

      setIsLoading(true);
      try {
        if (editingAddressId && editingAddressId !== "new") {
          await memberService.updateAddress(tempAddress);
          setAddresses(addresses.map((a) => a.id === editingAddressId ? tempAddress : a));
        } else {
          const newAddress = await memberService.createAddress(tempAddress);
          setAddresses([...addresses, newAddress]);
          setSelectedAddressId(newAddress.id);
        }
        changeStep("address_list");
      } catch {
        Alert.alert("SAVE ERROR", "Failed to save address. Please check your connection.");
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === "add_card") {
      if (activeCardIndex === paymentMethods.length) {
        setIsLoading(true);
        try {
          if (card.number.length < 15) {
            Alert.alert("INVALID CARD", "Please enter a valid card number.");
            return;
          }

          const newPM = await memberService.createPaymentMethod({
            brand: detectCardBrand(card.number),
            lastFour: card.number.replace(/\s/g, "").slice(-4),
            expiryDate: card.expiry
          });
          setPaymentMethods([...paymentMethods, newPM]);
          setSelectedPaymentId(newPM.id);
          changeStep("checkout_setup");
        } catch {
          Alert.alert("CARD ERROR", "Failed to save card information.");
        } finally {
          setIsLoading(false);
        }
      } else {
        changeStep("checkout_setup");
      }
    } else if (currentStep === "address_list" || currentStep === "payment_list") {
      changeStep("checkout_setup");
    } else if (currentStep === "checkout_setup") {
      changeStep("confirmation");
    } else if (currentStep === "confirmation") {
      confirmOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setIsOrdering(true);
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const finalPrice = selectedShipping === "delivery" ? total + 15 : total;
      
      const orderResult = await orderService.createOrder({
        totalAmount: finalPrice,
        addressId: selectedAddress?.id,
        paymentMethodId: selectedPayment?.id,
        items: items.map(item => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        }))
      });

      setOrderedItems(items.map(item => ({
        id: item.productId || (item as any).id,
        name: item.product.name,
        price: Number(item.product.price),
        image: item.product.images[0],
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        brand: (item.product as any).brand || "21WN"
      })));
      setOrderedTotal(finalPrice);
      setOrderId(orderResult.id.substring(0, 8).toUpperCase());

      changeStep("success");
      await clearCart();
    } catch {
      Alert.alert("ORDER ERROR", "Failed to place order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
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
    isLoading,
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
    card,
    updateCard,
    tempAddress,
    updateTempAddress,
    activeCardIndex,
    onActiveCardChange,
    handleBack,
    handleNext,
    total,
    selectedAddress,
    selectedPayment,
    items,
    updateQuantity,
  };
};
