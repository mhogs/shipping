import { View, Text, StatusBar, KeyboardAvoidingView, StyleSheet, Platform, Pressable, ImageBackground, Keyboard, ActivityIndicator } from 'react-native'
import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react'
import { useTheme } from "../../state/theming";
import { ThemeType } from "../../theme";
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




type VerificationScreenProps = NativeStackScreenProps<AuthStackParamList, 'VerificationScreen'>;
export const VerifficationScreen = (props: VerificationScreenProps) => {
  const { navigation, route } = props;
  const { phone, password } = route.params;
  const [code, setCode] = useState(NaN)



  const { theme } = useTheme();
  const styles = getStyles(theme);

  const { sendOTP, signIn, requestOTP, serverState } = useAuthentication()

  useEffect(() => {
    if (serverState.otp_confirmed)
      signIn({ phonenumber: phone, password: password })
  }, [serverState.otp_confirmed])

  if (serverState.isLoading) {
    return <LoadingView />
  }
  return (
    <>
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
              color={theme.palette.black[theme.mode].main}
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

        <OtpTextInput digits={6} onceFilled={(otp: number) => setCode(otp)} />


        <Space direction='vertical' size={40} />
        <SaveChangesButton
          text='Submit'
          onPress={() => sendOTP({ code: code, phone: phone })}
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
        {serverState.isLoading && <ActivityIndicator />}

      </KeyboardAvoidingView>

    </>

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
      color: palette.black[mode].main,
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
      color: palette.black[mode].main,
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
      color: palette.black[mode].main,
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
