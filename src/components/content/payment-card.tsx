import React from 'react'
import { Pressable, View, Image, Text, StyleSheet } from 'react-native'
import { MasterCardIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'

export const PaymentCard = () => {

    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.paymentCardWraper}>
            <Pressable
                style={styles.paymentCardPressable}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={styles.paymentCardIconWraper}>
                    <Image source={MasterCardIcon} />
                </View>
                <View style={styles.paymentCardDetails}>
                    <Text style={styles.paymentCardName}>
                        Mastercard
                    </Text>
                    <Text style={styles.paymentCardnumber}>
                        5638 **** **** ****
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
     
      /**card */
      paymentCardWraper: {
        borderRadius: 12,
        overflow: "hidden",
        borderColor: palette.primary[mode].main,
        borderWidth: 1
      },
      paymentCardPressable: {
        padding: 10,
        flexDirection: 'row',
      },
      paymentCardIconWraper: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: palette.lightGrey[mode].main,
        borderRadius: 10,
        marginRight: 14
      },
      paymentCardDetails: {
        justifyContent: "space-around"
      },
      paymentCardName: {
        ...text.medium.P14_Lh130,
        color: palette.black[mode].main,
      },
      paymentCardnumber: {
        ...text.regular.P14_Lh180,
        color: palette.grey[mode].main,
      },
  
      
    })
  }
  