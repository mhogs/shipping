
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MessagesScreen } from '../screens';


const Stack = createNativeStackNavigator();

export const MessagesStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='Messages'
        >
            <Stack.Screen name="Messages" component={MessagesScreen} />
        </Stack.Navigator>
    )
}
