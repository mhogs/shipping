import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon, PackageColored } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'


type TransactionItemProps = {
    icon?: any,
    title: string,
    date?: string,
    amount: number
    onPress?: () => void
}
export const TransactionItem = (props: TransactionItemProps) => {
    const { icon, title, date, amount, onPress } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.root}>
            <Pressable
                style={styles.pressable}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={styles.Concontainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.transactionConcontainer}>
                            {icon}
                        </View>
                        <View style={styles.transactionDetailsContainer}>
                            <Text style={styles.transactionTitle}>
                                {title}
                            </Text>
                            <Text style={styles.transactionDate}>
                                {date}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.transactionAmount}>
                        ${amount}
                    </Text>
                </View>
            </Pressable>
        </View>


    )
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
        Concontainer: {
            paddingVertical: 5,
            paddingHorizontal: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        transactionConcontainer: {
            padding: 13,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: palette.lightGrey[mode].main,
            borderRadius: 10,
        },
        transactionDetailsContainer: {
            marginLeft: 14,
            justifyContent: "space-around"
        },
        transactionTitle: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
        },
        transactionDate: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        },
        transactionAmount: {
            ...text.medium.P12_Lh180,
            color: palette.black[mode].main
        },

    })
}