import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { AntDesign } from "@expo/vector-icons";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  autoFocus?: boolean;
  containerStyle?: any;
}

export default function SearchInput({
  value,
  onChangeText,
  onSubmit,
  onClear,
  autoFocus = true,
  containerStyle,
}: SearchInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        <Image
          source={Images.header.search}
          style={styles.searchIcon}
          tintColor={Theme.colors.primary}
        />
        <TextInput
          style={styles.input}
          placeholder="Search items"
          placeholderTextColor={Theme.colors.grey[400]}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear}>
            <AntDesign name="close" size={20} color={Theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.primary,
    paddingBottom: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    padding: 0,
  },
});
