import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

import { LoginScreen } from "./login-screen";
import { RegisterScreen } from "./register-screen";
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";

import { useTheme } from "../../state/theming";
import { ThemeType } from "../../theme";
import { LeftArrowIcon } from "../../components/icons";

const renderScene = SceneMap({
  login: LoginScreen,
  register: RegisterScreen,
});

export const AuthScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "register", title: "Sign Up" },
    { key: "login", title: "Sign In" },
  ]);

  const _renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return (
      <View style={styles.tapBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <Pressable
              key={i}
              style={
                index === i ? styles.tabItemFocused : styles.tabItemNotFocused
              }
              onPress={() => setIndex(i)}
            >
              <Text
                style={
                  index === i ? styles.focusedLabel : styles.nonFocusedLabel
                }
              >
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme.palette.white[theme.mode].main}
      />

      <View style={styles.root}>
        <View style={styles.header}>
          <Pressable
            onPress={() => console.log("back")}
            style={styles.back_wraper}
          >
            <LeftArrowIcon
              size={24}
              color={theme.palette.black[theme.mode].main}
            ></LeftArrowIcon>
          </Pressable>
        </View>
        <Text style={styles.title}>Shipping and Track Anytime</Text>
        <Text style={styles.description}>Get great experience with tracky</Text>
        <View style={styles.container}>
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={_renderTabBar}
            renderScene={renderScene}
            swipeEnabled={false}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </View>
    </>
  );
};

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme;
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.white[theme.mode].main,
      paddingLeft: 24,
      paddingRight: 24,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 30,
    },
    back_wraper: {
      justifyContent: "center",
      alignItems: "center",
      width: 46,
      height: 46,
      borderRadius: 46,
      borderWidth: 1,
      borderColor: palette.grey[theme.mode][3],
    },
    back_arrow: {
      width: 23,
      height: 23,
    },
    title: {
      marginTop: 20,
      ...text.heading.H2,
      color: palette.black[mode].main,
    },
    description: {
      marginTop: 10,
      marginBottom: 30,
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main,
    },
    container: {
      flex: 1,
    },

    tapBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 25,
      height: 50,
      padding: 4,
      elevation: 0,
      backgroundColor: palette.lightGrey[theme.mode][3],
    },
    tabItemFocused: {
      flex: 1,
      borderRadius: 25,
      height: "100%",
      backgroundColor: palette.white[theme.mode].main,
      justifyContent: "center",
    },
    tabItemNotFocused: {
      flex: 1,
      borderRadius: 25,
      height: "100%",
      backgroundColor: "transparent",
      justifyContent: "center",
    },
    focusedLabel: {
      color: palette.black[mode].main,
      ...text.medium.P14_Lh130,
      textAlign: "center",
    },
    nonFocusedLabel: {
      color: palette.grey[mode].main,
      ...text.medium.P14_Lh130,
      textAlign: "center",
    },
  });
};
