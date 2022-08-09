import React from 'react'
import { Pressable, View, Image, Text, StyleSheet } from 'react-native'
import { MasterCardIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'
import { CircleIcon } from '../icons'

type PaymentCardProps = {
  selected?: boolean
}
export const PaymentCard = (props: PaymentCardProps) => {
  const { selected = false } = props
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme, selected), [theme])
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
        {
          <View style={{ alignSelf: "center" }}>
            <CircleIcon
              size={20}
              color={selected ? theme.palette.primary[theme.mode].main : theme.palette.bg[theme.mode][2]} />
          </View>
        }

      </Pressable>
    </View>
  )
}

const getStyles = (theme: ThemeType, selected: boolean) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({

    /**card */
    paymentCardWraper: {
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      borderColor: selected ? palette.primary[mode].main : palette.bg[mode][2],
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
      justifyContent: "space-around",
      flexGrow: 1
    },
    paymentCardName: {
      ...text.medium.P14_Lh130,
      color: palette.text[mode].main,
    },
    paymentCardnumber: {
      ...text.regular.P14_Lh180,
      color: palette.grey[mode].main,
    },


  })
}
