
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, TopUpScreen } from '../screens';
import { CheckRatesStackNavigator } from './CheckRatesStack';
import { HelpCenterStackNavigator } from './HelpCenterStack';
import { NearByStackNavigator } from './NearByStack';
import { NotificationsStackNavigator } from './NotificationsStack';
import { OrderHistoryStackNavigator } from './OrderHistoryStack';
import { OrdersStackNavigator } from './OrdersStack';
import { TrakingStackNavigator } from './TrackingStack';
import { WalletStackNavigator } from './WalletStack';




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
            <Stack.Screen name="OrdersStack" component={OrdersStackNavigator} />
            <Stack.Screen name="OrderHistoryStack" component={OrderHistoryStackNavigator} />
            <Stack.Screen name="HelpCenterStack" component={HelpCenterStackNavigator} />
            <Stack.Screen name="WalletStack" component={WalletStackNavigator} /> 
            <Stack.Screen name="TopUp" component={TopUpScreen} />
            <Stack.Screen name="NotificationsStack" component={NotificationsStackNavigator} />
            <Stack.Screen name="TrackingStack" component={TrakingStackNavigator} />
           
        </Stack.Navigator>
    )
}