

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, Fragment, useEffect } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, TextInput, KeyboardAvoidingView, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { add_squar_icon_asset, avatar_asset, checkRatesIcon, HelpCenterFeatureIcon, logo_asset, NearByFeatureIcon, notification_asset, OrderFeatureIcon, OtherFeatureIcon, scanIcon, searchIcon, WalletFeatureIcon } from '../../assets'
import { MessageItem } from '../../components/content'
import { SearchInput } from '../../components/inputs'
import { Devider, Space } from '../../components/util'
import { WEB_SOCKET_SERVER } from '../../constants'
import { listToMatrix, showsuccessToast } from '../../helpers'
import { RootStackParamList } from '../../navigation/BottomNavigationBar'
import { MessagesStackParamList } from '../../navigation/MessagesStack'
import { useAuthentication } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { useMessages } from './useMessages'


type MessagesScreenProps = NativeStackScreenProps<MessagesStackParamList & RootStackParamList, 'Messages'>;

export const MessagesScreen = ({ navigation }: MessagesScreenProps) => {
  const { navigate } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const { currentUser } = useAuthentication()
  //const { data: messages, isLoading, error } = useMessages()
  useEffect(() => {
    if (currentUser) {
      const ws = new WebSocket(`${WEB_SOCKET_SERVER}?token=${currentUser?.access}`);

      ws.onopen = () => {
        console.log("connected ........");
        ws.send('something'); // send a message
      };
      ws.onerror = () => {
        console.log("can not connect  ........");
      }
    }

  })
  return (
    <>
      <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
      <KeyboardAvoidingView style={styles.root}>
        <View style={styles.head} >
          {/** title */}
          <View style={styles.title}>

            <Text style={styles.logo_text}  >Messages</Text>

            <Pressable
              style={styles.message_wraper}
              onPress={() => navigate('NotificationsStack', { userId: "1" })}
            >
              <View style={styles.message_icon}>
                <View style={styles.message_indicator} />
                <Image source={notification_asset} />
              </View>
            </Pressable>
          </View>

          {/**search box */}
          <Space size={20} direction="vertical" />
          <SearchInput
            startIcon={<Image source={searchIcon} />}
            placeholder='Search Messages'
            placeholderTextColor={theme.palette.grey[theme.mode][3]}
          />


        </View>
        <ScrollView>
          <View style={styles.body} >
            {/*messages &&
              messages.map((message, index) => (
                <Fragment key={index}>
                  <MessageItem {...message} onPress={() => navigate("MessageDetails")} />
                  <Devider spacing={15} />
                </Fragment>
              ))
              */}
            {/*isLoading && <ActivityIndicator size="large" color={theme.palette.primary[theme.mode].main} />*/}
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
    message_wraper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 44,
      height: 44,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
    message_icon: {
      position: 'relative',
    },
    message_indicator: {
      position: 'absolute',
      width: 8,
      height: 8,
      borderRadius: 5,
      backgroundColor: palette.danger[mode].main,
      top: 2,
      right: 2,
      zIndex: 1
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


