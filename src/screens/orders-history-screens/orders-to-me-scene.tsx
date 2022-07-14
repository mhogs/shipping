import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { MyTextInput } from '../../components/inputs'
import { Space } from '../../components/util'
import { callIcon, googleIcon, appleIcon } from '../../assets'
import { LockOutLineIcon } from '../../components/icons'
import { AuthActionButton, SocialLoginButton } from '../../components/buttons'
import { Devider } from '../../components/util/Devider'
import { AuthScreenProps, AuthStackParamList } from '../../navigation/AuthStack';



export const OrdersToMeScene = (props: any) => {
    const { navigation } = props;

    const { theme } = useTheme()
    const styles = getStyles(theme)

   

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
            <View style={styles.form}>
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
       
    })
}
