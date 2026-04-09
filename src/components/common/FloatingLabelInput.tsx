import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Theme } from "@/src/constants/theme";

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  maxLength?: number;
  secureTextEntry?: boolean;
}

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  maxLength,
  secureTextEntry,
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useSharedValue(value ? -20 : 0);
  const labelScale = useSharedValue(value ? 0.85 : 1);

  useEffect(() => {
    const isFloating = isFocused || value !== "";
    labelPosition.value = withSpring(isFloating ? -20 : 0, {
      damping: 15,
      stiffness: 100,
    });
    labelScale.value = withSpring(isFloating ? 0.85 : 1, {
      damping: 15,
      stiffness: 100,
    });
  }, [isFocused, value]);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: labelPosition.value },
      { scale: labelScale.value },
    ],
    color: isFocused || value !== "" ? Theme.colors.secondary : Theme.colors.grey[400],
  }));

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderBottomColor: isFocused ? Theme.colors.secondary : Theme.colors.grey[300],
    borderBottomWidth: isFocused ? 1.5 : 1,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          animatedLabelStyle,
        ]}
      >
        {label}
      </Animated.Text>
      <Animated.View style={[styles.inputContainer, animatedBorderStyle]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={Theme.colors.secondary}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 10,
  },
  label: {
    position: "absolute",
    left: 0,
    top: 15,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
  },
  inputContainer: {
    height: 40,
  },
  input: {
    flex: 1,
    color: Theme.colors.secondary,
    fontSize: Theme.typography.fontSize.lg,
    fontFamily: Theme.typography.fontFamily.main,
    paddingVertical: 5,
  },
});

export default FloatingLabelInput;
