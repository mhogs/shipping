import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { OrdersResponseDataType, orderStateType } from '../../@types'
import { MessageNotifIcon, PackageColored } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'
import * as Clipboard from 'expo-clipboard';
import { showsuccessToast } from '../../helpers'
import { isRTL, useTranslation } from '../../locales'
import { Space } from '../util'

type orderItemProps = OrdersResponseDataType & {
    onPress?: () => void
}

export const OrderHistoryItem = (props: orderItemProps) => {
    const { code, description, state, onPress } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme, isRTL()])
    const { t } = useTranslation("orders_history")
    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        showsuccessToast(`coppied`)
    };

    return (
        <View style={styles.root}>

            <View style={styles.orderContainer}>
                <View style={styles.info_wraper}>
                    <View style={styles.orderIconcontainer}>
                        <Image source={PackageColored} />
                    </View>
                    <Space size={14} />
                    <View style={styles.orderDetailsContainer}>
                        <Pressable
                            onPress={() => copyToClipboard(code as string)}
                            android_ripple={{ color: theme.palette.bg[theme.mode][2] }}
                        >
                            <Text style={styles.orderTitle}>
                                {code}
                            </Text>
                        </Pressable>

                        <Text style={styles.orderBrief}>
                            {description}
                        </Text>
                    </View>
                </View>

                <Text style={[styles.orderState, { color: getStateColor(theme, state) }]}>
                    {state && t(state)}
                </Text>
            </View>

        </View>


    )
}

function getStateColor(theme: ThemeType, state?: orderStateType) {
    switch (state) {
        case "delivered":
            return theme.palette.success[theme.mode].main
        case "on_progress":
            return theme.palette.primary[theme.mode].main
        case "pending":
            return theme.palette.warning[theme.mode].main
        default:
            return theme.palette.grey[theme.mode].main
    }
}

function getStyles(theme: ThemeType) {
    const { palette, mode, text } = theme

    return StyleSheet.create({
        root: {
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: palette.bg[mode][2]
        },
        pressable: {
            padding: 10,
        },
        orderContainer: {
            padding: 10,
            flexDirection: isRTL()? "row-reverse": "row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        info_wraper:{ 
            flexDirection: isRTL()? "row-reverse": "row",
        },
        orderIconcontainer: {
            padding: 13,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette.bg[mode][2],
            borderRadius: 10,
        },
        orderDetailsContainer: {
            justifyContent: "space-around"
        },
        orderTitle: {
            ...text.medium.P14_Lh130,
            color: palette.text[mode].main
        },
        orderBrief: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main,
            textAlign:isRTL()?"right":"left"
        },
        orderState: {
            ...text.regular.P12_Lh180,
            color: palette.grey[mode].main
        },

    })
}