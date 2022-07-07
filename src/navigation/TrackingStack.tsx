
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {  NotificationsScreen, TrackingScreen } from '../screens';


const Stack = createNativeStackNavigator();

export const TrakingStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Tracking'
        >
            <Stack.Screen name="Tracking" component={TrackingScreen} />
        </Stack.Navigator>
    )
}
