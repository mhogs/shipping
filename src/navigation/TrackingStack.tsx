
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CodeScanScreen, TrackingDetailsScreen, TrackingScreen } from '../screens';


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
            <Stack.Screen name="Scan" component={CodeScanScreen} />
        </Stack.Navigator>
    )
}

export type TrackingStackParamList = {
    Tracking: undefined,
    TrackingDetails:{code:string},
    Scan:undefined
};