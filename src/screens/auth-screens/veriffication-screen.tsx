import { View, Text, StatusBar, KeyboardAvoidingView, StyleSheet, Platform, Pressable, ImageBackground, Keyboard } from 'react-native'
import React, {useMemo, useRef, useCallback} from 'react'
import { useTheme } from "../../state/theming";
import { ThemeType } from "../../theme";
import { LeftArrowIcon } from "../../components/icons";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { Space } from '../../components/util';
import { AuthActionButton } from '../../components/buttons';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { successGradient, successImage } from '../../assets';
import { OtpTextInput } from '../../components/inputs/OtpTextInput';




type VerificationScreenProps = NativeStackScreenProps<AuthStackParamList, 'VerificationScreen'>;
export const VerifficationScreen = (props: VerificationScreenProps) => {
    const { navigation, route } = props;
    const { phone } = route.params;

    const { theme } = useTheme();
    const styles = getStyles(theme);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '65%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    
    
    const submitOtp = () => {
        console.log('submitting otp');
        Keyboard.dismiss()
        handlePresentModalPress()
    }


    const resendOtp = () =>{
        console.log('resending otp');
    }


    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={theme.palette.white[theme.mode].main}
            />
            <BottomSheetModalProvider>
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
                    <View style={styles.otpContainer}>
                        <OtpTextInput value='5'/>
                        <OtpTextInput value='6'/>
                        <OtpTextInput value='8'/>
                        <OtpTextInput value='9'/>
                    </View>

                    <Space direction='vertical' size={40} />
                    <AuthActionButton 
                        label={'Submit'}
                        onClick={submitOtp}
                    />
                    <Space direction='vertical' size={15} />
                    <View style={styles.sendFailedContainer}>
                        <Text style={styles.description}>Didn’t receive the code?</Text>
                        <Space direction='horizontal' size={5} />
                        <Pressable
                            onPress={resendOtp}
                        >
                            <Text style={styles.resendText}>Resend</Text>
                        </Pressable>
                    </View>
                    
                </KeyboardAvoidingView>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={(backdropProps) => (
                        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={false} />
                    )}
                    >
                    <View style={styles.contentContainer}>
                        <ImageBackground source={successImage} resizeMode="cover" style={styles.bg}>
                            <ImageBackground source={successGradient} resizeMode="cover" style={styles.bg}>
                                <View>
                                    <Text style={styles.successText}>Register Successfully</Text>
                                    <Space direction='vertical' size={10} />
                                    <Text style={styles.successDesc}>Congratulation! your account already created.
                                        Please login to get amazing experience.
                                    </Text>
                                    <Space direction='vertical' size={30} />
                                    <AuthActionButton 
                                        label='Go to Homepage'
                                        onClick={()=> bottomSheetModalRef.current?.close()}
                                    />
                                </View>
                            </ImageBackground>
                        </ImageBackground>
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
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
        flexDirection:'row',
        ...text.regular.P14_Lh130,
        color: palette.grey[mode].main,
      },
      descriptionContainer:{
        flex:1,
        flexWrap:'wrap'
      },
      descriptionText: {
        ...text.regular.P14_Lh130,
        color: palette.grey[mode].main,
      },
      descriptionNumber: {
        ...text.medium.P14_Lh130,
        color: palette.black[mode].main,
      },
      otpContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
      },
      contentContainer: {
        flex: 1,
        paddingHorizontal:24,
        marginBottom: 47,
      },
      bg:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems: 'stretch',
      },
      successText:{
        ...text.heading.H1,
        color: palette.black[mode].main,
        textAlign:'center'
      },
      successDesc:{
        ...text.regular.P14_Lh130,
        color: palette.grey[mode].main,
        textAlign:'center'
      },
      sendFailedContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      resendText:{
        ...text.medium.P14_Lh130,
        color:palette.primary[theme.mode].main
      }
    });
};
  