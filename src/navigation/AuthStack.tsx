import { AuthScreen } from "../screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
  
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
            initialRouteName='AuthScreen'
        >
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}