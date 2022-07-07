
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { changeLanguage, useTranslation } from '../locales';
import { HomeScreen, OrderFormScreen } from '../screens';
import { HomeIcon, HomeIconActive, MessageIcon, OrdersIcon, OrdersIconActive, ProfileIcon } from '../assets';
import { ThemeType } from '../theme';
import { useTheme } from '../state/theming';

const Tab = createBottomTabNavigator();

export function BottomNavigationBar() {
    const { t } = useTranslation('home')
    return (

        <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" tabBar={props => <MyTabBar {...props} />} >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Orders"
                component={OrderFormScreen}
            />
        </Tab.Navigator>

    );
}

function MyTabBar(props: BottomTabBarProps) {
    const { state, navigation } = props
    const isActiveTab = (tabName: string) => state.routeNames[state.index] === tabName
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <View style={styles.root}>
            <View style={styles.menu}>
            <Pressable
                    style={styles.tab}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Image source={isActiveTab('Home') ? HomeIconActive : HomeIcon} width={24} height={24} />
                    <View>
                        <Text style={[styles.tabText, isActiveTab('Home') ? { color: theme.palette.primary[theme.mode].main } : {}]}>Home</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={styles.tab}
                    onPress={() => {
                        navigation.navigate('Orders');
                    }}
                >
                    <Image source={ isActiveTab('Orders')?OrdersIconActive: OrdersIcon} width={24} height={24} />
                    <View>
                        <Text style={[styles.tabText, isActiveTab('Orders')?{color: theme.palette.primary[theme.mode].main}:{}]}>Orders</Text>
                    </View>
                </Pressable>
                <View style={styles.tab}>
                    <Image source={MessageIcon} width={24} height={24} />
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <Text style={styles.tabText}>Messages</Text>
                    </Pressable>
                </View>
                <View style={styles.tab}>
                    <Image source={ProfileIcon} width={24} height={24} />
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <Text style={styles.tabText}>Profile</Text>
                    </Pressable>
                </View>
            </View>
        </View>

    );
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            backgroundColor: palette.white[mode].main,
            height: 70,
            paddingBottom: 0,
            paddingTop: 18,
            paddingLeft: 12.5,
            paddingRight: 12.5
        },
        menu: {
            flexDirection: 'row'
        },
        tab: {
            flex: 1,
            alignItems: 'center'
        },
        tabText: {
            ...text.regular.P12_Lh130,
            color: palette.grey[mode].main,
            marginTop: 4
        }
    })
}
