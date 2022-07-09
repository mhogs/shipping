import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { ChangeImageIcon, ColoredCallIcon, ColoredProfileIcon, ProfilePicture } from '../../assets'
import { SaveChangesButton } from '../../components/buttons'
import { CheckedIcon, LeftArrowIcon } from '../../components/icons'
import { MyTextInput } from '../../components/inputs'
import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type EditProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
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
          <View style={styles.profilePicWraper} >
            <Image source={ProfilePicture} style={{ width: 100, height: 100 }} />
            <Pressable style={{ position: "absolute", right: 20, top: -20 }}>
              <Image source={ChangeImageIcon} />
            </Pressable>
          </View>
          
          <View style={styles.form} >
            <MyTextInput
              label='Full Name'
              value='Talha Hemza'
              startIcon={<Image source={ColoredProfileIcon} />}
              endIcon={<CheckedIcon color={theme.palette.success[theme.mode].main} />}
            />
            <Space direction='vertical' size={20} />

            <MyTextInput
              label='Phone Number'
              value='0799085706'
              startIcon={<Image source={ColoredCallIcon} />}
              endIcon={<CheckedIcon color={theme.palette.success[theme.mode].main} />}
            />
          </View>
        </View>

        <SaveChangesButton text='Save Changes' />
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
    profilePicWraper: {
      position: "relative",
      marginTop: 30,
      width: '100%',
      alignItems: 'center',
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