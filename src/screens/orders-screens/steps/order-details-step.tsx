import { View, StyleSheet, StatusBar, Image, ScrollView, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { SimpleScreenHeader, Space, WarningText } from '../../../components/util';
import { MyTextInput } from '../../../components/inputs';
import { AuthActionButton, SaveChangesButton } from '../../../components/buttons';
import { arrowDownIcon, cargoIcon, expressIcon, noteIcon, packageIcon, regularIcon } from '../../../assets';
import { OrderSuccessfulModal, OrderPaymentMethodeModal, SelectServiceModal } from '../modals';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../../../navigation/OrdersStack';
import { OrderSceneProps } from '../order-screen';
import { Formik } from 'formik';
import { PackageType, ServiceType } from '../../../@types';




export const OrderDetailsScene = (props: OrderSceneProps) => {
    const { moveForward, moveBackward, navigation, updateOrder } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const [modals, setModals] = useState({ paymentMethodes: false, onPaymentSuccess: false, onSelectService: false });
    const [selectedService, setSelectedService] = useState<ServiceType>(null);


    const selectService = () => {
        setModals({ ...modals, onSelectService: true })
    }

    const payNow = () => {
        setModals({ ...modals, paymentMethodes: true })
    }

    return (
        <Formik
            initialValues={{
                name: "",
                weight: "",
                width: "",
                length: "",
                height: "",
            }}
            /*validationSchema={orderRouteShema}*/
            onSubmit={values => {
                updateOrder({
                    package: {
                        ...values,
                        weight: Number(values.weight),
                        width: Number(values.width),
                        length: Number(values.length),
                        height: Number(values.height)
                    },
                    service: selectedService?.id
                })
                moveForward()
            }}
        /*initialErrors={{ pickup: 'this field is required' }}*/
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (

                <View style={styles.root} >
                    <StatusBar
                        barStyle={"dark-content"}
                        backgroundColor={theme.palette.white[theme.mode].main}
                    />
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <SimpleScreenHeader
                            title='Order details'
                            goBack={moveBackward}
                        />
                        <Space direction='vertical' size={10} />
                        <View style={{ flex: 1 }} >
                            <View style={styles.inputGroup}>
                                <View style={{ flex: 2 }}>
                                    <MyTextInput
                                        label='Package'
                                        placeholder='Enter Package Type'
                                        startIcon={<Image source={packageIcon} />}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        touched={touched.name}
                                        error={errors.name}
                                    />
                                </View>
                                <Space direction='horizontal' size={10} />
                                <View style={{ flex: 1 }}>
                                    <MyTextInput
                                        label='Weight'
                                        placeholder='0'
                                        endIcon={<Text style={styles.unit}>Kg</Text>}
                                        isNumeric={true}
                                        value={values.weight}
                                        onChangeText={handleChange('weight')}
                                        onBlur={handleBlur('weight')}
                                        touched={touched.weight}
                                        error={errors.weight}
                                    />
                                </View>

                            </View>

                            <Space direction='vertical' size={20} />

                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.groupLabel}>Dimension</Text>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={{ flex: 1 }}>
                                    <MyTextInput
                                        placeholder='Length'
                                        endIcon={<Text style={styles.unit}>Cm</Text>}
                                        isNumeric={true}
                                        value={values.length}
                                        onChangeText={handleChange('length')}
                                        onBlur={handleBlur('length')}
                                        touched={touched.length}
                                        error={errors.length}
                                    />
                                </View>
                                <Space direction='horizontal' size={10} />
                                <View style={{ flex: 1 }}>
                                    <MyTextInput
                                        placeholder='Width'
                                        endIcon={<Text style={styles.unit}>Cm</Text>}
                                        isNumeric={true}
                                        value={values.width}
                                        onChangeText={handleChange('width')}
                                        onBlur={handleBlur('width')}
                                        touched={touched.width}
                                        error={errors.width}
                                    />
                                </View>
                                <Space direction='horizontal' size={10} />
                                <View style={{ flex: 1 }}>
                                    <MyTextInput
                                        placeholder='Height'
                                        endIcon={<Text style={styles.unit}>Cm</Text>}
                                        isNumeric={true}
                                        value={values.height}
                                        onChangeText={handleChange('height')}
                                        onBlur={handleBlur('height')}
                                        touched={touched.height}
                                        error={errors.height}
                                    />
                                </View>
                            </View>
                            <Space direction='vertical' size={20} />
                            <Pressable
                                onPress={selectService}
                            >
                                <MyTextInput
                                    label='Services'
                                    placeholder='Select Services'
                                    value={selectedService ? selectedService : undefined}
                                    onChangeText={handleChange('service')}
                                    onBlur={handleBlur('service')}
                                    touched={touched.service}
                                    error={errors.service}
                                    editable={false}
                                    startIcon={<Image source={noteIcon} />}
                                    endIcon={<Image source={arrowDownIcon} />}
                                />
                            </Pressable>
                            <Space direction='vertical' size={20} />

                            <WarningText
                                text={'Weight discrepancies will incur additional fees or the goods will be returned'}
                                withIcon={true}
                            />
                        </View>
                        <View style={styles.actionContainer}>
                            <SaveChangesButton
                                text='Save Order'
                                onPress={handleSubmit}
                                disabled={!isValid}
                            />
                        </View>
                    </ScrollView>
                    <OrderSuccessfulModal
                        visible={modals.onPaymentSuccess}
                        onBtnPress={() => navigation.navigate('Home')}
                        closeModal={() => setModals({ ...modals, onPaymentSuccess: false })}
                    />
                    <OrderPaymentMethodeModal
                        visible={modals.paymentMethodes}
                        closeModal={() => setModals({ ...modals, paymentMethodes: false })}
                        onBtnPress={() => setModals({ ...modals, onPaymentSuccess: true })}
                    />

                    <SelectServiceModal
                        visible={modals.onSelectService}
                        closeModal={() => setModals({ ...modals, onSelectService: false })}
                        selectService={setSelectedService}
                    />
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
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'row'
        },
        groupLabel: {
            ...text.medium.P16_Lh180,
            color: palette.black[mode].main
        },
        unit: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: 24,
            marginBottom: 47,
        },
        selectServiceTitle: {
            ...text.medium.P18_Lh180,
            color: palette.black[mode].main
        },
        servicesListe: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
    })
}