import { View, StyleSheet, StatusBar, Image, ScrollView, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useAuthentication, useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { SimpleScreenHeader, Space, WarningText } from '../../../components/util';
import { MyTextInput } from '../../../components/inputs';
import { SaveChangesButton } from '../../../components/buttons';
import { arrowDownIcon, noteIcon, packageIcon, regularIcon } from '../../../assets';
import { OrderSuccessfulModal, OrderPaymentMethodeModal, SelectServiceModal } from '../modals';
import { OrderSceneProps } from '../order-screen';
import { Formik, validateYupSchema } from 'formik';
import { ServiceType } from '../../../@types';
import * as yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { OrdersServices } from '../../../services';


const orderPackageDetails = yup.object().shape({
    name: yup.string().required("package Type required").min(2, "package type must be at least 2 characters long !"),
    weight: yup.string(),
    width: yup.string(),
    length: yup.string(),
    height: yup.string(),
    service: yup.object().required("please select service"),
});




export const OrderDetailsScene = (props: OrderSceneProps) => {
    const { moveForward, moveBackward, navigation, updateOrder, order } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const { currentUser } = useAuthentication()
    const [modals, setModals] = useState({ paymentMethodes: false, onPaymentSuccess: false, onSelectService: false });
    const { mutate: saveOrder, isLoading: submeting_order } = useMutation(OrdersServices.createOrder, {
        onSuccess: (data) => {
            updateOrder(data)
        },
        onError: (err: any) => { }
    })
    const { data: services,  isLoading:loading_services } = useQuery<ServiceType[], Error>(['services'], OrdersServices.fetchServices,{retry: 1})


    return (
        <Formik
            initialValues={{
                name: order?.package?.name || "",
                weight: (order?.package?.weight || "").toString(),
                width: (order?.package?.width || "").toString(),
                length: (order?.package?.length || "").toString(),
                height: (order?.package?.height || "").toString(),
                service: services?.filter(ser=>ser.id===order?.service).pop() || null 
            }}

            validationSchema={orderPackageDetails}
            onSubmit={values => {
                const { service, ...the_package } = values;
                saveOrder && saveOrder(
                    {
                        ...order,
                        creator: currentUser?.id,
                        package: {
                            name: the_package.name,
                            weight: Number(the_package.weight),
                            width: Number(the_package.width),
                            length: Number(the_package.length),
                            height: Number(the_package.height)
                        },
                        service: service?.id
                    }
                )
                moveForward()
            }}
            initialErrors={{ name: 'this field is required' }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue, setTouched }) => (

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
                                onPress={() => {
                                    setModals({ ...modals, onSelectService: true })
                                    setTouched({ ...touched, service: true })
                                }}
                            >
                                <MyTextInput
                                    label='Services'
                                    placeholder='Select Services'
                                    value={values.service?.name}
                                    onChangeText={handleChange('service')}
                                    onBlur={handleBlur('service')}
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
                                disabled={submeting_order || !isValid}
                                pending={submeting_order}
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
                        selectService={(service: ServiceType) => setFieldValue("service", service)}
                        services={services}
                        isLoading={loading_services}
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