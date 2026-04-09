import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Clipboard,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ShareProductModalProps {
  visible: boolean;
  productId: string;
  onClose: () => void;
}

export default function ShareProductModal({
  visible,
  productId,
  onClose,
}: ShareProductModalProps) {
  const copyToClipboard = () => {
    Clipboard.setString(`https://openui.design/product/${productId}`);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.shareSheet}>
          <Text style={styles.shareTitle}>SHARE THIS PRODUCT</Text>
          <View style={styles.shareGrid}>
            <TouchableOpacity style={styles.shareOption}>
              <Image source={Images.footer.twitter} style={styles.snsIcon} />
              <Text style={styles.snsText}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareOption}>
              <Image source={Images.footer.instagram} style={styles.snsIcon} />
              <Text style={styles.snsText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareOption}>
              <Image source={Images.footer.youtube} style={styles.snsIcon} />
              <Text style={styles.snsText}>YouTube</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Feather name="link" size={20} color={Theme.colors.primary} />
            <Text style={styles.copyButtonText}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareSheet: {
    width: "80%",
    backgroundColor: Theme.colors.white,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  shareTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    letterSpacing: Theme.typography.letterSpacing.wider,
    marginBottom: 24,
  },
  shareGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  shareOption: {
    alignItems: "center",
    gap: 8,
  },
  snsIcon: {
    width: 40,
    height: 40,
  },
  snsText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.grey[500],
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
  },
  copyButtonText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
  },
});
