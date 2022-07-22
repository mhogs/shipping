import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HelpCenterCategoryScreen, HelpCenterScreen } from '../screens';



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
            <Stack.Screen name="HelpCategory" component={HelpCenterCategoryScreen} />
        </Stack.Navigator>
    )
}
export type HelpCenterStackParamList = {
    Help:undefined,
    HelpCategory:{name:string,}
  };