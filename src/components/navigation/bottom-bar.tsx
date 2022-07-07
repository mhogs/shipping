import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../state/theming';
import { ThemeType } from '../../theme';
import { HomeIcon, HomeIconActive, MessageIcon, MessageIconActive, OrdersIcon, OrdersIconActive, ProfileIcon, ProfileIconActive } from '../../assets';




export function MyBottomTabBar(props: BottomTabBarProps) {
    const { state, navigation } = props
    const isActiveTab = (tabName: string) => state.routeNames[state.index] === tabName
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <View style={styles.root}>
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
                                <Image source={isActiveTab(tab.route) ? tab.activeIcon : tab.icon} width={24} height={24} />
                                <Text style={[styles.tabText, isActiveTab(tab.route) ? { color: theme.palette.primary[theme.mode].main } : {}]}>{tab.name}</Text>
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
            backgroundColor: palette.white[mode].main,

        },
        menu: {
            flexDirection: 'row',
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
            ...text.regular.P12_Lh130,
            color: palette.grey[mode].main,
            marginTop: 4
        }
    })
}


type BottomTabType = {
    name: string,
    icon: any,
    activeIcon: any,
    route: 'Home' | 'OrdersStack' | 'MessagesStack' | 'ProfileStack'
}
const BottomTabs: BottomTabType[] = [
    {
        name: 'Home',
        icon: HomeIcon,
        activeIcon: HomeIconActive,
        route: 'Home'
    },
    {
        name: 'Orders',
        icon: OrdersIcon,
        activeIcon: OrdersIconActive,
        route: 'OrdersStack'
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