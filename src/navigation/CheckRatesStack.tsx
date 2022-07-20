
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

<<<<<<< HEAD
export type CkeckRatesParamList = {
    CkeckRates:undefined,
};
=======
export type CheckRatesParamList = {
    CkeckRates:undefined
  };
>>>>>>> c294f7e985877912897595730a14460a9e11db66
