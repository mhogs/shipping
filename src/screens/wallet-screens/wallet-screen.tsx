

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, ScrollView } from 'react-native'
import { CargoIconColored } from '../../assets'
import { MyBalnce, PaymentCard, TransactionItem } from '../../components/content'
import { PlusIcon } from '../../components/icons'

import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { NotificationsStackParamList } from '../../navigation/NotificationsStack'

import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type WalletScreenProps = NativeStackScreenProps<NotificationsStackParamList, 'Notifications'>;

export const WalletScreen = ({ navigation }: WalletScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 2)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.root}>
        <SimpleScreenHeader title="Wallet" goBack={goBack} />
        {/** head */}
        <MyBalnce
          bgColor={theme.palette.primary[theme.mode].main}
          balanceColor={theme.palette.white[theme.mode].main}
          topUpColor={theme.palette.white[theme.mode].main}
        />
        <View style={styles.paymentMethodesHeader}>
          <Text style={styles.sectionHeaderText}>
            Payment Methode
          </Text>
          <Pressable android_ripple={{ color: theme.palette.grey[theme.mode][3] }}>
            <PlusIcon color={theme.palette.primary[theme.mode].main} />
          </Pressable>
        </View>
        <PaymentCard />
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionHeaderText}>
            Transaction History
          </Text>

          {Array(4).fill(0).map((_, index) => (
            <Fragment key={index}>
              <TransactionItem
                icon={<Image source={CargoIconColored} />}
                title="Drop Off Payment"
                date='Mar 18, 2022'
                amount={25}
              />
              <Space size={15} direction="vertical" />
            </Fragment>

          ))}
        </View>
      </View>
    </ScrollView>



  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      padding: 24,
      backgroundColor: palette.lightGrey[theme.mode][3],

    },
    paymentMethodesHeader: {
      marginTop: 30,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between'
    },
    sectionHeaderText: {
      ...text.heading.H3,
      color: palette.black[mode].main,
      marginBottom: 20
    },
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

    transactionsSection: {
      marginTop: 30
    }
  })
}

