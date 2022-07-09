
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { ChangeImageIcon, ColoredCallIcon, ColoredProfileIcon, lockIcon, ProfilePicture } from '../../assets'
import { SaveChangesButton } from '../../components/buttons'
import { CheckedIcon, EyeIcon, LeftArrowIcon, LockOutLineIcon } from '../../components/icons'
import { MyTextInput } from '../../components/inputs'
import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type ChangePasswordScreenProps = NativeStackScreenProps<ProfileStackParamList, 'ChangePasswordSetting'>;

export const ChangePasswordScreen = ({ navigation }: ChangePasswordScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const { login } = useAuth()
  useEffect(() => {
    //login()
  }, [])
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={styles.root} >
        <View>
          <SimpleScreenHeader title="Edit Profile" goBack={goBack} />

          <View style={styles.form} >
            <View>
              <MyTextInput
                label='Current Password'
                value='123456789'
                startIcon={<Image source={lockIcon} />}
                endIcon={<EyeIcon color={theme.palette.grey[theme.mode].main} />}
                endIconAction="TOGGLE_SECRET"
                secureTextEntry={true}
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
            />
            
            <Space direction='vertical' size={20} />

            <MyTextInput
              label='Confirm Password'
              placeholder='Confirm your password'
              startIcon={<LockOutLineIcon color={theme.palette.grey[theme.mode].main} size={24} />}
             
            />
          </View>
        </View>

       <SaveChangesButton text='Change Password' />
      </KeyboardAvoidingView>
    </ScrollView>



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
