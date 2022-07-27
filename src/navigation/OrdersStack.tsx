import { OrderScreen } from "../screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator();

export const OrdersStackNavigator = () => {
  
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
            initialRouteName='order'
        >
          <Stack.Screen name="order" component={OrderScreen} />
        </Stack.Navigator>
    )
}

export type OrderStackParamList = {
    order:{orderId:number},
};