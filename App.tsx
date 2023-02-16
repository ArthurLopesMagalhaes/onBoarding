import React, { useCallback } from "react";

import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Page, PAGE_WIDTH } from "./src/components/Page";
import { AntDesign } from "@expo/vector-icons";

import { BACKGROUND_COLOR, PAGES } from "./src/utils/constants";
import { Dot } from "./src/components/Dot";

function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Animated.ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGES.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* Paginator */}
        <View style={[styles.fillCenter, { flexDirection: "row" }]}>
          {PAGES.map((_, index) => (
            <Dot
              key={index.toString()}
              index={index}
              activeDotIndex={activeIndex}
            />
          ))}
        </View>
        {/* Text Container */}
        <View style={styles.fillCenter}>
          <Text style={styles.text}>view board</Text>
        </View>
        {/* Icon Container */}
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: "row",
  },
  fillCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1.7,
    fontWeight: "500",
  },
});

export default App;
