import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'
import { ClockIcon, CloseIcon } from '../icons'

type OrderItemProps = {
    code: string
    onPress?: () => void,
    onDelete:()=>void
}
export const OrderItem = (props: OrderItemProps) => {
    const { code, onPress,onDelete } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <View
                style={styles.orderContainer}
            >
                <View style={{ borderRadius: 12, overflow: 'hidden', flex: 1 }}>
                    <Pressable
                        style={{ flexDirection: 'row', flex: 1, }}
                        android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
                        onPress={onPress}
                    >
                        <View style={styles.orderIconcontainer}>
                            <ClockIcon color={theme.palette.grey[theme.mode].main} size={24} />
                        </View>
                        <View style={styles.notificationDetailsContainer}>
                            <Text style={styles.orderCode}>
                                {code}
                            </Text>
                        </View>
                    </Pressable>
                </View>

                <Pressable
                    style={{ marginHorizontal: 6 }}
                    android_ripple={{ color: theme.palette.danger[theme.mode][3], borderless:true }}
                    onPress={onDelete}
                >
                    <CloseIcon color={theme.palette.grey[theme.mode].main} size={24} />
                </Pressable>

            </View>
        </View>

    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    var { height, width } = Dimensions.get('window');
    const iconWidth = 44
    const notifTimewidth = 40
    const marginH = 14
    return StyleSheet.create({

        orderContainer: {
            paddingVertical: 5,
            paddingHorizontal: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        orderIconcontainer: {
            width: iconWidth,
            height: iconWidth,
            borderRadius: iconWidth,
            justifyContent: 'center',
            alignItems: 'center'
        },
        notificationDetailsContainer: {
            justifyContent: "center",
            marginHorizontal: marginH,
            maxWidth: width - (marginH * 2 + iconWidth + notifTimewidth) - 10
        },
        orderCode: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
        },


    })
}

