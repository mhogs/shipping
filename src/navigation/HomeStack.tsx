
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens';
import { CheckRatesStackNavigator } from './CheckRatesStack';
import { NearByStackNavigator } from './NearByStack';




const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CheckRatesStack" component={CheckRatesStackNavigator} />
            <Stack.Screen name="NearbyDropStack" component={NearByStackNavigator} />
        </Stack.Navigator>
    )
}