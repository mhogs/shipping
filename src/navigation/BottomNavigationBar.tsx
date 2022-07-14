
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
import { HomeStackNavigator } from './HomeStack';
import { OrderHistoryStackNavigator } from './OrderHistoryStack';

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
    HomeStack: undefined;
    OrdersStack: { userId: string };
    MyOrdersStack:undefined
    MessagesStack: { sort: 'latest' | 'top' } | undefined;
    ProfileStack:{userId: string},
    CheckRatesStack:undefined,
    NearbyDropStack:undefined,
    OrderHistoryStack:{userId: string},
    HelpCenterStack:undefined,
    WalletStack:{ userId: string },
    NotificationsStack:{userId:string},
    TrackingStack:undefined,
  };

export function BottomNavigationBar() {
    const { t } = useTranslation('home')
    return (

        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack" tabBar={props => <MyBottomTabBar {...props} />} >
            <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
            />
            <Tab.Screen
                name="MyOrdersStack"
                component={OrderHistoryStackNavigator}
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


