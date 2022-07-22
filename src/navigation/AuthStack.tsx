import { AuthScreen, VerifficationScreen, OnboardingScreen } from "../screens";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'

export type AuthStackParamList = {
    AuthScreen:undefined,
    VerificationScreen:{phone?:string},
    OnboardingScreen: undefined,
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;
export type OnboardingScreenProps = NativeStackScreenProps<AuthStackParamList, 'AuthScreen'>;
export type VerificationScreenProps = NativeStackScreenProps<AuthStackParamList, 'VerificationScreen'>;


const Stack = createNativeStackNavigator<AuthStackParamList>();



export const AuthStackNavigator = () => {
  
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
            initialRouteName='OnboardingScreen'
        >
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="VerificationScreen" component={VerifficationScreen} />
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            
        </Stack.Navigator>
    )
}