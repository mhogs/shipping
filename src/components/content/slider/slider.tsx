import {
  View,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { sliderProps } from "./types";
import { OnboardingItem } from "./onboarding-item";
import { SliderDots } from "./slider-dots";
import { useTheme } from "../../../state/theming";
import { ThemeType } from "../../../theme";
import { Space } from "../../util";


export const Slider = ({slides}: sliderProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [currentIndex, setCurrentIndex]= useState(0);

  const itemChanged = useRef((info)=>{
    setCurrentIndex(info.viewableItems[0].index)
  }).current;

  return (
    <View style={styles.sliderContainer}>
      <FlatList 
        data={slides} 
        renderItem={({item}) => <OnboardingItem  item={item} />}
        keyExtractor={(item)=>item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onViewableItemsChanged={itemChanged}
        scrollEventThrottle={32}
      />
      <Space direction='vertical' size={30} />
      <SliderDots lenght={slides.length} active={currentIndex} />
    </View>
  );
};

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme;
  return StyleSheet.create({
    sliderContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
};
