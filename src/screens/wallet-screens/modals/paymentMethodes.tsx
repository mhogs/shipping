import React, { Fragment } from "react"
import { Modal, Pressable, ScrollView,Image, View ,Text,StyleSheet} from "react-native"
import { AddIconcolored } from "../../../assets"
import { SaveChangesButton } from "../../../components/buttons"
import { PaymentCard } from "../../../components/content"
import { Space } from "../../../components/util"
import { useTheme } from "../../../state"
import { ThemeType } from "../../../theme"


type PaymentMethodeModalProps = {
    visible: boolean
    closeModal: () => void
    onBtnPress?: () => void
}

export const PaymentMethodeModal = (props: PaymentMethodeModalProps) => {
    const { visible, closeModal, onBtnPress } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.modalContainer}>
                <Pressable
                    style={styles.modalOverlay}
                    onPress={closeModal}
                >
                </Pressable>

                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }} showsVerticalScrollIndicator={false}  >
                        <View>
                            <View style={styles.modalTopBa} />
                            <Text style={styles.ModalHeaderText}>
                                Payment Method
                            </Text>

                            {
                                Array(1).fill("").map((_, index) => (
                                    <Fragment key={index}>
                                        <PaymentCard selected />
                                        <Space direction="vertical" size={15} />
                                    </Fragment>
                                ))
                            }
                            <View style={styles.addPaymentMethodeButton}>
                                <Pressable
                                    style={styles.addPaymentMethodePressable}
                                    android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
                                >
                                    <Image source={AddIconcolored} />
                                    <Text style={styles.addPaymentMethodeButtonText}>
                                        Add New Payment Method
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <SaveChangesButton onPress={onBtnPress} text='Confirm Payment' />
                    </ScrollView>
                </View>


            </View>
        </Modal>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
      
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
            color: palette.black[mode].main,
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
            color: palette.black[mode].main,
            marginLeft: 14
        }



    })
}
