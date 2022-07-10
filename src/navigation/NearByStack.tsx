
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {  NearByScreen } from '../screens';


const Stack = createNativeStackNavigator();

export const NearByStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='NearBy'
        >
            <Stack.Screen name="NearBy" component={NearByScreen} />
        </Stack.Navigator>
    )
}

export type NearByStackParamList = {
    NearBy:undefined
    Directions:undefined
  };