import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, LayoutAnimation } from 'react-native';
import { Theme } from '@/src/constants/theme';
import { Images } from '@/src/constants/theme/images';
import { Ionicons } from "@expo/vector-icons";

interface ShippingItem {
  id: string;
  icon: any;
  title: string;
  content: string;
}

interface ProductAccordionDetailsProps {
  description: string;
  imageUrl?: string;
  isGalleryOpen: boolean;
  setIsGalleryOpen: (open: boolean) => void;
  openShippingSection: string | null;
  setOpenShippingSection: (id: string | null) => void;
  shippingItems: ShippingItem[];
}

const ProductAccordionDetails: React.FC<ProductAccordionDetailsProps> = ({
  description,
  imageUrl,
  isGalleryOpen,
  setIsGalleryOpen,
  openShippingSection,
  setOpenShippingSection,
  shippingItems,
}) => {
  const toggleGallery = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsGalleryOpen(!isGalleryOpen);
  };

  const toggleShipping = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenShippingSection(openShippingSection === id ? null : id);
  };

  return (
    <View style={styles.detailsSection}>
      <View style={styles.detailItem}>
        <Text style={styles.detailTitle}>MATERIALS</Text>
        <Text style={styles.detailText}>{description}</Text>
      </View>

      <View style={styles.detailItem}>
        <TouchableOpacity
          style={styles.shippingAccordionHeader}
          onPress={toggleGallery}
        >
          <View style={styles.headerLeft}>
            <Text style={styles.detailTitle}>GALLERY</Text>
          </View>
          <Ionicons
            name={isGalleryOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={Theme.colors.grey[500]}
          />
        </TouchableOpacity>
        {isGalleryOpen && (
          <View style={styles.galleryContent}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.galleryImage}
            />
            <Image
              source={{ uri: imageUrl }}
              style={styles.galleryImage}
            />
          </View>
        )}
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.detailTitle}>CARE</Text>
        <Text style={styles.detailText}>
          To keep your jackets and coats clean, you only need to freshen
          them up and go over them with a cloth or a clothes brush. If you
          need to dry clean a garment, look for a dry cleaner that uses
          technologies that are respectful of the environment.
        </Text>

        <View style={styles.careInstructionList}>
          <View style={styles.careInstructionRow}>
            <Image source={Images.productDetail.bleach} style={styles.careIcon} />
            <Text style={styles.detailText}>Do not bleach</Text>
          </View>
          <View style={styles.careInstructionRow}>
            <Image source={Images.productDetail.dry} style={styles.careIcon} />
            <Text style={styles.detailText}>Dry clean only</Text>
          </View>
          <View style={styles.careInstructionRow}>
            <Image source={Images.productDetail.iron} style={styles.careIcon} />
            <Text style={styles.detailText}>Iron at maximum 110ºC/230ºF</Text>
          </View>
          <View style={styles.careInstructionRow}>
            <Image source={Images.productDetail.wash} style={styles.careIcon} />
            <Text style={styles.detailText}>Machine wash cold</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.detailTitle}>SHIPPING & RETURNS</Text>

        <View style={styles.shippingAccordionContainer}>
          {shippingItems.map((item) => (
            <View key={item.id} style={styles.shippingAccordionItem}>
              <TouchableOpacity
                style={styles.shippingAccordionHeader}
                onPress={() => toggleShipping(item.id)}
              >
                <View style={styles.headerLeft}>
                  <Image source={item.icon} style={styles.careIcon} />
                  <Text style={styles.accordionTitleText}>{item.title}</Text>
                </View>
                <Ionicons
                  name={openShippingSection === item.id ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={Theme.colors.grey[500]}
                />
              </TouchableOpacity>
              {openShippingSection === item.id && (
                <View style={styles.shippingAccordionContent}>
                  <Text style={styles.detailText}>{item.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsSection: {
    padding: 24,
    paddingTop: 30,
    gap: 50,
  },
  detailItem: {
    gap: 20,
  },
  detailTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  detailText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.grey[500],
    lineHeight: 22,
  },
  shippingAccordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  galleryContent: {
    paddingVertical: 16,
    gap: 12,
  },
  galleryImage: {
    width: "100%",
    height: 400,
    backgroundColor: Theme.colors.surface,
  },
  careInstructionList: {
    gap: 16,
    marginTop: 8,
  },
  careInstructionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  careIcon: {
    width: 22,
    height: 22,
    tintColor: Theme.colors.primary,
  },
  shippingAccordionContainer: {
    marginTop: 0,
  },
  shippingAccordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.grey[100],
  },
  accordionTitleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
  },
  shippingAccordionContent: {
    paddingBottom: 16,
    paddingLeft: 34,
  },
});

export default ProductAccordionDetails;
