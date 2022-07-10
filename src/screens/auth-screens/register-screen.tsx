import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { MyTextInput } from '../../components/inputs'
import { Space } from '../../components/util'
import { ProfileIcon, callIcon, googleIcon, appleIcon } from '../../assets'
import { LockOutLineIcon } from '../../components/icons'
import { AuthActionButton, SocialLoginButton } from '../../components/buttons'
import { Devider } from '../../components/util/Devider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthScreenProps, AuthStackParamList } from '../../navigation/AuthStack'


export const RegisterScreen = (props: any) => {
    const { navigation } = props;
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const createAccount = () =>{
        console.log('creating account');
        navigation.navigate('VerificationScreen',{phone:"+213773768972"})
    }

    const googleSignup = () =>{
        console.log('google sign-in')
    }

    const appleSignup = () =>{
        console.log('apple sign-in')
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <View style={styles.form}>
                <MyTextInput
                    label='Full Name'
                    placeholder='Enter your name'
                    startIcon={<Image source={ProfileIcon} />}
                />
                <Space direction='vertical' size={20} />
                <MyTextInput
                    label='Phone Number'
                    placeholder='Enter your number'
                    startIcon={<Image source={callIcon} />}
                />
                <Space direction='vertical' size={20} />
                <MyTextInput
                    label='Password'
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    startIcon={<LockOutLineIcon color={theme.palette.grey[theme.mode].main} size={24} />}
                />
            </View>
            <Space direction='vertical' size={40} />
            <AuthActionButton 
                label='Create Account'
                onClick={createAccount}
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
                onClick={googleSignup}
                icon={<Image source={googleIcon} />}             
            />
            <Space direction='vertical' size={15} />
            <SocialLoginButton 
                label={'Sign Up with Apple'}
                bgColor={theme.palette.black[theme.mode].main}
                textColor={theme.palette.white[theme.mode].main}
                onClick={appleSignup}
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
        form:{
            marginTop:30,
        },
        otherOptions:{
            textAlign:'center',
            ...text.regular.P14_Lh180,
            color: palette.grey[theme.mode].main,
        },
        
    })
}
