import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";

import { LoginScreen } from "./login-screen";
import { RegisterScreen } from "./register-screen";
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";

import { useTheme } from "../../state/theming";
import { ThemeType } from "../../theme";
import { LeftArrowIcon } from "../../components/icons";
import { AuthScreenProps } from "../../navigation/AuthStack";
import { MyTabView } from "../../components/navigation";



/*
const renderScene = SceneMap({
  login: LoginScreen,
  register: RegisterScreen,
});
*/




export const AuthScreen = (props: AuthScreenProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { navigation } = props

  const authTabRoutes = [
    { key: "register", title: "Sign Up" },
    { key: "login", title: "Sign In" },
  ]
  const renderScene = (props: SceneRendererProps & {
    route: {
        key: string;
        title: string;
    };
  }) => {
    const {route}= props;
    switch (route.key) {
      case 'login':
        return <LoginScreen navigation={navigation} />;
      case 'register':
        return <RegisterScreen navigation={navigation} />;
      default:
        return null;
    }
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
            onPress={() => navigation.goBack()}
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

        <MyTabView enabledSwip={false} tabRoutes={authTabRoutes} sceneRendrer={renderScene} />
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
  });
};
