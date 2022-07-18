import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'
import { PlusIcon, PlusSquareIcon } from '../icons'

type MyBalnceProps = {
    bgColor?: string;
    balanceColor?: string;
    topUpColor?: string;
}
export const MyBalnce = (props: MyBalnceProps) => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const {
        bgColor = theme.palette.white[theme.mode].main,
        balanceColor =theme.palette.black[theme.mode].main,
        topUpColor=theme.palette.primary[theme.mode].main,
    } = props


    return (

        < View style={[{ backgroundColor: bgColor },styles.balanceBaner ]} >
            <View>
                <Text style={styles.balancetitle}>My balance</Text>
                <Text style={[styles.balanceAmount, { color: balanceColor }]}>
                    $ 3.356.00
                </Text>
            </View>
            <View style={styles.addBalanceWraper}>
                <Text style={[styles.addBalanceText, { color: topUpColor }]}>Top up</Text>
                <View>
                    <PlusSquareIcon color={topUpColor} />
                </View>
            </View>
        </View >
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({

        /**balance fragment */
        balanceBaner: {
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderRadius: 12,

        },
        addBalanceWraper: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        balancetitle: {
            ...text.regular.P12_Lh180,
            color: palette.grey[mode].main
        },
        balanceAmount: {
            ...text.heading.H2,
        },
        addBalanceText: {
            ...text.medium.P12_Lh130,

            marginRight: 12
        },
    })
}