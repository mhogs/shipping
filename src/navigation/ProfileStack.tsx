
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditProfileScreen } from '../screens';
import { MyProfileScreen } from '../screens/profile-screens/my-profile-screen';


const Stack = createNativeStackNavigator();

export const ProfileStackNavigator = () => {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='MyProfile'
        >
            <Stack.Screen name="MyProfile" component={MyProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}