import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Image, Pressable } from 'react-native'
import { ProfilePicture } from '../../assets';
import { RootStackParamList } from '../../navigation/BottomNavigationBar';
import { useTheme } from '../../state/theming';
import { ThemeType } from '../../theme'


type MyProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileStack'>;
export const MyProfileScreen = ({ navigation }: MyProfileScreenProps) => {
    const { navigate } = navigation
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
                    </View>
                    {/** profile  */}
                    <View style={styles.profile_wraper}>
                        <View style={styles.info_wraper}>
                            <Image style={styles.profile_pic} width={54} height={54} source={ProfilePicture} />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.profile_name}>My balance</Text>
                                <Text style={styles.phone}>0799085706</Text>
                            </View>
                        </View>

                        <View style={styles.editProfileButtun}>
                            <Pressable style={styles.editProfilePressable}>
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

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
    })
}