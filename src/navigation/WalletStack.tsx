import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TopUpScreen, WalletScreen } from '../screens';



const Stack = createNativeStackNavigator();

export const WalletStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Wallet'
        >
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="TopUp" component={TopUpScreen} />
        </Stack.Navigator>
    )
}


export type WalletStackParamList = {
    Wallet:undefined
    TopUp:undefined
  };