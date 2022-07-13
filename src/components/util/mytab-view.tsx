import { View, Text, Pressable, useWindowDimensions, StyleSheet } from 'react-native'
import React, { useState } from "react";

import { useTheme } from "../../state/theming";
import { ThemeType } from "../../theme";

import {
    TabView,
    SceneMap,
    SceneRendererProps,
    NavigationState,
  } from "react-native-tab-view";

  
type routeType = {
    key: string,
    title: string,
}

type MyTabViewType = {
    enabledSwip?: boolean,
    tabRoutes: routeType[],
    sceneRendrer: (props: SceneRendererProps & {
        route: {
            key: string;
            title: string;
        };
    })=> JSX.Element | null
}

export const MyTabView = ({enabledSwip=false, tabRoutes, sceneRendrer}: MyTabViewType) => {



    const { theme } = useTheme();
    const styles = getStyles(theme);

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState(tabRoutes);

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
        <View style={styles.container}>
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={_renderTabBar}
            renderScene={sceneRendrer}
            swipeEnabled={false}
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
  