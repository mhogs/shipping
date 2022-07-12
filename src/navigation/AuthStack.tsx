import { AuthScreen, VerifficationScreen, LoginScreen, RegisterScreen, SuccessScreen } from "../screens";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'

export type AuthStackParamList = {
    AuthScreen:undefined
    VerificationScreen:{phone?:string},
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;

const Stack = createNativeStackNavigator<AuthStackParamList>();



export const AuthStackNavigator = () => {
  
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
            initialRouteName='AuthScreen'
        >
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="VerificationScreen" component={VerifficationScreen} />
            
        </Stack.Navigator>
    )
}