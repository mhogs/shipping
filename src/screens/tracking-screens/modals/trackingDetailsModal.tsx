import React from "react"
import { Modal, Pressable, ScrollView, View, Image, Text, StyleSheet } from "react-native"
import { OrdersResponseDataType } from "../../../@types"
import { SaveChangesButton } from "../../../components/buttons"
import { AdresseItem, DriverItem } from "../../../components/content"
import { LocationIcon, MyLocationIcon } from "../../../components/icons"
import { Devider, ModalTopBarIndicator, Space } from "../../../components/util"
import { useTheme } from "../../../state"
import { ThemeType } from "../../../constants/theme"



type TrackingDetailsModalProps = {
    order:OrdersResponseDataType
    visible: boolean
    closeModal: () => void
    onBtnPress?: () => void
}
export const TrackingDetailsModal = (props: TrackingDetailsModalProps) => {
    const { visible, closeModal, onBtnPress,order } = props
    const { theme } = useTheme()
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
                        <View style={styles.deliveryDetails}>
                            <ModalTopBarIndicator />
                            <View >
                                <Text style={styles.deliverystateHeading}>
                                    Your Package on The Way
                                </Text>
                                <Text style={styles.deliverystateSubText}>
                                    Arriving at pick up point in 2 mins
                                </Text>
                            </View>

                            <Devider spacing={15} />

                            <DriverItem
                                picture='https://placeimg.com/140/140/any'
                                name='Loqman merd'
                                rating={4.5}
                            />
                            <Devider spacing={15} />
                            <ScrollView horizontal>
                                <View style={styles.packageInfocontainer}>
                                    <View>
                                        <Text style={styles.packageInfovalue}>{order.code}</Text>
                                        <Text style={styles.packageInfoLabel}>Track Number</Text>
                                    </View>
                                    <Space size={20} />
                                    <View>
                                        <Text style={styles.packageInfovalue}>2-4 hours</Text>
                                        <Text style={styles.packageInfoLabel}> Estimated Time</Text>
                                    </View>
                                    <Space size={20} />
                                    <View>
                                        <Text style={styles.packageInfovalue}>{order.package?.weight || "--"}</Text>
                                        <Text style={styles.packageInfoLabel}>Package Weight</Text>
                                    </View>
                                </View>
                            </ScrollView>

                            <Devider spacing={15} />
                            <View>
                                <AdresseItem
                                    startIcon={<MyLocationIcon color={theme.palette.warning[theme.mode].main} />}
                                    adress={order.pickup?.place || "?"}
                                />
                                <View style={styles.pathlink} />
                                <AdresseItem
                                    startIcon={<LocationIcon color={theme.palette.grey[theme.mode].main} />}
                                    adress={order.destination?.place || "?"}
                                />
                            </View>
                            <Space size={30} direction="vertical" />

                        </View>
                        <SaveChangesButton onPress={onBtnPress} text='Scan code' />
                    </ScrollView>
                </View>

            </View>
        </Modal>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({

        modalContainer: {
            flexGrow: 1,
        },
        modalOverlay: {
            height: "30%",
            backgroundColor: 'rgba(25, 29, 49, 0.1)',
        },
        modalContent: {
            height: "70%",
            backgroundColor: palette.white[mode].main,
            paddingHorizontal:24,
            paddingVertical:10,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
        },
        deliveryDetails: {
           
            backgroundColor: "white"
        },
        packageInfocontainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        packageInfoLabel: {
            ...text.regular.P12_Lh130,
            color: palette.grey[mode].main,
        },
        packageInfovalue: {
            ...text.medium.P14_Lh180,
            color: palette.text[mode].main,
        },
        deliverystateHeading: {
            ...text.heading.H2,
            color: palette.text[mode].main
        },
        deliverystateSubText: {
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main
        },
        pathlink: {
            height: 30,
            marginLeft: 11,
            marginVertical: 5,
            borderLeftWidth: 2,
            borderColor: palette.grey[mode].main,
            borderStyle: "dashed"
        },




    })
}
