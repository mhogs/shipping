import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { DiscountIcon, EmptyOrderHistory, MessageNotifIcon, PackageIcon } from '../../assets'
import { OrderItem } from '../../components/content/order-item'

import { NotificationItem, useHideBottomBar } from '../../components/navigation'
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { NotificationsStackParamList } from '../../navigation/NotificationsStack'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { TrackingStackParamList } from '../../navigation/TrackingStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type NotificationsScreenProps = NativeStackScreenProps<TrackingStackParamList, 'Tracking'>;

export const TrackingScreen = ({ navigation }: NotificationsScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [orders, setOrders] = useState(ordersHistory)
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.root}>
        <SimpleScreenHeader title="Notifications" goBack={goBack} />
        {/** head */}
        <View style={styles.head}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headTitle}>
              Tracking History
            </Text>
          </View>
          <Pressable>
            <Text style={styles.clearText}>
              Delete All
            </Text>
          </Pressable>
        </View>
        {/** body */}
        <View style={styles.body}>
          {
            orders.map((order, index) => (
              <Fragment key={index}>
                <OrderItem code={order.code} onDelete={() => setOrders(orders.filter((_, i) => i != index))} />
                <Devider spacing={15} />
              </Fragment>
            ))
          }
          {
            !orders?.length &&
            <View style={styles.emptyResultsContainer}>
              <View style={styles.emptyResultsImgWraper}>
                <Image source={EmptyOrderHistory} />
              </View>
              <Text style={styles.EmptyOrderText}>
                You Have No History  Yet
              </Text>
              <Text style={styles.EmptyOrderDescription}>
                When tracking history appear, you will
                see them here
              </Text>
            </View>
          }


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
      backgroundColor: palette.white[theme.mode].main,

    },
    head: {
      marginTop: 30,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    body: {
      marginTop: 22,
      flex: 1
    },
    emptyResultsContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    emptyResultsImgWraper: {
      padding: 46,
      backgroundColor: palette.lightGrey[mode][3],
      borderRadius: 100
    },
    EmptyOrderText: {
      marginTop: 50,
      textAlign: 'center',
      ...text.heading.H2,
      color: palette.black[mode].main
    },
    EmptyOrderDescription: {
      marginTop: 10,
      textAlign: 'center',
      ...text.regular.P14_Lh180,
      color: palette.grey[mode].main
    },

    headTitle: {
      ...text.heading.H2,
      color: palette.black[mode].main
    },
    clearText: {
      ...text.regular.P14_Lh180,
      color: palette.danger[mode].main
    },

    badge: {
      marginLeft: 8,
      paddingHorizontal: 6,
      paddingVertical: 1.5,
      backgroundColor: palette.danger[mode].main,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: "700",
      fontFamily: 'Outfit_500Medium',
      color: palette.white[mode].main
    },

  })
}

const ordersHistory = [
  { code: "JT840284924F" },
  { code: "208384243617" },
  { code: "XDH2456369AD" },

]