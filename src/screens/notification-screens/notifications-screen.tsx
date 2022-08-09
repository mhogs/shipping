

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { DiscountIcon, MessageNotifIcon, PackageIcon } from '../../assets'

import { NotificationItem, useHideBottomBar } from '../../components/navigation'
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { NotificationsStackParamList } from '../../navigation/NotificationsStack'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'

type NotificationsScreenProps = NativeStackScreenProps<NotificationsStackParamList, 'Notifications'>;

export const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])  
  const [notifications, setNotifications] = useState(data)
  return (
    <View style={styles.root}>
      <SimpleScreenHeader title="Notifications" goBack={goBack} />
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{ flexGrow: 1 }}>
        <View >
          {/** head */}
          <View style={styles.head}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.headTitle}>
                Recent
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notifications.length}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setNotifications([])}
            >
              <Text style={styles.clearText}>
                Clear All
              </Text>
            </Pressable>
          </View>
          {/** body */}
          <View style={styles.body}>
            {
              notifications.map((notif, index) => (
                <Fragment key={index}>
                  <NotificationItem
                    icon={notif.icon}
                    title={notif.title}
                    description={notif.description}
                    time={notif.time}
                  />
                  <Devider />
                </Fragment>
              ))
            }

          </View>
        </View>
      </ScrollView>
    </View>




  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      padding: 24,
      backgroundColor: palette.bg[theme.mode].main,

    },
    head: {
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    body: {
      marginTop: 22
    },

    headTitle: {
      ...text.heading.H2,
      color: palette.text[mode].main
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

const data = [
  {
    icon: <Image source={PackageIcon}  />,
    title: "Kathryn Sent You a Message",
    description: 'Tap to see the message',
    time: "1 h ago",
  },
  {
    icon: <Image source={PackageIcon} />,
    title: "Your Shipping Already Delivered",
    description: 'Tap to  see the detail shipping',
    time: "1 h ago",
  },
  {
    icon: <Image source={DiscountIcon} />,
    title: "Get 20% Discount for First Transaction!",
    description: 'For all transaction without requirements',
    time: "1 h ago",
  },
  {
    icon: <Image source={PackageIcon}  />,
    title: "Kathryn Sent You a Message",
    description: 'Tap to see the message',
    time: "1 h ago",
  },
  {
    icon: <Image source={PackageIcon}  />,
    title: "Your Shipping Already Delivered",
    description: 'Tap to  see the detail shipping',
    time: "1 h ago",
  },
  {
    icon: <Image source={DiscountIcon} />,
    title: "Get 20% Discount for First Transaction!",
    description: 'For all transaction without requirements',
    time: "1 h ago",
  },
  {
    icon: <Image source={PackageIcon}  />,
    title: "Kathryn Sent You a Message",
    description: 'Tap to see the message',
    time: "1 h ago",
  },
  {
    icon: <Image source={PackageIcon}  />,
    title: "Your Shipping Already Delivered",
    description: 'Tap to  see the detail shipping',
    time: "1 h ago",
  },
  {
    icon: <Image source={DiscountIcon} />,
    title: "Get 20% Discount for First Transaction!",
    description: 'For all transaction without requirements',
    time: "1 h ago",
  },

]