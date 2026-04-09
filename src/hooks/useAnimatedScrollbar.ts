import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function useAnimatedScrollbar() {
  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(1);
  const scrollViewHeight = useSharedValue(1);
  const scrollOpacity = useSharedValue(0);
  const trackHeightSV = useSharedValue(0);
  const contentMeasured = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      scrollOpacity.value = withSequence(
        withTiming(1, { duration: 150 }),
        withDelay(1200, withTiming(0, { duration: 600 })),
      );
    },
  });

  const trackStyle = useAnimatedStyle(() => {
    const ready = trackHeightSV.value > 10 && scrollViewHeight.value > 10;
    return { opacity: ready ? scrollOpacity.value : 0 };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const tHeight = trackHeightSV.value;
    const sHeight = scrollViewHeight.value;

    if (tHeight <= 10 || sHeight <= 10 || !contentMeasured.value) {
      return { transform: [{ translateY: 0 }] };
    }

    const cHeight = contentHeight.value;
    const thumbH = tHeight * 0.8;
    const maxThumbTravel = tHeight - thumbH;
    const maxScroll = Math.max(cHeight - sHeight, 1);
    const rawY = (scrollY.value / maxScroll) * maxThumbTravel;
    const translateY = Math.max(0, Math.min(rawY, maxThumbTravel));

    return { transform: [{ translateY }] };
  });

  const onContentSizeChange = (_: number, h: number) => {
    contentHeight.value = h;
    contentMeasured.value = true;
  };

  const onScrollViewLayout = (height: number) => {
    scrollViewHeight.value = height;
  };

  const onTrackLayout = (height: number) => {
    trackHeightSV.value = height;
  };

  return {
    scrollHandler,
    trackStyle,
    indicatorStyle,
    onContentSizeChange,
    onScrollViewLayout,
    onTrackLayout,
  };
}
