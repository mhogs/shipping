
import { Pressable, StyleSheet, Text, View } from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { changeLanguage, useTranslation } from '../locales';
import { HomeScreen, LoginScreen } from '../screens';

const Tab = createBottomTabNavigator();

export  function BottomNavigationBar() {
    const { t } = useTranslation('home')
    return (
        
            <Tab.Navigator initialRouteName="Home" tabBar={props => <MyTabBar {...props} />} >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Welcome' }}
                />
            </Tab.Navigator>

    );
}

function MyTabBar({ navigation }: any) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Home');
                }}
            >
                <Text>Home</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <Text>Login</Text>
            </Pressable>
        </View>

    );
}

