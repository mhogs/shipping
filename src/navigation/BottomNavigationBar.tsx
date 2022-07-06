
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { changeLanguage, useTranslation } from '../locales';
import { HomeScreen, LoginScreen } from '../screens';

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
                name="Login"
                component={LoginScreen}
                
            />
        </Tab.Navigator>

    );
}

function MyTabBar({ navigation }: any) {
    return (
        <View style={{ flexDirection: 'row', }}>
            <View>
                <Octicons name="home" size={24} color="black" />
                <Pressable
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Text>Home</Text>
                </Pressable>
            </View>
            <View>
                <Octicons name="home" size={24} color="black" />
                <Pressable
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text>Login</Text>
                </Pressable>
            </View>

        </View>

    );
}

