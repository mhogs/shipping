
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NearByScreen, OrderHistoryScreen } from '../screens';




const Stack = createNativeStackNavigator();

export const OrderHistoryStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Order'
        >
            <Stack.Screen name="Order" component={OrderHistoryScreen} />
        </Stack.Navigator>
    )
}