import { View, StyleSheet, Image, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { MyTextInput } from '../../components/inputs'
import { LoadingView, Space } from '../../components/util'
import { ProfileIcon, callIcon, googleIcon, appleIcon } from '../../assets'
import { LockOutLineIcon } from '../../components/icons'
import { AuthActionButton, SaveChangesButton, SocialLoginButton } from '../../components/buttons'
import { Devider } from '../../components/util/Devider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthScreenProps, AuthStackParamList } from '../../navigation/AuthStack'
import { useAuthentication } from '../../state'
import { SignUpRequestDataType } from '../../@types'


export const RegisterScreen = (props: AuthScreenProps) => {
    const { navigation } = props;
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const { signUp, serverState } = useAuthentication()
    
    const [data, setData] = useState<SignUpRequestDataType>({
        first_name: "",
        last_name: "",
        phonenumber: "",
        password: ""
    })
    

    /** go to otp confirm screen when recieving sms */
    useEffect(() => {
        if (serverState.otp_recieved && data.phonenumber && data.password )
            navigation.navigate("VerificationScreen", { phone: data.phonenumber,password:data.password })
    }, [serverState.otp_recieved])

   
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <View style={styles.form}>
                
                <MyTextInput
                    label='First Name'
                    placeholder='Enter your first name'
                    startIcon={<Image source={ProfileIcon} />}
                    onChangeText={(text) => setData({ ...data, first_name: text })}
                />
                <Space direction='vertical' size={20} />
                <MyTextInput
                    label='Last Name'
                    placeholder='Enter your last name'
                    startIcon={<Image source={ProfileIcon} />}
                    onChangeText={(text) => setData({ ...data, last_name: text })}
                />
                <Space direction='vertical' size={20} />
                <MyTextInput
                    label='Phone Number'
                    placeholder='Enter your number'
                    startIcon={<Image source={callIcon} />}
                    onChangeText={(text) => setData({ ...data, phonenumber: text })}
                />
                <Space direction='vertical' size={20} />
                <MyTextInput
                    label='Password'
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    startIcon={<LockOutLineIcon color={theme.palette.grey[theme.mode].main} size={24} />}
                    onChangeText={(text) => setData({ ...data, password: text })}
                />
            </View>
            <Space direction='vertical' size={40} />
            <SaveChangesButton
                text='Create Account'
                onPress={() => {
                    signUp(data)
                }}
                pending={serverState.isLoading}
            />

            <Space direction='vertical' size={40} />

            <Devider />

            <Space direction='vertical' size={15} />
            <Text style={styles.otherOptions}>Or Sign In With</Text>
            <Space direction='vertical' size={15} />

            <SocialLoginButton
                label={'Sign Up with Google'}
                bgColor={theme.palette.white[theme.mode].main}
                textColor={theme.palette.black[theme.mode].main}
                onClick={() => { }}
                icon={<Image source={googleIcon} />}
            />
            <Space direction='vertical' size={15} />
            <SocialLoginButton
                label={'Sign Up with Apple'}
                bgColor={theme.palette.black[theme.mode].main}
                textColor={theme.palette.white[theme.mode].main}
                onClick={() => { }}
                icon={<Image source={appleIcon} />}
            />
        </ScrollView>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.white[theme.mode].main,
        },
        form: {
            marginTop: 30,
        },
        otherOptions: {
            textAlign: 'center',
            ...text.regular.P14_Lh180,
            color: palette.grey[theme.mode].main,
        },

    })
}
