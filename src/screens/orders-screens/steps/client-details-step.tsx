import { View, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import { useAuthentication, useTheme } from '../../../state';
import { ThemeType } from '../../../constants/theme';
import { SimpleScreenHeader, Space, WarningText } from '../../../components/util';
import { ScrollView } from 'react-native-gesture-handler';
import { MyTextAreaInput, MyTextInput } from '../../../components/inputs';
import { callIcon, locationIcon, ProfileIcon } from '../../../assets';
import { AuthActionButton, SaveChangesButton } from '../../../components/buttons';
import { OrderSceneProps } from '../order-screen';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../../../services';

const orderClientDetailsSchema = yup.object().shape({
  phonenumber: yup.string().required("phone is required").min(10, "phone must be at least 10 digits long !"),
});

export const ClientDetailsScene = (props: OrderSceneProps) => {
  const { moveForward, moveBackward, navigation, updateOrder,order } = props
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])  
  const { mutate: check_user, isLoading: submiting, isError } = useMutation(AuthService.CheckUser, {
    onSuccess: (data) => {
      updateOrder({ made_to: data.id })
      moveForward()
    },
    onError: (err: any) => {
    },
  })

  return (
    <Formik
      initialValues={{
        phonenumber: "",
      }}
      onSubmit={values => {
        check_user(values)
      }}
      validationSchema={orderClientDetailsSchema}
      initialErrors={{ phonenumber: 'this field is required' }}
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
                label='Phone Number'
                placeholder='Enter your number'
                startIcon={<Image source={callIcon} />}
                value={values.phonenumber}
                onChangeText={handleChange('phonenumber')}
                onBlur={handleBlur('phonenumber')}
                touched={touched.phonenumber}
                error={errors.phonenumber}

              />
              <Space direction='vertical' size={30} />
              {
                isError &&
                <WarningText
                  text={'Be sure that the the receiver has account with the above number'}
                  withIcon={true}
                />
              }
            </View>
            <Space direction='vertical' size={30} />
            <View style={styles.actionContainer}>
              <SaveChangesButton
                text='Continue'
                onPress={handleSubmit}
                disabled={submiting || !isValid}
                pending={submiting}
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
    },
    actionContainer: {
      marginBottom: 20
    }
  })
}