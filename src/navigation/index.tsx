import { BottomNavigationBar } from './BottomNavigationBar'
import { AuthStackNavigator } from './AuthStack'
import { useAuthentication } from '../state'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


export const Navigation = () => {
    const { currentUser } = useAuthentication()

    return (
        currentUser !== null ? <RootStackNavigator /> : <AuthStackNavigator />
    )
}

const RootStack = createNativeStackNavigator()

const RootStackNavigator = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Root'
        >
            <RootStack.Screen name="Root" component={BottomNavigationBar} />
        </RootStack.Navigator>
    )
}