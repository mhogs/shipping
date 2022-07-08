
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChangePasswordScreen, EditProfileScreen, NotificationsScreen, UpdateLanguageScreen } from '../screens';
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
            <Stack.Screen name="EditProfile" component={EditProfileScreen}   />
            <Stack.Screen name="ChangePasswordSetting" component={ChangePasswordScreen} />
            <Stack.Screen name="LanguageSetting" component={UpdateLanguageScreen} />
            <Stack.Screen name="NotificationSetting" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}

export type ProfileStackParamList = {
    MyProfile:undefined
    EditProfile:{userId?:string}
    ChangePasswordSetting: undefined;
    LanguageSetting: undefined;
    NotificationSetting: undefined;
    FAQ:undefined
    Policy:undefined
    ContactUs:undefined
    Share:undefined
    UpdateApp:undefined
  };
