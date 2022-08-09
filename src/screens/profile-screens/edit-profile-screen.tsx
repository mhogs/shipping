import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView, Platform } from 'react-native'
import { ChangeImageIcon, ColoredCallIcon, ColoredProfileIcon, ProfilePicture } from '../../assets'
import { SaveChangesButton } from '../../components/buttons'
import { CheckedIcon, LeftArrowIcon } from '../../components/icons'
import { MyTextInput } from '../../components/inputs'
import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik'
import { updateProfileRequestDataType } from '../../@types'
import { ProfileServices } from '../../services'
import { useMutation } from '@tanstack/react-query'
import * as yup from 'yup';
import { useAuthentication } from '../../state'
import { ChoosePhotoFromMediaLib } from '../../helpers'



const updateProfileSchema = yup.object().shape({
  first_name: yup.string().required("phone is required").min(3, "first name must be at least 3 characters long !"),
  last_name: yup.string().required("phone is required").min(3, "last name must be at least 3 characters long !"),
  phonenumber: yup.string().required("phone is required").min(10, "phone must be at least 10 digits long !"),
});

type EditProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

export const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const { currentUser, setCurrentUser } = useAuthentication()


  /** */
  const handlePickPhoto = async () => {
    const picture = await ChoosePhotoFromMediaLib()
    update_profile({ picture })
  };


  const { mutate: update_profile, isLoading: submiting } = useMutation(ProfileServices.updateProfile, {
    onSuccess: (data) => {
      setCurrentUser(prev => ({ ...prev, ...data }))
    },
    onError: (err: any) => {
    },
  })

  return (
    <Formik
      initialValues={{
        first_name: currentUser?.first_name || "",
        last_name: currentUser?.last_name || "",
        phonenumber: currentUser?.phonenumber || "",
      } as updateProfileRequestDataType}

      onSubmit={values => {
        update_profile(values)
      }
      }
      validationSchema={updateProfileSchema}
      initialErrors={{ first_name: 'First name is required' }}
    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView style={styles.root} >
            <View>
              <SimpleScreenHeader title="Edit Profile" goBack={goBack} />
              <View style={styles.profilePicWraper} >
                <Image source={{ uri: currentUser?.picture }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                <Pressable
                  style={{ position: "absolute", right: 20, top: -20 }}
                  onPress={handlePickPhoto}
                >
                  <Image source={ChangeImageIcon} />
                </Pressable>
              </View>

              <View style={styles.form} >
                <MyTextInput
                  label='First Name'
                  startIcon={<Image source={ColoredProfileIcon} />}
                  endIcon={<CheckedIcon color={theme.palette.success[theme.mode].main} />}
                  value={values.first_name}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  touched={touched.first_name}
                  error={errors.first_name}
                />
                <Space direction='vertical' size={20} />

                <MyTextInput
                  label='Last Name'
                  startIcon={<Image source={ColoredProfileIcon} />}
                  endIcon={<CheckedIcon color={theme.palette.success[theme.mode].main} />}
                  value={values.last_name}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  touched={touched.last_name}
                  error={errors.last_name}
                />
                <Space direction='vertical' size={20} />

                <MyTextInput
                  label='Phone Number'
                  startIcon={<Image source={ColoredCallIcon} />}
                  endIcon={<CheckedIcon color={theme.palette.success[theme.mode].main} />}
                  value={values.phonenumber}
                  onChangeText={handleChange('phonenumber')}
                  onBlur={handleBlur('phonenumber')}
                  touched={touched.phonenumber}
                  error={errors.phonenumber}
                />
              </View>
            </View>
            <Space direction='vertical' size={30} />

            <SaveChangesButton
              onPress={handleSubmit}
              text='Save Changes'
              pending={submiting}
              disabled={submiting || !isValid}
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