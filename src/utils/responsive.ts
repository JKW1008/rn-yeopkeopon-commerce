import { Dimensions, PixelRatio } from "react-native";

const BASE_WIDTH = 375;   // iPhone SE 기준
const BASE_HEIGHT = 812;  // iPhone SE 기준

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

/** 수평 스케일 (padding, margin, width, fontSize 등) */
export function scale(size: number): number {
  return Math.round(PixelRatio.roundToNearestPixel(size * widthRatio));
}

/** 수직 스케일 (height, vertical padding 등) */
export function vs(size: number): number {
  return Math.round(PixelRatio.roundToNearestPixel(size * heightRatio));
}

/**
 * 폰트/아이콘처럼 너무 크게 커지면 안 되는 값에 사용.
 * factor: 스케일 적용 비율 (0 = 고정, 1 = 완전 스케일, 기본 0.5)
 */
export function ms(size: number, factor: number = 0.5): number {
  return Math.round(
    PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor)
  );
}
