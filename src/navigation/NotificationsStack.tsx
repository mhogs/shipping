
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {  NotificationsScreen } from '../screens';


const Stack = createNativeStackNavigator();

export const NotificationsStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Notifications'
        >
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}

export type NotificationsStackParamList = {
    Notifications:undefined
  };