import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment } from 'react'
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Image, Pressable, ScrollView } from 'react-native'
import { globeIcon, HelpIcon, lockIcon, MobileIcon, notificationIcon, ProfilePicture, SecurityIcon, ShareIcon, TeamIcon } from '../../assets';
import { SignoutIcon } from '../../components/icons';
import { MenuItem } from '../../components/navigation';
import { Space } from '../../components/util';
import { RootStackParamList } from '../../navigation/BottomNavigationBar';
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import { useAuthentication } from '../../state';
import { useTheme } from '../../state/theming';
import { ThemeType } from '../../theme'


type MyProfileScreenProps = NativeStackScreenProps<ProfileStackParamList&RootStackParamList , 'MyProfile'>;
export const MyProfileScreen = ({ navigation }: MyProfileScreenProps) => {
    const { navigate } = navigation
    const {signOut, serverState, currentUser} =useAuthentication()
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <>
            <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
            <KeyboardAvoidingView style={styles.root}>
                <View style={styles.head} >
                    {/** title */}
                    <View style={styles.title_wraper}>
                        <Text style={styles.title}  >My Profile</Text>
                        <Pressable
                        onPress={()=>signOut()}
                        style={{padding:4}}
                        android_ripple={{color:theme.palette.primary[theme.mode][3],borderless:true }}
                        >
                           <SignoutIcon color={theme.palette.lightGrey[theme.mode].main} /> 
                        </Pressable>
                        
                    </View>
                    {/** profile  */}
                    <View style={styles.profile_wraper}>
                        <View style={styles.info_wraper}>
                            <Image style={styles.profile_pic} source={{uri:currentUser?.picture}} />
                            
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.profile_name}>{`${currentUser?.first_name} ${currentUser?.last_name}`}</Text>
                                <Text style={styles.phone}>{currentUser?.phonenumber}</Text>
                            </View>
                        </View>

                        <View style={styles.editProfileButtun}>
                            <Pressable 
                            style={styles.editProfilePressable}
                            onPress={()=>navigate('EditProfile',{userId:"1"})}
                            android_ripple={{color:theme.palette.grey[theme.mode].main}}
                            >
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                    {
                        settings.map(setting => (
                            <Fragment key={setting.title}>
                                <Text style={styles.sectionTitle}>{setting.title}</Text>
                                <Space size={20} direction='vertical' />
                                {
                                    setting.menu.map(item => (
                                        <Fragment key={item.name}>
                                            <MenuItem
                                                title={item.name}
                                                icon={item.icon}
                                                onPress={() => navigate(item.route,item.option)}
                                            />
                                            <Space size={15} direction='vertical' />
                                        </Fragment>

                                    ))
                                }
                                <Space size={24} direction='vertical' />
                            </Fragment>
                        ))
                    }
                </ScrollView>

            </KeyboardAvoidingView>

        </>

    )
}



const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.lightGrey[theme.mode][3],
        },
        head: {
            backgroundColor: palette.primary[theme.mode].main,
            padding: 24,
        },
        title_wraper: {
            marginTop: 6,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        },
        title: {
            ...text.heading.H1,
            color: palette.white[mode].main,
        },
        profile_wraper: {
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        info_wraper: {
            flexDirection: 'row',

        },
        profile_pic: {
            marginRight: 16,
            width: 54,
             height: 54,
              borderRadius: 54
        },
        profile_name: {
            ...text.heading.H3,
            color: palette.white[mode].main,
            marginBottom: 6
        },
        phone: {
            ...text.regular.P14_Lh130,
            color: 'rgba(255,255,255,0.7)'
        },
        editProfileButtun: {
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.15)'
        },
        editProfilePressable: {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
        },
        editProfileText: {
            ...text.regular.P14_Lh180,
            color: palette.white[mode].main
        },
        body: {
            padding: 24
        },
        sectionTitle: {
            ...text.heading.H3,
            color: palette.black[mode].main,
        },
        settingWraper: {
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode].main
        },

        setting: {
            flexDirection: 'row',
            padding: 11,

        },
        MenuItemText: {
            ...text.medium.P14_Lh180,
            color: palette.black[mode].main,
            marginLeft: 14,
        }
    })
}

type menuItemType = {
    name: string,
    icon: any,
    route: keyof ProfileStackParamList | keyof RootStackParamList,
    option?:any
}

type sectionType = {
    title: string,
    menu: menuItemType[]
}

const settings: sectionType[] = [

    {
        title: 'Settings',
        menu: [
            {
                name: "Change Password",
                icon: <Image source={lockIcon}  />,
                route: 'ChangePasswordSetting'
            },
            {
                name: "Language",
                icon: <Image source={globeIcon}  />,
                route: 'LanguageSetting'
            },
            {
                name: "Notification",
                icon: <Image source={notificationIcon}  />,
                route: 'NotificationSetting'
            },
        ]
    },
    {
        title: 'Ubout Us',
        menu: [
            {
                name: "FAQ",
                icon: <Image source={HelpIcon}  />,
                route: 'HomeStack',
                option:{screen:'HelpCenterStack'}
            },
            {
                name: "Policy & Security",
                icon: <Image source={SecurityIcon}  />,
                route: 'MyProfile'
            },
            {
                name: "Contact Us",
                icon: <Image source={TeamIcon}  />,
                route: 'MyProfile'
            },
        ]
    },
    {
        title: 'Other',
        menu: [
            {
                name: "Share",
                icon: <Image source={ShareIcon}  />,
                route: 'MyProfile'
            },
            {
                name: "Get The Latest Version",
                icon: <Image source={MobileIcon}  />,
                route: 'MyProfile'
            },
        ]
    }


]