import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { Theme } from "@/src/constants/theme";
import RecentSearches from "@/src/components/search/RecentSearches";
import PopularSearchTerms from "@/src/components/search/PopularSearchTerms";
import { useSearch } from "@/src/hooks/useSearch";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import SearchHeader from "@/src/components/search/SearchHeader";

export default function SearchContainer() {
  const {
    query,
    setQuery,
    recentSearches,
    handleSearch,
    removeRecentSearch,
    clearQuery,
    popularTerms,
  } = useSearch();

  const renderInitialState = () => (
    <View style={styles.initialState}>
      <RecentSearches
        searches={recentSearches}
        onSelect={handleSearch}
        onRemove={removeRecentSearch}
      />
      <PopularSearchTerms
        terms={popularTerms}
        onSelect={handleSearch}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SearchHeader
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onClear={clearQuery}
      />

      <View style={styles.content}>
        {renderInitialState()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  content: {
    flex: 1,
  },
  initialState: {
    flex: 1,
  },
});
