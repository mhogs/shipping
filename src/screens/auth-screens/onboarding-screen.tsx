import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { useTheme } from "../../state/theming";
import { ThemeType } from "../../constants/theme";
import { OnboardingScreenProps } from "../../navigation/AuthStack";
import { onboarding1, onboarding2, onboarding3 } from "../../assets";
import { Slider } from "../../components/content";
import { SaveChangesButton } from "../../components/buttons";
import { MyStatusBar, Space } from "../../components/util";




export const OnboardingScreen = (props: OnboardingScreenProps) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme])  ;
  const { navigation } = props

  return (
    <>
      <MyStatusBar
        bg={theme.palette.primary[theme.mode][3]}
      />
      <View style={styles.root}>
        <View style={styles.sliderContainer}>
          <Slider slides={onBoardingData} />
        </View>

        <View style={styles.actionsContainer}>
          <Space size={40} direction="vertical" />
          <SaveChangesButton text='Create Account' onPress={() => navigation.navigate('AuthScreen')} />
        </View>
      </View>

    </>
  );
};

const getStyles = (theme: ThemeType) => {
  const { palette } = theme;
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.bg[theme.mode].main,
    },
    sliderContainer: {
      flex: 7,
    },
    actionsContainer: {
      flex: 3,
      paddingHorizontal: 24,

    }
  });
};


const onBoardingData = [
  {
    id: '1',
    title: 'Cash on Delivery or E-payment',
    subTitle: 'Our delivery will ensure your items are delivered right to the door steps',
    image: onboarding1
  },
  {
    id: '2',
    title: 'Delivery Right to Your Door Step',
    subTitle: 'Our delivery will ensure your items are delivered right to the door steps',
    image: onboarding2
  },
  {
    id: '3',
    title: 'Welcome to Tracky',
    subTitle: 'Tracky is the best solution to deliver and track goods from local and world shipping.',
    image: onboarding3
  }
]
