import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTheme } from '../../../state/theming'
import { ThemeType } from '../../../constants/theme'
import { MyTextInput } from '../../../components/inputs'
import { Space } from '../../../components/util'
import { callIcon, googleIcon, appleIcon } from '../../../assets'
import { LockOutLineIcon } from '../../../components/icons'
import { AuthActionButton, SaveChangesButton, SocialLoginButton } from '../../../components/buttons'
import { Devider } from '../../../components/util/Devider'
import { AuthScreenProps, AuthStackParamList } from '../../../navigation/AuthStack';
import { SignInRequestDataType } from '../../../@types';
import { useAuthentication } from '../../../state';
import { Formik } from 'formik';
import * as yup from 'yup';

const SigninSchema = yup.object().shape({
    phonenumber: yup.string().required("phone is required").min(10, "phone must be at least 10 digits long !"),
    password: yup.string().required("password is required").min(8, "password must be at least 8 characters long"),
});

export const LoginScene = (props: AuthScreenProps) => {
    const { navigation } = props;
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    const { signIn, serverState } = useAuthentication()

    return (
        <Formik
            initialValues={{
                phonenumber: '',
                password: ""
            } as SignInRequestDataType}
            onSubmit={values => signIn(values)}
            validationSchema={SigninSchema}
            initialErrors={{ phonenumber: 'phone is required' }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>

                    <View >
                        <MyTextInput
                            label='Phone Number'
                            placeholder='Enter your number'
                            startIcon={<Image source={callIcon} />}
                            value={values.phonenumber}
                            onChangeText={handleChange('phonenumber')}
                            onBlur={handleBlur('phonenumber')}
                            touched={touched.phonenumber}
                            error={errors.phonenumber}
                        />

                        <Space direction='vertical' size={20} />
                        <MyTextInput
                            label='Password'
                            placeholder='Enter your password'
                            secureTextEntry={true}
                            startIcon={<LockOutLineIcon color={theme.palette.grey[theme.mode].main} size={24} />}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            touched={touched.password}
                            error={errors.password}
                        />

                    </View>



                    <Space direction='vertical' size={40} />
                    <SaveChangesButton
                        text='Sign In'
                        onPress={handleSubmit}
                        pending={serverState.isLoading}
                        disabled={serverState.isLoading || !isValid}
                    />
                    <Space direction='vertical' size={40} />

                    <Devider />

                </ScrollView>

            )}


        </Formik>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
        },
       
        otherOptions: {
            textAlign: 'center',
            ...text.regular.P14_Lh180,
            color: palette.grey[theme.mode].main,
        },
    })
}
