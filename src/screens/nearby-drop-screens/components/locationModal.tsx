import React from 'react'
import { Modal, Pressable, ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'
import { OrdersResponseDataType } from '../../../@types'
import { SaveChangesButton } from '../../../components/buttons'
import { DropLocationIcon, PickUpLocationIcon } from '../../../components/icons'
import { Devider, Space } from '../../../components/util'
import { ThemeType } from '../../../constants/theme'
import { useTheme } from '../../../state'

type LocationModalProps = {
    selectedOreder: OrdersResponseDataType | null
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrdersResponseDataType | null>>
}
export const LocationModal = (props: LocationModalProps) => {
    const { selectedOreder, setSelectedOrder } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={selectedOreder !== null}
            onRequestClose={() => { }}
        >
            <View
                style={styles.modalContainer}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setSelectedOrder(null)}
                >

                </Pressable>
                <ScrollView contentContainerStyle={{ flexGrow:1, backgroundColor: theme.palette.bg[theme.mode].main }}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIcon}>
                            {
                                selectedOreder?.state == "pending" ?
                                    <PickUpLocationIcon size={24} color={theme.palette.warning[theme.mode].main} />
                                    :
                                    <DropLocationIcon size={24} color={theme.palette.primary[theme.mode].main} />
                            }

                        </View>
                        <Space size={20} direction="vertical" />
                        <Text style={styles.modelContentTitle}>
                            {selectedOreder?.description}
                        </Text>
                        <Text style={styles.adressText}>
                            {
                                selectedOreder?.state == "pending" ?
                                    selectedOreder.pickup?.place :
                                    selectedOreder?.destination?.place
                            }
                        </Text>
                        <Devider spacing={15} />
                        <Text style={styles.phoneText} >
                            {selectedOreder?.creator_details?.phonenumber}
                        </Text>
                        <Devider spacing={15} />
                        <View style={{ alignSelf: "stretch", marginTop: 15 }}>
                            <SaveChangesButton text='Dial' onPress={() => { }} />
                            <Space direction='vertical' size={15} />
                            <SaveChangesButton
                                text='Direction'
                                onPress={() => { }}
                                bgColor={theme.palette.bg[theme.mode][2]}
                                textColor={theme.palette.text[theme.mode].main}
                                
                            />
                        </View>
                    </View>
                </ScrollView>

            </View>
        </Modal>

    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({

        modalContainer: {
            flex: 1,
        },
        modalContent: {
            padding: 24,
            height: "70%",
            alignItems: "center",
            backgroundColor: palette.bg[mode].main
        },
        modalOverlay: {
            height: "30%",
            backgroundColor: 'rgba(25, 29, 49, 0.3)',
        },

        modalIcon: {
            padding: 24,
            borderRadius: 18,
            backgroundColor: palette.bg[mode][2]
        },
        modelContentTitle: {
            ...text.medium.P18_Lh130,
            color: palette.text[mode].main
        },
        adressText: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main,
            textAlign: "center"
        },
        phoneText: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        }

    })
}