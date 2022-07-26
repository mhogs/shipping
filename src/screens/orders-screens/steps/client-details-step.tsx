import { View, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import { useAuthentication, useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { SimpleScreenHeader, Space } from '../../../components/util';
import { ScrollView } from 'react-native-gesture-handler';
import { MyTextAreaInput, MyTextInput } from '../../../components/inputs';
import { callIcon, locationIcon, ProfileIcon } from '../../../assets';
import { AuthActionButton } from '../../../components/buttons';
import { OrderSceneProps } from '../order-screen';
import * as yup from 'yup';
import { Formik } from 'formik';

const orderClientDetailsSchema = yup.object().shape({
  first_name: yup.string().required("phone is required").min(3, "first name must be at least 3 characters long !"),
  last_name: yup.string().required("phone is required").min(3, "last name must be at least 3 characters long !"),
  phonenumber: yup.string().required("phone is required").min(10, "phone must be at least 10 digits long !"),
});

export const ClientDetailsScene = (props: OrderSceneProps) => {
  const { moveForward, moveBackward, navigation } = props
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const { currentUser } = useAuthentication()

  return (
    <Formik
      initialValues={{
        first_name: currentUser?.first_name || "",
        last_name: currentUser?.last_name || "",
        phonenumber: currentUser?.phonenumber || "",
      }}
      onSubmit={values => {

      }}
      validationSchema={orderClientDetailsSchema}
      initialErrors={{ first_name: 'First name is required' }}
    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (

        <View style={styles.root} >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <StatusBar
              barStyle={"dark-content"}
              backgroundColor={theme.palette.white[theme.mode].main}
            />
            <SimpleScreenHeader
              title='Client details'
              goBack={moveBackward}
            />
            <Space direction='vertical' size={10} />
            <View style={{ flexGrow: 1 }} >
              <MyTextInput
                label='First Name'
                placeholder='Enter your first name'
                startIcon={<Image source={ProfileIcon} />}
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                touched={touched.first_name}
                error={errors.first_name}
                editable={false}
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
                editable={false}
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
                editable={false}
              />
            </View>
            <Space direction='vertical' size={30} />
            <View style={styles.actionContainer}>
              <AuthActionButton
                label='Continue'
                onClick={moveForward}
              />
            </View>
          </ScrollView>
        </View>
      )}

    </Formik>

  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      position: 'relative',
      paddingTop: 24,
      paddingHorizontal: 24,
      backgroundColor: palette.white[theme.mode][3],
    },
    actionContainer: {
      marginBottom: 20
    }
  })
}