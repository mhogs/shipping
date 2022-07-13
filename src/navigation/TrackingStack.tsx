
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NotificationsScreen, TrackingDetailsScreen, TrackingScreen } from '../screens';


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
            <Stack.Screen name="TrackingDetails" component={TrackingDetailsScreen} />
        </Stack.Navigator>
    )
}

export type TrackingStackParamList = {
    Tracking: undefined,
    TrackingDetails:{packageId:string}
};