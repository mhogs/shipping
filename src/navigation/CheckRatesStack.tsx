
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChackRatesScreen } from '../screens';



const Stack = createNativeStackNavigator();

export const CheckRatesStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='CkeckRates'
        >
            <Stack.Screen name="CkeckRates" component={ChackRatesScreen} />
        </Stack.Navigator>
    )
}