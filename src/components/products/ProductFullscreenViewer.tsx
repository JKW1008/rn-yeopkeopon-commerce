import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface ProductFullscreenViewerProps {
  visible: boolean;
  images: string[];
  onClose: () => void;
}

const FullscreenImageItem = ({ url }: { url: string }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (url) {
      Image.getSize(url, (w, h) => {
        setAspectRatio(w / h);
      });
    }
  }, [url]);

  return (
    <Image
      source={{ uri: url }}
      style={[
        styles.fullImage,
        { height: width / aspectRatio, marginBottom: 10 } // 이미지 간 10px 여백 및 정밀 높이
      ]}
      resizeMode="contain"
    />
  );
};

export default function ProductFullscreenViewer({
  visible,
  images,
  onClose,
}: ProductFullscreenViewerProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <Feather name="x" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {images && images.map((url, index) => (
            <FullscreenImageItem key={`${url}-${index}`} url={url} />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  fullImage: {
    width: width,
  },
});
