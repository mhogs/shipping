

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, KeyboardAvoidingView, Pressable, FlatList } from 'react-native'
import { dialogType } from '../../@types'
import { notification_asset, searchIcon } from '../../assets'
import { MessageItem } from '../../components/content'
import { SearchInput } from '../../components/inputs'
import { Badge, Devider, LoadingBlock, Space } from '../../components/util'
import { useDialogs, useRefreshOnFocus } from '../../hooks'
import { RootStackParamList } from '../../navigation/BottomNavigationBar'
import { MessagesStackParamList } from '../../navigation/MessagesStack'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { isRTL, useTranslation } from '../../locales'
import { ChatlIcon } from '../../components/icons'



type MessagesScreenProps = NativeStackScreenProps<MessagesStackParamList & RootStackParamList, 'Messages'>;

export const MessagesScreen = ({ navigation }: MessagesScreenProps) => {
  const { navigate } = navigation
  const {t} = useTranslation("messages")
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme,isRTL()])  

  const { dialogs, isLoading, loadMore, loading_more, refetch } = useDialogs()
  useRefreshOnFocus(refetch)

  const _renderItem = ({ item, index }: { item: dialogType, index: number }) => (
    <Fragment >
      <MessageItem {...item} onPress={() => navigate("MessageDetails", { sender: item.sender })} />

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

          <Text style={styles.logo_text}>{t("Messages")}</Text>

          <Pressable
            style={styles.message_wraper}
          >
            <View style={styles.message_icon}>
              <Badge top={-4} right={-4} height={10} width={10} >
                <Text style={styles.badgeText}> 3 </Text>
              </Badge>
              <ChatlIcon size={20} color={theme.palette.lightGrey[theme.mode].main} />
            </View>
          </Pressable>
        </View>

        {/**search box */}
        <Space size={20} direction="vertical" />
        <SearchInput
          startIcon={<Image source={searchIcon} />}
          placeholder={t('Search Messages')}
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
      backgroundColor: palette.bg[mode].main,
    },
    head: {
      backgroundColor: palette.primary["light"].main,
      padding: 24
    },
    title: {
      flexDirection: isRTL()?'row-reverse': 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo_wraper: {
      flexDirection: isRTL()?'row-reverse': 'row',
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
    badgeText:{
      fontSize:8,
      color:palette.lightGrey[mode].main
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


