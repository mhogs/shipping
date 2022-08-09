import React from 'react'
import { Pressable, View, Image, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'
import { CircleIcon } from '../icons'

type PaymentCardProps = {
  selected?: boolean,
  id: number,
  icon?: any,
  title: string,
  subTitle?: string,
  onClick?: (index: number)=>void,
}
export const PaymentMethodeCard = (props: PaymentCardProps) => {
  const { selected = false, id, icon, title, subTitle, onClick=()=>{} } = props
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])  
  return (
    <View style={selected? styles.selectedaymentCardWraper:styles.notSelectedaymentCardWraper}>
      <Pressable
        style={styles.paymentCardPressable}
        onPress={()=>onClick(id)}
        android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
      >
        <View style={styles.paymentCardIconWraper}>
          <Image source={icon} />
        </View>
        <View style={styles.paymentCardDetails}>
          <Text style={styles.paymentCardName}>
            {title}
          </Text>
          <Text style={styles.paymentCardnumber}>
            {subTitle}
          </Text>
        </View>
        {selected &&
          <View style={{ alignSelf: "center" }}>
            <CircleIcon size={20} color={theme.palette.primary[theme.mode].main} />
          </View>
        }

      </Pressable>
    </View>
  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({

    /**card */
    selectedaymentCardWraper: {
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      borderColor: palette.primary[mode].main,
      borderWidth: 1
    },
    notSelectedaymentCardWraper: {
        width: "100%",
        borderRadius: 12,
        overflow: "hidden"
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
