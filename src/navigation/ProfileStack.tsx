
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditProfileScreen } from '../screens';


const Stack = createNativeStackNavigator();

export const ProfileStackNavigator = () => {
  
    return (
        
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
            initialRouteName='EditProfile'
        >
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}