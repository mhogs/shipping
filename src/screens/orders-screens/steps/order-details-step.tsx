import { View, StyleSheet, StatusBar, Image, ScrollView, Text, Pressable } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { SimpleScreenHeader, Space, WarningText } from '../../../components/util';
import { MyTextInput } from '../../../components/inputs';
import { AuthActionButton } from '../../../components/buttons';
import { arrowDownIcon, cargoIcon, expressIcon, noteIcon, packageIcon, regularIcon } from '../../../assets';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ServiceItem } from '../../../components/content/service-item';
import { OrderSuccessfulModal, OrderPaymentMethodeModal, SelectServiceModal } from '../modals';


const services = [
    {
        icon:regularIcon, title:'Regular', description:'2 - 3 Days', price:'$10'
    },
    {
        icon:cargoIcon, title:'Cargo', description:'3 - 6 Days', price:'$24'
    },
    {
        icon:expressIcon, title:'Express', description:'1 - 2 Days', price:'$40'
    },
]


export const OrderDetailsScreen = ({ navigation, switchIndex }: any) => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    
    const [modals, setModals] = useState({ paymentMethodes: false, onPaymentSuccess: false, onSelectService:false });
    const [selectedService, setSelectedService] = useState<string|null>(null);
    

    const selectService = ()=>{
        setModals({ ...modals, onSelectService: true })
    }

    const payNow = ()=>{
        setModals({ ...modals, paymentMethodes: true })
    }

    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={theme.palette.white[theme.mode].main}
            />
            <BottomSheetModalProvider>
                <View style={styles.root} >
                    <SimpleScreenHeader
                        title='Order details'
                        goBack={() => switchIndex(0)}
                    />
                    <Space direction='vertical' size={35} />
                    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <View style={{flex:2}}>
                                <MyTextInput
                                    label='Package'
                                    placeholder='Enter Package Type'
                                    startIcon={<Image source={packageIcon} />}
                                />
                            </View>
                            <Space direction='horizontal' size={10} />
                            <View style={{flex:1}}>
                                <MyTextInput
                                    label='Weight'
                                    placeholder='0'
                                    endIcon={<Text style={styles.unit}>Kg</Text>}
                                    isNumeric={true}
                                />
                            </View>
                            
                        </View>
                        
                        <Space direction='vertical' size={20} />

                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.groupLabel}>Dimension</Text>
                        </View>
                        <View style={styles.inputGroup}>
                            <View style={{flex:1}}>
                                <MyTextInput
                                    placeholder='Length'
                                    endIcon={<Text style={styles.unit}>Cm</Text>}
                                    isNumeric={true}
                                />
                            </View>
                            <Space direction='horizontal' size={10} />
                            <View style={{flex:1}}>
                                <MyTextInput
                                    placeholder='Width'
                                    endIcon={<Text style={styles.unit}>Cm</Text>}
                                    isNumeric={true}
                                />
                            </View>
                            <Space direction='horizontal' size={10} />
                            <View style={{flex:1}}>
                                <MyTextInput
                                    placeholder='Height'
                                    endIcon={<Text style={styles.unit}>Cm</Text>}
                                    isNumeric={true}
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
                                value={selectedService? selectedService: undefined}
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
                    </ScrollView>
                    <View style={styles.actionContainer}>
                        <AuthActionButton 
                            label='Pay Now'
                            onClick={payNow}
                        />
                    </View>
                </View>

                
                
                <OrderSuccessfulModal 
                    visible={modals.onPaymentSuccess}
                    onBtnPress={()=>navigation.navigate('Home')}
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



            </BottomSheetModalProvider>
        </>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            position: 'relative',
            paddingTop:24,
            paddingHorizontal: 24,
            backgroundColor: palette.white[theme.mode][3],
        },
        actionContainer: {
            marginBottom:20
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
            paddingHorizontal:24,
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