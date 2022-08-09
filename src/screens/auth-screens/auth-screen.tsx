import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import {
  SceneRendererProps,
} from "react-native-tab-view";

import { useTheme } from "../../state/theming";
import { ThemeType } from "../../constants/theme";
import { LeftArrowIcon } from "../../components/icons";
import { AuthScreenProps } from "../../navigation/AuthStack";
import { MyTabView } from "../../components/navigation";
import { LoginScene, RegisterScene } from "./components";
import { MyStatusBar, SimpleScreenHeader } from "../../components/util";



/*
const renderScene = SceneMap({
  login: LoginScreen,
  register: RegisterScreen,
});
*/




export const AuthScreen = (props: AuthScreenProps) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme])  ;
  const { navigation } = props

  const authTabRoutes = [
    { key: "register", title: "Sign Up" },
    { key: "login", title: "Sign In" },
  ]
  const renderScene = (params: SceneRendererProps & {
    route: {
      key: string;
      title: string;
    };
  }) => {
    const { route } = params;
    switch (route.key) {
      case 'login':
        return <LoginScene {...props} />;
      case 'register':
        return <RegisterScene {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <MyStatusBar />
      <View style={styles.root}>
        <View style={styles.header}>
          <SimpleScreenHeader goBack={navigation.goBack} />

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
      backgroundColor: palette.bg[theme.mode].main,
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
      color: palette.text[mode].main,
    },
    description: {
      marginTop: 10,
      marginBottom: 30,
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main,
    },
  });
};
