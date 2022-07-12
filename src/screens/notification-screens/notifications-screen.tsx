

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { DiscountIcon, MessageNotifIcon, PackageIcon } from '../../assets'

import { NotificationItem, useHideBottomBar } from '../../components/navigation'
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { NotificationsStackParamList } from '../../navigation/NotificationsStack'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type NotificationsScreenProps = NativeStackScreenProps<NotificationsStackParamList, 'Notifications'>;

export const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <View style={styles.root}>
        <SimpleScreenHeader title="Notifications" goBack={goBack} />
        {/** head */}
        <View style={styles.head}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headTitle}>
              Recent
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <Pressable>
            <Text style={styles.clearText}>
              Clear All
            </Text>
          </Pressable>
        </View>
        {/** body */}
        <View style={styles.body}>
          <NotificationItem
            icon={<Image source={MessageNotifIcon} width={22} height={22} />}
            title="Kathryn Sent You a Message"
            description='Tap to see the message'
            time="2 min ago"
          />
          <Devider />
          <NotificationItem
            icon={<Image source={PackageIcon} width={22} height={22} />}
            title="Your Shipping Already Delivered"
            description='Tap to  see the detail shipping'
            time="5 min ago"
          />
          <Devider />
          <NotificationItem
            icon={<Image source={DiscountIcon} width={22} height={22} />}
            title="Get 20% Discount for First Transaction!"
            description='For all transaction without requirements'
            time="1 h ago"
          />
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
    head: {
      marginTop: 30,
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    body: {
      marginTop: 22
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