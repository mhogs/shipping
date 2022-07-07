
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { changeLanguage, useTranslation } from '../locales';
import { HomeScreen, OrderFormScreen } from '../screens';
import { ThemeType } from '../theme';
import { useTheme } from '../state/theming';
import { OrdersStackNavigator } from './OrdersStack';
import { MessagesStackNavigator } from './MessagesStack';
import { ProfileStackNavigator } from './ProfileStack';
import { MyBottomTabBar } from '../components/navigation';

const Tab = createBottomTabNavigator();

export function BottomNavigationBar() {
    const { t } = useTranslation('home')
    return (

        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" tabBar={props => <MyBottomTabBar {...props} />} >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="OrdersStack"
                component={OrdersStackNavigator}
            />
            <Tab.Screen
                name="MessagesStack"
                component={MessagesStackNavigator}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStackNavigator}
            />
        </Tab.Navigator>

    );
}


