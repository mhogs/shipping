import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WalletScreen } from '../screens';



const Stack = createNativeStackNavigator();

export const WalletStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='OrderHistory'
        >
            <Stack.Screen name="OrderHistory" component={WalletScreen} />
        </Stack.Navigator>
    )
}