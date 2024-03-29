import React, { Fragment, useState } from "react"
import { Modal, Pressable, ScrollView,Image, View ,Text,StyleSheet} from "react-native"
import { MasterCardIcon, trackyBalanceIcon } from "../../../assets"
import { SaveChangesButton } from "../../../components/buttons"
import { PaymentMethodeCard } from "../../../components/content"
import { Space } from "../../../components/util"
import { useTheme } from "../../../state"
import { ThemeType } from "../../../constants/theme"


type PaymentMethodeModalProps = {
    visible: boolean
    closeModal: () => void
    onBtnPress?: () => void
}

const paymentMethodes = [
    {icon: trackyBalanceIcon, title:'Tracky Balance', subTitle: '$3.382.00'},
    {icon: MasterCardIcon, title:'Mastercard', subTitle: '5638 2742 9482 ****'}
]

export const OrderPaymentMethodeModal = (props: PaymentMethodeModalProps) => {
    const { visible, closeModal, onBtnPress } = props
    const { theme } = useTheme()
    const [methode, setMethode] = useState(0);
    const styles = React.useMemo(() => getStyles(theme), [theme])  
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
                                paymentMethodes.map((item, index) => (
                                    <Fragment key={index}>
                                        <PaymentMethodeCard id={index} icon={item.icon} title={item.title}  subTitle={item.subTitle}  selected={methode===index} onClick={setMethode}/>
                                        <Space direction="vertical" size={15} />
                                    </Fragment>
                                ))
                            }
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
