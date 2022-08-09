import { View, Text, StatusBar, KeyboardAvoidingView, StyleSheet, Platform, Pressable, ImageBackground, Keyboard, ActivityIndicator } from 'react-native'
import React, { useMemo, useRef, useCallback, useState, useEffect, Fragment } from 'react'
import { useTheme } from "../../state/theming";
import { ThemeType } from "../../constants/theme";
import { LeftArrowIcon } from "../../components/icons";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { LoadingView, Space } from '../../components/util';
import { AuthActionButton, SaveChangesButton } from '../../components/buttons';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { successGradient, successImage } from '../../assets';
import { OtpTextInput } from '../../components/inputs/OtpTextInput';
import { useAuthentication } from '../../state';
import { OperationSuccessfulModal } from '../../components/modals';
import { Formik } from 'formik';
import * as yup from 'yup';

const SignupSchema = yup.object().shape({
  code: yup.string().required("phone is required").min(6, "Otp code must be six characters long !").max(6, "Otp code must be six characters long !"),
});


type VerificationScreenProps = NativeStackScreenProps<AuthStackParamList, 'VerificationScreen'>;
export const VerifficationScreen = (props: VerificationScreenProps) => {
  const { navigation, route } = props;
  const { phone, password } = route.params;



  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { sendOTP, signIn, requestOTP, serverState } = useAuthentication()

  useEffect(() => {
    if (serverState.otp_confirmed)
      signIn({ phonenumber: phone, password: password })
  }, [serverState.otp_confirmed])


  return (
    <Formik
      initialValues={{
        code: NaN,
      }}

      onSubmit={values => {
        sendOTP({ code: values.code, phone: phone })
      }}
      validationSchema={SignupSchema}
      initialErrors={{ code: 'code is required' }}
    >
      {({ handleChange, handleBlur, handleSubmit, values,setFieldValue, errors, touched, isValid }) => (
        <Fragment>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={theme.palette.white[theme.mode].main}
          />

          <KeyboardAvoidingView style={styles.root}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.header}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.back_wraper}
              >
                <LeftArrowIcon
                  size={24}
                  color={theme.palette.text[theme.mode].main}
                />
              </Pressable>
            </View>
            <Space direction='vertical' size={20} />
            <Text style={styles.title}>Verification Code</Text>
            <Space direction='vertical' size={10} />
            <View style={styles.description}>
              <Text style={styles.descriptionContainer}>
                <View>
                  <Text style={styles.descriptionText}>We have sent the code verification to your number </Text>
                </View>
                <View>
                  <Text style={styles.descriptionNumber}>{phone}</Text>
                </View>
              </Text>
            </View>

            <Space direction='vertical' size={30} />

            <OtpTextInput digits={6} onceFilled={(otp: number) => setFieldValue("code",otp)} />


            <Space direction='vertical' size={40} />
            <SaveChangesButton
              text='Submit'
              onPress={handleSubmit}
              pending={serverState.isLoading}
              disabled={serverState.isLoading || !isValid}
            />
            <Space direction='vertical' size={15} />
            <View style={styles.sendFailedContainer}>
              <Text style={styles.description}>Didn't receive the code?</Text>
              <Space direction='horizontal' size={5} />
              <Pressable
                onPress={() => requestOTP({ phone: phone })}
              >
                <Text style={styles.resendText}>Resend</Text>
              </Pressable>
            </View>


          </KeyboardAvoidingView>
        </Fragment>
      )}



    </Formik>






  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme;
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.white[theme.mode].main,
      paddingLeft: 24,
      paddingRight: 24,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 30,
    },
    back_wraper: {
      justifyContent: "center",
      alignItems: "center",
      width: 46,
      height: 46,
      borderRadius: 46,
      borderWidth: 1,
      borderColor: palette.grey[theme.mode][3],
    },
    back_arrow: {
      width: 23,
      height: 23,
    },
    title: {
      ...text.heading.H2,
      color: palette.text[mode].main,
    },
    description: {
      flexDirection: 'row',
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main,
    },
    descriptionContainer: {
      flex: 1,
      flexWrap: 'wrap'
    },
    descriptionText: {
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main,
    },
    descriptionNumber: {
      ...text.medium.P14_Lh130,
      color: palette.text[mode].main,
    },

    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 47,
    },
    bg: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
    },
    successText: {
      ...text.heading.H1,
      color: palette.text[mode].main,
      textAlign: 'center'
    },
    successDesc: {
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main,
      textAlign: 'center'
    },
    sendFailedContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    resendText: {
      ...text.medium.P14_Lh130,
      color: palette.primary[theme.mode].main
    }
  });
};
