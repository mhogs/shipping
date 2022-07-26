import { View, StyleSheet, Image, StatusBar, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { SimpleScreenHeader, Space } from '../../../components/util';
import { ScrollView } from 'react-native-gesture-handler';
import { GooglePlacesInput, MyTextAreaInput, MyTextInput } from '../../../components/inputs';
import { callIcon, gpsIcon, locationIcon, ProfileIcon } from '../../../assets';
import { AuthActionButton } from '../../../components/buttons';
import { OrderSceneProps } from '../order-screen';
import { Formik } from 'formik';
import * as yup from 'yup';


const orderRouteShema = yup.object().shape({
    pickup: yup.string().required("this field is required"),
    destination: yup.string().required("this field is required"),
    details: yup.string(),
});

export const OrderRouteScene = (props: OrderSceneProps) => {
    const { moveForward, moveBackward, navigation } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <Formik
            initialValues={{
                pickup: null,
                destination: null,
                details: "",
            }}
            validationSchema={orderRouteShema}
            onSubmit={values => {

            }}
            initialErrors={{ pickup: 'First name is required' }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
                
                    <KeyboardAvoidingView style={styles.root} >
                        <StatusBar
                            barStyle={"dark-content"}
                            backgroundColor={theme.palette.white[theme.mode].main}
                        />
                        <SimpleScreenHeader
                            title='Order Route'
                            goBack={moveBackward}
                        />
                        <Space direction='vertical' size={10} />
                        <View style={{ flexGrow: 1 }} >

                            <GooglePlacesInput
                                label='Pickup Adress'
                                placeholder='where to pick from'
                                onChange={() => { }}
                                icon={<Image source={gpsIcon} />}
                            />
                            <Space direction='vertical' size={20} />
                            <MyTextAreaInput
                                label='Pickup Adress Details'
                                placeholder={'Type detailed location to make it easier for us to pick up the package'}
                                h={65}
                            />
                            <Space direction='vertical' size={20} />
                            <GooglePlacesInput
                                label='Drop Adress'
                                placeholder='where to pick from'
                                onChange={() => { }}
                                icon={<Image source={gpsIcon} />}
                            />
                            <Space direction='vertical' size={20} />
                            <MyTextAreaInput
                                label='Drop Adress Details'
                                placeholder={'Type detailed location to make it easier for us to drop the package'}
                                h={65}
                            />
                           

                        </View>
                        <Space direction='vertical' size={30} />
                        <View style={styles.actionContainer}>
                            <AuthActionButton
                                label='Continue'
                                onClick={moveForward}
                            />
                        </View>
                    </KeyboardAvoidingView>


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