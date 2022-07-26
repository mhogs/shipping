




import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, Fragment } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view'
import { scanIcon, searchIcon } from '../../assets'
import { FilterIcon } from '../../components/icons'
import { SearchInput } from '../../components/inputs'
import { MyTabView, Space } from '../../components/util'
import { OrdersHistoryStackParamList } from '../../navigation/OrderHistoryStack'
import { useAuthentication } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { OrdersListScene } from './orders-list-scene'
import { useOrdersHistory } from './useOrdersHistory'
import { useRefreshOnFocus } from '../../hooks'

type OrderHistoryScreenProps = NativeStackScreenProps<OrdersHistoryStackParamList, 'MyOrders'>;

export const OrderHistoryScreen = ({ navigation }: OrderHistoryScreenProps) => {
  const { navigate } = navigation
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const { currentUser } = useAuthentication()
  const { data: orders, isLoading, refetch } = useOrdersHistory()
  useRefreshOnFocus(refetch)
  const TabRoutes = [
    { key: "from_me", title: "From Me" },
    { key: "to_me", title: "To Me" },
  ]
  const renderScene = (props: SceneRendererProps & {
    route: {
      key: string;
      title: string;
    };
  }) => {
    const { route } = props;

    switch (route.key) {
      case 'from_me':
        return <OrdersListScene loading={isLoading} orders={orders?.filter(order => order.creator === currentUser?.id)} />;
      case 'to_me':
        return <OrdersListScene loading={isLoading} orders={orders?.filter(order => order.made_to === currentUser?.id)} />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
      <KeyboardAvoidingView style={styles.root}>
        <View style={styles.head} >
          {/** title */}
          <View style={styles.title}>

            <Text style={styles.title_text}  >My Orders</Text>

            <Pressable
              style={styles.filterIconContainer}
            >
              <FilterIcon color={theme.palette.white[theme.mode].main} />
            </Pressable>
          </View>

          {/**search box */}
          <Space size={20} direction="vertical" />
          <SearchInput
            startIcon={<Image source={searchIcon} />}
            placeholder='Search Messages'
            placeholderTextColor={theme.palette.grey[theme.mode][3]}
            endicon={<Image source={scanIcon} />}
          />


        </View>

        <View style={styles.body}>
          <MyTabView enabledSwip={false} tabRoutes={TabRoutes} sceneRendrer={renderScene} />
        </View>


      </KeyboardAvoidingView>
    </Fragment>

  )
}



const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: palette.white[mode].main,
    },
    head: {
      backgroundColor: palette.primary[mode].main,
      padding: 24
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    title_text: {
      ...text.heading.H1,
      color: palette.white[mode].main,
      marginLeft: 10
    },
    filterIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 44,
      height: 44,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },

    /** Body */
    body: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 24
    },

  })
}

