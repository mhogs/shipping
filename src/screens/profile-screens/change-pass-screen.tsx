
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { ChangeImageIcon, ColoredCallIcon, ColoredProfileIcon, lockIcon, ProfilePicture } from '../../assets'
import { SaveChangesButton } from '../../components/buttons'
import { CheckedIcon, EyeIcon, LeftArrowIcon, LockOutLineIcon } from '../../components/icons'
import { MyTextInput } from '../../components/inputs'
import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { AuthService, ProfileServices } from '../../services'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import * as yup from 'yup';
import { Formik } from 'formik'
import { changePasswordRequestType } from '../../@types'

const changePasswordSchema = yup.object().shape({
  current_password: yup.string().required("password is required").min(8, "phone must be at least 8 characters long !"),
  new_password: yup.string().required("password is required").min(8, "phone must be at least 8 characters long !"),
  re_new_password: yup.string().required("password is required").min(8, "phone must be at least 8 characters long !").oneOf([yup.ref('new_password'), ""], 'Passwords must match'),
});



type ChangePasswordScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ChangePasswordSetting'>;

export const ChangePasswordScreen = ({ navigation }: ChangePasswordScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const { mutate: change_password, isLoading: submiting } = useMutation(ProfileServices.changePassword, {
    onSuccess: (data) => {
    },
    onError: (err: any) => {
    },
  })
  return (
    <Formik
      initialValues={{
        current_password: "",
        new_password: "",
        re_new_password: "",
      } as changePasswordRequestType}
      onSubmit={
        values => change_password(values)
      }
      validationSchema={changePasswordSchema}
      initialErrors={{ current_password: 'Current password is required' }}
    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView style={styles.root} >
            <View>
              <SimpleScreenHeader title="Edit Profile" goBack={goBack} />

              <View style={styles.form} >
                <View>
                  <MyTextInput
                    label='Current Password'
                    startIcon={<Image source={lockIcon} />}
                    endIcon={<EyeIcon color={theme.palette.grey[theme.mode].main} />}
                    endIconAction="TOGGLE_SECRET"
                    secureTextEntry={true}
                    value={values.current_password}
                    onChangeText={handleChange('current_password')}
                    onBlur={handleBlur('current_password')}
                    touched={touched.current_password}
                    error={errors.current_password}
                  />
                  <Text style={styles.forgetText}>
                    Forgot Password
                  </Text>
                </View>
                <Space direction='vertical' size={30} />


                <MyTextInput
                  label='New Password'
                  placeholder='New password'
                  startIcon={<LockOutLineIcon color={theme.palette.grey[theme.mode].main} size={24} />}
                  endIcon={<EyeIcon color={theme.palette.grey[theme.mode].main} />}
                  endIconAction="TOGGLE_SECRET"
                  secureTextEntry={true}
                  value={values.new_password}
                  onChangeText={handleChange('new_password')}
                  onBlur={handleBlur('new_password')}
                  touched={touched.new_password}
                  error={errors.new_password}
                />

                <Space direction='vertical' size={20} />

                <MyTextInput
                  label='Confirm Password'
                  placeholder='Confirm your password'
                  startIcon={<LockOutLineIcon color={theme.palette.grey[theme.mode].main} size={24} />}
                  endIcon={<EyeIcon color={theme.palette.grey[theme.mode].main} />}
                  endIconAction="TOGGLE_SECRET"
                  secureTextEntry={true}
                  value={values.re_new_password}
                  onChangeText={handleChange('re_new_password')}
                  onBlur={handleBlur('re_new_password')}
                  touched={touched.re_new_password}
                  error={errors.re_new_password}
                />
                <Space direction='vertical' size={30} />
              </View>
            </View>

            <SaveChangesButton
              text='Change Password'
              disabled={submiting || !isValid}
              pending={submiting}
              onPress={handleSubmit}
            />
          </KeyboardAvoidingView>
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
      padding: 24,
      backgroundColor: palette.lightGrey[theme.mode][3],
      justifyContent: 'space-between',

    },
    forgetText: {
      ...text.regular.P14_Lh180,
      color: palette.grey[mode].main,
      marginTop: 15,
      alignSelf: "flex-end"
    },
    form: {
      marginTop: 30,
    },
    saveButtonWraper: {
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: palette.primary[mode].main,

    },
    savebutton: {
      padding: 17.5,
      width: '100%',
      alignItems: 'center'
    },
    saveButtonText: {
      ...text.medium.P16_Lh180,
      color: palette.white[mode].main
    }


  })
}

