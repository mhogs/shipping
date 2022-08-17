import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../state/theming';
import { ThemeType } from '../../constants/theme';
import { HomeIcon, HomeIconActive, MessageIcon, MessageIconActive, OrdersIcon, OrdersIconActive, ProfileIcon, ProfileIconActive } from '../../assets';
import { RootStackParamList } from '../../navigation/BottomNavigationBar';
import { OrdersHistoryStackParamList } from '../../navigation/OrderHistoryStack';
import { isRTL, useTranslation } from '../../locales';




export function MyBottomTabBar(props: BottomTabBarProps) {
    const { state, navigation, descriptors } = props
    const extraStyle = Object.values(descriptors)[state.index].options.tabBarStyle as any;
    const { t } = useTranslation("bottom_tab_bar")
    const isActiveTab = (tabName: string) => state.routeNames[state.index] === tabName
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme,isRTL()])



    return (
        <View style={[extraStyle, styles.root]}>
            <View style={styles.menu}>
                {
                    BottomTabs.map(tab => (
                        <View key={tab.name} style={styles.tab}>
                            <Pressable
                                style={styles.tabPressable}
                                onPress={() => {
                                    navigation.navigate(tab.route);
                                }}
                                android_ripple={{ color: theme.palette.lightGrey[theme.mode].main, borderless: true }}
                            >
                                <Image source={isActiveTab(tab.route) ? tab.activeIcon : tab.icon} style={{ width: 24, height: 24 }} />
                                <Text style={[styles.tabText, isActiveTab(tab.route) ? { color: theme.palette.primary[theme.mode].main } : {}]}>
                                    {t(tab.name)}
                                </Text>
                            </Pressable>
                        </View>

                    ))
                }
            </View>
        </View>

    );
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            backgroundColor: palette.bg[mode].main,
            borderTopWidth:1,
            borderColor:palette.bg[mode][2]
        },
        menu: {
            flexDirection:isRTL()?"row-reverse": 'row',
            paddingLeft: 6,
            paddingRight: 6
        },
        tab: {
            flex: 1,
            alignItems: 'center',
            marginTop: 9,
            marginLeft: 6,
            marginRight: 6,

        },
        tabPressable: {
            alignItems: 'center',
            padding: 6
        },
        tabText: {
            ...text.regular.P10_Lh130,
            color: palette.grey[mode].main,
            marginTop: 4
        }
    })
}


type BottomTabType = {
    name: string,
    icon: any,
    activeIcon: any,
    route: keyof RootStackParamList
}
const BottomTabs: BottomTabType[] = [
    {
        name: 'Home',
        icon: HomeIcon,
        activeIcon: HomeIconActive,
        route: 'HomeStack'
    },
    {
        name: 'My Orders',
        icon: OrdersIcon,
        activeIcon: OrdersIconActive,
        route: 'MyOrdersStack'
    },
    {
        name: 'Messages',
        icon: MessageIcon,
        activeIcon: MessageIconActive,
        route: 'MessagesStack'
    },
    {
        name: 'Profile',
        icon: ProfileIcon,
        activeIcon: ProfileIconActive,
        route: 'ProfileStack'
    }
]

export function useHideBottomBar(navigation: any, depth = 1) {
    useEffect(() => {
        let rootTabScreen = navigation.getParent()
        for (let i = 1; i < depth; i++) {
            rootTabScreen = rootTabScreen.getParent()
        }
        rootTabScreen?.setOptions({ tabBarStyle: { display: "none" } });
        return () => rootTabScreen?.setOptions({ tabBarStyle: undefined });
    }, [navigation]);
}