import { View, Text, Pressable, useWindowDimensions, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React, { useState } from "react";

import { useTheme } from "../../state/theming";
import { ThemeType } from "../../constants/theme";

import {
  TabView,
  SceneRendererProps,
  NavigationState,
} from "react-native-tab-view";
import { ScrollView } from 'react-native-gesture-handler';
import { isRTL } from '../../locales';


type routeType = {
  key: string,
  title: string,
}

type MyTabViewType = {
  enabledSwip?: boolean,
  tabRoutes: routeType[],
  tapBarstyle?: StyleProp<ViewStyle>,
  tabItemFocusedStyle?: StyleProp<ViewStyle>,
  tabItemNotFocusedStyle?: StyleProp<ViewStyle>,
  focusedLabelstyle?: StyleProp<TextStyle>,
  nonFocusedLabelStyle?: StyleProp<TextStyle>,
  scrollable?: boolean
  sceneRendrer: (props: SceneRendererProps & {
    route: {
      key: string;
      title: string;
    };
  }) => JSX.Element | null
}

export const MyTabView = (props: MyTabViewType) => {
  const {
    enabledSwip = false,
    tabRoutes,
    sceneRendrer,
    tapBarstyle = undefined,
    tabItemFocusedStyle = undefined,
    tabItemNotFocusedStyle = undefined,
    focusedLabelstyle = undefined,
    nonFocusedLabelStyle = undefined,
    scrollable = false,
  } = props


  const { theme } = useTheme();
  const styles = React.useMemo(() => getStyles(theme), [theme, isRTL()]);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const _renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return (
      <View style={[tapBarstyle ? tapBarstyle : styles.tapBar, { zIndex: 10, marginBottom: 30 }]}>
        <ScrollView
          horizontal={scrollable}
          contentContainerStyle={styles.scrollable}
          showsHorizontalScrollIndicator={false}
          style={isRTL()? { transform:  [{ rotateY: '180deg' }] }:{}}
        >
          {props.navigationState.routes.map((route, i) => {
            return (
              <Pressable
                key={i}
                style={
                  [index === i ?
                    (tabItemFocusedStyle ? tabItemFocusedStyle : styles.tabItemFocused)
                    :
                    (tabItemNotFocusedStyle ? tabItemNotFocusedStyle : styles.tabItemNotFocused)
                    ,
                  isRTL() ? { transform: [{ rotateY: '180deg' }] } : {}
                  ]
                }
                onPress={() => setIndex(i)}
              >
                <Text
                  style={
                    index === i ? [styles.focusedLabel, focusedLabelstyle] : [styles.nonFocusedLabel, nonFocusedLabelStyle]
                  }
                >
                  {route.title}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>




    );
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes: tabRoutes }}
        renderTabBar={_renderTabBar}
        renderScene={sceneRendrer}
        swipeEnabled={enabledSwip}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  )
}



const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme;
  return StyleSheet.create({

    container: {
      flex: 1,
    },

    tapBar: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      borderRadius: 25,
      padding: 4,
      elevation: 0,
      backgroundColor: palette.bg[theme.mode][2],
    },
    scrollable: {
      flexDirection: "row",
      height: "100%"
    },
    tabItemFocused: {
      flex: 1,
      borderRadius: 25,
      paddingVertical: 12,
      height: "100%",
      backgroundColor: palette.bg[theme.mode].main,
      justifyContent: "center",
    },
    tabItemNotFocused: {
      flex: 1,
      borderRadius: 25,
      paddingVertical: 12,
      height: "100%",
      backgroundColor: "transparent",
      justifyContent: "center",
    },
    focusedLabel: {
      color: palette.text[mode].main,
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
