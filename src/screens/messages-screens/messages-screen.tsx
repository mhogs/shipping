

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, {  Fragment } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, KeyboardAvoidingView, Pressable, FlatList } from 'react-native'
import {  dialogType } from '../../@types'
import {  notification_asset, searchIcon } from '../../assets'
import { MessageItem } from '../../components/content'
import { SearchInput } from '../../components/inputs'
import { Badge, Devider, LoadingBlock, Space } from '../../components/util'
import { RootStackParamList } from '../../navigation/BottomNavigationBar'
import { MessagesStackParamList } from '../../navigation/MessagesStack'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { useDialogs } from './useDialogs'



type MessagesScreenProps = NativeStackScreenProps<MessagesStackParamList & RootStackParamList, 'Messages'>;

export const MessagesScreen = ({ navigation }: MessagesScreenProps) => {
  const { navigate } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)

  const { dialogs, isLoading, loadMore, loading_more } = useDialogs()

  const _renderItem = ({ item, index }: { item: dialogType, index: number }) => (
    <Fragment >
      <MessageItem {...item} onPress={() => navigate("MessageDetails",{sender:item.sender})} />

      <Devider spacing={10} />
      {!loading_more && index >= dialogs.length - 1 &&
        <Space size={50} direction='vertical' />
      }
      {loading_more && index >= dialogs.length - 1 &&
        <LoadingBlock style={{ justifyContent: "flex-start" }} />
      }
    </Fragment>
  );






  return (


    <KeyboardAvoidingView style={styles.root}>
      <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
      <View style={styles.head} >
        {/** title */}
        <View style={styles.title}>

          <Text style={styles.logo_text}  >Messages</Text>

          <Pressable
            style={styles.message_wraper}
            onPress={() => navigate('NotificationsStack', { userId: "1" })}
          >
            <View style={styles.message_icon}>
              <Badge />
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
      <View style={styles.body}>
        {isLoading && <LoadingBlock style={{ height: 50 }} />}
        <FlatList
          data={dialogs}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={100}
          onEndReached={() => loadMore()}
        />
      </View>
    </KeyboardAvoidingView>


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



    /** Body */
    body: {
      flex: 1,
      paddingTop: 30,
      paddingLeft: 24,
      paddingRight: 24
    },

  })
}


