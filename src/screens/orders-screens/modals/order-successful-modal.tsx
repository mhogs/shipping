import React from "react"
import { Modal, View, Text, StyleSheet, ImageBackground, Pressable } from "react-native"
import { useTheme } from '../../../state';
import { ThemeType } from '../../../constants/theme';
import { orderSuccessImage } from "../../../assets"
import { Space } from "../../../components/util";
import { SaveChangesButton } from "../../../components/buttons";


type OrderSuccessfulModalProps = {
    visible: boolean
    closeModal: () => void
    onBtnPress?: () => void
}
export const OrderSuccessfulModal = (props: OrderSuccessfulModalProps) => {
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
                    />
                    
                


                <View style={styles.modalContent}>
                    <ImageBackground source={orderSuccessImage} resizeMode="cover" style={styles.bg}>
                        <View style={styles.modalTopBa}></View>
                        <View>
                            <Text style={styles.headerText}>Register Successfully</Text>
                            <Space direction='vertical' size={10} />
                            <Text style={styles.subheaderText}>Congratulation! your account already created.
                                Please login to get amazing experience.
                            </Text>
                            <Space direction='vertical' size={30} />
                            <SaveChangesButton onPress={onBtnPress} text='Go to HomePage' />
                        </View>
                    </ImageBackground>
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
            justifyContent: "space-between"
        },
        modalContent: {
            position: 'relative',
            paddingHorizontal: 24,
            paddingVertical: 10,
            height: "70%",
            backgroundColor: palette.white[mode].main
        },
        modalTopBa: {
            width: 60,
            height: 6,
            position: 'absolute',
            zIndex: 10,
            top: 10,
            backgroundColor: palette.lightGrey[mode].main,
            borderRadius: 10,
            alignSelf: "center"
        },
        modalOverlay: {
            height: "30%",
            backgroundColor: 'rgba(25, 29, 49, 0.3)',
        },
        bg: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
        },
        headerText: {
            textAlign: 'center',
            ...text.heading.H1,
            color: palette.text[mode].main,
            marginBottom: 10,
        },
        subheaderText: {
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main,
            textAlign: "center",
            marginBottom: 10
        }

    })
}
