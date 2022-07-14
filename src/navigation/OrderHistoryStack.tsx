
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NearByScreen, OrderHistoryScreen } from '../screens';




const Stack = createNativeStackNavigator();

export const OrderHistoryStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='MyOrders'
        >
            <Stack.Screen name="MyOrders" component={OrderHistoryScreen} />
        </Stack.Navigator>
    )
}

export type OrdersHistoryStackParamList = {
    MyOrders:undefined
  };