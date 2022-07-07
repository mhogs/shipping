import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HelpCenterScreen } from '../screens';



const Stack = createNativeStackNavigator();

export const HelpCenterStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='OrderHistory'
        >
            <Stack.Screen name="OrderHistory" component={HelpCenterScreen} />
        </Stack.Navigator>
    )
}