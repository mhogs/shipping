import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HelpCenterScreen } from '../screens';



const Stack = createNativeStackNavigator();

export const HelpCenterStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Help'
        >
            <Stack.Screen name="Help" component={HelpCenterScreen} />
        </Stack.Navigator>
    )
}
export type HelpCenterStackParamList = {
    Help:undefined
  };