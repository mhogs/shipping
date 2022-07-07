import { OrderFormScreen } from "../screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator();

export const OrdersStackNavigator = () => {
  
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
            initialRouteName='OrdersForm'
        >
          <Stack.Screen name="OrdersForm" component={OrderFormScreen} />
        </Stack.Navigator>
    )
}