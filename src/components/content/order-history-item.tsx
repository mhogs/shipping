import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon, PackageColored } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'


export type orderStateType = "Pending" | "Delivred" | "On Progress"
type orderItemProps = {
    icon?: any,
    title: string,
    description?: string,
    state: orderStateType
    onPress?: () => void
}
export const OrderHistoryItem = (props: orderItemProps) => {
    const { icon, title, description, state, onPress } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.root}>
            <Pressable
                style={styles.pressable}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={styles.orderContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.orderIconcontainer}>
                            <Image source={PackageColored} />
                        </View>
                        <View style={styles.orderDetailsContainer}>
                            <Text style={styles.orderTitle}>
                                {title}
                            </Text>
                            <Text style={styles.orderBrief}>
                                {description}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.orderState, { color: getStateColor(theme, state) }]}>
                        {state}
                    </Text>
                </View>
            </Pressable>
        </View>


    )
}

function getStateColor(theme: ThemeType, state: orderStateType) {
    switch (state) {
        case 'Delivred':
            return theme.palette.success[theme.mode].main
        case "On Progress":
            return theme.palette.primary[theme.mode].main
        case 'Pending':
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
            borderColor: palette.lightGrey[mode].main
        },
        pressable: {
            padding: 10,
        },
        orderContainer: {
            paddingVertical: 5,
            paddingHorizontal: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        orderIconcontainer: {
            padding: 13,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette.lightGrey[mode].main,
            borderRadius: 10,
        },
        orderDetailsContainer: {
            marginLeft: 14,
            justifyContent: "space-around"
        },
        orderTitle: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
        },
        orderBrief: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        },
        orderState: {
            ...text.regular.P12_Lh180,
            color: palette.grey[mode].main
        },

    })
}