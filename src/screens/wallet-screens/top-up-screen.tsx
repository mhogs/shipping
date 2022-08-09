

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, ScrollView, TextInput, Modal } from 'react-native'
import { AddIconcolored, CargoIconColored, sucessfulPaymentImage } from '../../assets'
import { SaveChangesButton } from '../../components/buttons'
import { MyBalnce, PaymentCard, TransactionItem } from '../../components/content'
import { Arrowdown, PlusIcon } from '../../components/icons'

import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { RootStackParamList } from '../../navigation/BottomNavigationBar'
import { WalletStackParamList } from '../../navigation/WalletStack'


import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { PaymentMethodeModal, OperationSuccessfulModal } from '../../components/modals'

type TopUpScreenProps = NativeStackScreenProps<WalletStackParamList & RootStackParamList, 'TopUp'>;

export const TopUpScreen = ({ navigation }: TopUpScreenProps) => {
    const [modals, setModals] = useState({ paymentMethodes: false, onPaymentSuccess: false });
    useHideBottomBar(navigation, 2)
    const { goBack } = navigation
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])
    const [paymentCompleted, setPaymentCompleted] = useState(false)

    return (
        <KeyboardAvoidingView style={styles.root} >
            <SimpleScreenHeader title="Wallet" goBack={goBack} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
                <View >
                    {/** head */}
                    <MyBalnce
                        bgColor={theme.palette.primary[theme.mode].main}
                        balanceColor={theme.palette.white[theme.mode].main}
                        titleColor={theme.palette.lightGrey[theme.mode].main}
                        topUpColor={theme.palette.white[theme.mode].main}
                        rippleColor={theme.palette.primary[theme.mode][3]}
                    />
                    <View style={styles.sectionHeader} >
                        <Text style={styles.sectionHeaderText}>
                            Top up Balance
                        </Text>
                        <Text style={styles.sectionBubHeaderText}>
                            Enter the Amount then choose a payment method to continue.
                        </Text>
                    </View>
                    {/** select payment methode  */}
                    <View style={styles.amountWraper}>
                        <Text style={styles.currency}>
                            $
                        </Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder='Amount'
                            placeholderTextColor={theme.palette.grey[theme.mode].main}
                        />
                    </View>
                    <Space direction='vertical' size={20} />
                    <View style={styles.methodeSelector}>
                        <Pressable
                            style={styles.methodeSelectorPressable}
                            android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
                            onPress={() => setModals({ ...modals, paymentMethodes: true })}
                        >
                            <Text style={styles.methodeSelectorText}>
                                Select payment method
                            </Text>
                            <Arrowdown color={theme.palette.grey[theme.mode].main} />
                        </Pressable>
                    </View>
                </View>

                <PaymentMethodeModal
                    visible={modals.paymentMethodes}
                    closeModal={() => setModals({ ...modals, paymentMethodes: false })}
                    onBtnPress={() => setModals({ ...modals, onPaymentSuccess: true })}
                />
                <OperationSuccessfulModal
                    title='Payment Successful'
                    visible={modals.onPaymentSuccess}
                    closeModal={() => setModals({ ...modals, onPaymentSuccess: false })}
                    image={sucessfulPaymentImage}

                />

            </ScrollView>


        </KeyboardAvoidingView>
    )
}





const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            padding: 24,
            backgroundColor: palette.bg[mode].main,
        },
        sectionHeader: {
            marginTop: 30,
            marginBottom: 20,
        },
        sectionHeaderText: {
            ...text.heading.H3,
            color: palette.text[mode].main,
            marginBottom: 4
        },
        sectionBubHeaderText: {
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main
        },
        amountWraper: {
            flexDirection: "row",
            alignItems: 'center',
            borderRadius: 12,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: palette.bg[mode][2],
        },
        currency: {
            ...text.medium.P14_Lh130,
            color: palette.grey[mode].main,
            paddingHorizontal: 10
        },
        amountInput: {
            padding: 12,
            flexGrow: 1,
            backgroundColor: palette.bg[mode][2]
        },
        methodeSelector: {
            borderWidth: 1,
            borderColor: palette.lightGrey[mode].main,
            borderRadius: 12,
            overflow: "hidden"
        },
        methodeSelectorPressable: {
            padding: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        methodeSelectorText: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        },
        /**modal */
        modalContainer: {
            flex: 1,
        },
        modalContent: {
            paddingHorizontal: 24,
            paddingVertical: 10,
            height: "50%",
            backgroundColor: palette.white[mode].main
        },
        modalTopBa: {
            width: 60,
            height: 6,
            backgroundColor: palette.lightGrey[mode].main,
            borderRadius: 10,
            marginBottom: 30,
            alignSelf: "center"
        },
        ModalHeaderText: {
            ...text.heading.H2,
            color: palette.text[mode].main,
            marginBottom: 20
        },
        modalOverlay: {
            height: "50%",
            backgroundColor: 'rgba(25, 29, 49, 0.3)',
        },
        addPaymentMethodeButton: {
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: palette.lightGrey[mode].main
        },
        addPaymentMethodePressable: {
            paddingVertical: 11,
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
        },
        addPaymentMethodeButtonText: {
            ...text.medium.P14_Lh130,
            color: palette.text[mode].main,
            marginLeft: 14
        }



    })
}

