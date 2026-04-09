import { Images } from "@/src/constants/theme/images";
import React from "react";
import { Image } from "react-native";

interface TitleUnderlineProps {
  width?: number;
  height?: number;
}

export default function TitleUnderline({
  width = 150,
  height = 15,
}: TitleUnderlineProps) {
  return (
    <Image
      source={Images.home.titleUnderline}
      style={{ width, height }}
      resizeMode="contain"
    />
  );
}
