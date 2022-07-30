
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { userType } from '../@types';
import { ChatScreen, MessagesScreen } from '../screens';



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
            <Stack.Screen name="MessageDetails" component={ChatScreen} />
        </Stack.Navigator>
    )
}

export type MessagesStackParamList = {
    Messages: undefined
    MessageDetails: { sender:userType }
};