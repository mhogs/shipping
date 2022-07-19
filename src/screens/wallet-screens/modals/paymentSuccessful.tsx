import React from "react"
import { Modal, Pressable, ScrollView, View, Image, Text, StyleSheet } from "react-native"
import { sucessfulPaymentImage } from "../../../assets"
import { SaveChangesButton } from "../../../components/buttons"
import { useTheme } from "../../../state"
import { ThemeType } from "../../../theme"


type PaymentSuccessfulModalProps = {
    visible: boolean
    closeModal: () => void
    onBtnPress?: () => void
}
export const PaymentSuccessfulModal = (props: PaymentSuccessfulModalProps) => {
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
                    <ScrollView contentContainerStyle={styles.modalContainer} showsVerticalScrollIndicator={false}  >
                        <View>
                            <View style={styles.modalTopBa} />
                            <View style={{ alignItems: "center", }}>
                                <Image source={sucessfulPaymentImage} />
                                <Text style={styles.headerText}>
                                    Top Up Successfully
                                </Text>
                                <Text style={styles.subheaderText}>
                                    Congratulation! your balance already added,
                                    and please check your balance.
                                </Text>
                            </View>
                        </View>

                        <SaveChangesButton onPress={onBtnPress} text='Go to Home' />
                    </ScrollView>
                </View>


            </View>
        </Modal>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({

        root: { flex: 1 },
        modalContainer: {
            flexGrow: 1,
            justifyContent:"space-between"
        },
        modalContent: {
            paddingHorizontal: 24,
            paddingVertical: 10,
            height: "70%",
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
            height: "30%",
            backgroundColor: 'rgba(25, 29, 49, 0.3)',
        },


        headerText: {
            ...text.heading.H1,
            color: palette.black[mode].main,
            marginBottom: 10,
        },
        subheaderText: {
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main,
            textAlign:"center",
            marginBottom:10
        }

    })
}
