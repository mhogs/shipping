

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, Fragment } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, TextInput, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native'
import { add_squar_icon_asset, avatar_asset, checkRatesIcon, HelpCenterFeatureIcon, logo_asset, NearByFeatureIcon, notification_asset, OrderFeatureIcon, OtherFeatureIcon, scanIcon, searchIcon, WalletFeatureIcon } from '../../assets'
import { MessageItem } from '../../components/content'
import { SearchInput } from '../../components/inputs'
import { Devider, Space } from '../../components/util'
import { listToMatrix } from '../../helpers'
import { RootStackParamList } from '../../navigation/BottomNavigationBar'
import { MessagesStackParamList } from '../../navigation/MessagesStack'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'


type MessagesScreenProps = NativeStackScreenProps<MessagesStackParamList & RootStackParamList, 'Messages'>;

export const MessagesScreen = ({ navigation }: MessagesScreenProps) => {
  const { navigate } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (
    <>
      <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
      <KeyboardAvoidingView style={styles.root}>
        <View style={styles.head} >
          {/** title */}
          <View style={styles.title}>

            <Text style={styles.logo_text}  >Messages</Text>

            <Pressable
              style={styles.notification_wraper}
              onPress={() => navigate('NotificationsStack', { userId: "1" })}
            >
              <View style={styles.notification_icon}>
                <View style={styles.notification_indicator} />
                <Image source={notification_asset} />
              </View>
            </Pressable>
          </View>

          {/**search box */}
          <Space size={20} direction="vertical" />
          <SearchInput
            startIcon={<Image source={searchIcon} width={24} height={24} />}
            placeholder='Search Messages'
            placeholderTextColor={theme.palette.grey[theme.mode][3]}
          />


        </View>
        <ScrollView>
          <View style={styles.body} >
            {
              messages.map((message, index) => (
                <Fragment key={index}>
                  <MessageItem {...message} />
                  <Devider spacing={15} />
                </Fragment>
              ))
            }
          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </>

  )
}



const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.lightGrey[theme.mode][3],
    },
    head: {
      backgroundColor: palette.primary[theme.mode].main,
      padding: 24
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo_wraper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    logo_text: {
      ...text.heading.H1,
      color: palette.white[mode].main,
      marginLeft: 10
    },
    notification_wraper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 44,
      height: 44,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
    notification_icon: {
      position: 'relative',
    },
    notification_indicator: {
      position: 'absolute',
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: palette.danger[mode].main,
      top: 2,
      right: 2,
      zIndex: 1
    },
    /**balance fragment */
    balanceBaner: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 14,
      borderRadius: 12,
      backgroundColor: palette.white[mode].main
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
      color: palette.black[mode].main
    },
    addBalanceText: {
      ...text.medium.P12_Lh130,
      color: palette.primary[mode][2],
      marginRight: 12
    },
    /**search box fragment */
    searchBox: {
      marginTop: 20,
      backgroundColor: palette.primary[mode][2],
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      alignItems: 'center',
      padding: 14,
    },
    searchInput: {
      flex: 1,
      paddingLeft: 14,
      color: palette.grey[mode][3]
    },
    /** Body */
    body: {
      flex: 1,
      paddingTop: 30,
      paddingLeft: 24,
      paddingRight: 24
    },

  })
}


const messages = [
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: "Hai Rizal, I'm on the way to your... ",
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: 'Hai Rizal, I m on the way to your... ',
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: 'Hai Rizal, I m on the way to your... ',
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: 'Hai Rizal, I m on the way to your... ',
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: "Hai Rizal, I'm on the way to your... ",
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: 'Hai Rizal, I m on the way to your... ',
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: 'Hai Rizal, I m on the way to your... ',
    time: "6:32 Pm",
  },
  {
    picture: <Image source={avatar_asset} width={22} height={22} />,
    fullName: "Kathryn Murphy",
    messageText: 'Hai Rizal, I m on the way to your... ',
    time: "6:32 Pm",
  }
]