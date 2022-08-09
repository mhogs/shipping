import { View, StyleSheet, Image, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../state/theming'
import { ThemeType } from '../../../constants/theme'
import { MyTextInput } from '../../../components/inputs'
import { LoadingView, Space } from '../../../components/util'
import { ProfileIcon, callIcon, googleIcon, appleIcon } from '../../../assets'
import { LockOutLineIcon } from '../../../components/icons'
import { AuthActionButton, SaveChangesButton, SocialLoginButton } from '../../../components/buttons'
import { Devider } from '../../../components/util/Devider'
import { AuthScreenProps } from '../../../navigation/AuthStack'
import { useAuthentication } from '../../../state'
import { SignUpRequestDataType } from '../../../@types'
import { Formik } from 'formik'
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
    first_name: yup.string().required("phone is required").min(3, "first name must be at least 3 characters long !"),
    last_name: yup.string().required("phone is required").min(3, "last name must be at least 3 characters long !"),
    phonenumber: yup.string().required("phone is required").min(10, "phone must be at least 10 digits long !"),
    password: yup.string().required("password is required").min(8, "password must be at least 8 characters long"),
});

export const RegisterScene = (props: AuthScreenProps) => {
    const { navigation } = props;
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    const { signUp, serverState } = useAuthentication()
    const [params, setParams] = useState({ phone: "", password: "" })

    /** go to otp confirm screen when recieving sms */
    useEffect(() => {
        if (serverState.otp_recieved && params.phone && params.password)
            navigation.navigate("VerificationScreen", { phone: params.phone, password: params.password })
    }, [serverState.otp_recieved])



    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                phonenumber: "",
                password: ""
            } as SignUpRequestDataType}

            onSubmit={values => {
                signUp(values)
                setParams({ phone: values.phonenumber, password: values.password })
            }}
            validationSchema={SignupSchema}
            initialErrors={ { first_name: 'First name is required' }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
                    <View >

                        <MyTextInput
                            label='First Name'
                            placeholder='Enter your first name'
                            startIcon={<Image source={ProfileIcon} />}
                            value={values.first_name}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            touched={touched.first_name}
                            error={errors.first_name}
                        />
                        <Space direction='vertical' size={20} />
                        <MyTextInput
                            label='Last Name'
                            placeholder='Enter your last name'
                            startIcon={<Image source={ProfileIcon} />}
                            value={values.last_name}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            touched={touched.last_name}
                            error={errors.last_name}
                        />
                        <Space direction='vertical' size={20} />
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
                        text='Create Account'
                        onPress={handleSubmit}
                        pending={serverState.isLoading}
                        disabled={serverState.isLoading || !isValid }
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
