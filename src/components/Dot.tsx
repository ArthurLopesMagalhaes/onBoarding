import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface DotProps {
  index: number;
  activeDotIndex: Animated.SharedValue<number>;
}

export const Dot = ({ index, activeDotIndex }: DotProps) => {
  const rDotStyle = useAnimatedStyle(() => {
    const isActive = activeDotIndex.value === index;

    return {
      backgroundColor: withTiming(isActive ? "black" : "white", {
        duration: 150,
      }),
    };
  });

  return <Animated.View style={[styles.dot, rDotStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
