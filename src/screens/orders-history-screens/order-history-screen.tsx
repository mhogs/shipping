




import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, Fragment } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view'
import { scanIcon, searchIcon } from '../../assets'
import { FilterIcon } from '../../components/icons'
import { SearchInput } from '../../components/inputs'
import { Space } from '../../components/util'
import { OrdersHistoryStackParamList } from '../../navigation/OrderHistoryStack'
import { useAuthentication } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { OrdersListScene } from './components/orders-list-scene'
import { useRefreshOnFocus } from '../../hooks'
import { Formik, useFormik } from 'formik'
import { MyTabView } from '../../components/navigation'
import { useTranslation } from 'react-i18next'
import { isRTL } from '../../locales'

type OrderHistoryScreenProps = NativeStackScreenProps<OrdersHistoryStackParamList, 'MyOrders'>;

export const OrderHistoryScreen = ({ navigation }: OrderHistoryScreenProps) => {

  const { theme } = useTheme()
  const {t} = useTranslation("orders_history")
  

  const styles = React.useMemo(() => getStyles(theme), [theme])  
  const { currentUser } = useAuthentication()
  const { values, handleChange } = useFormik({
    initialValues: {
      search: ""
    },
    onSubmit: () => { }
  })


  const TabRoutes = [
    { key: "from_me", title: t("From Me") },
    { key: "to_me", title: t("To Me") },
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
        return <OrdersListScene filter={{ creator: currentUser?.id,search:values.search }} />;
      case 'to_me':
        return <OrdersListScene filter={{ made_to: currentUser?.id,search:values.search }} />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root}>
      <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
      <View style={styles.head} >
        {/** title */}
        <View style={styles.title}>

          <Text style={styles.title_text}  >{t("My Orders")}</Text>

          <Pressable
            style={styles.filterIconContainer}
          >
            <FilterIcon color={theme.palette.white[theme.mode].main} />
          </Pressable>
        </View>

        {/** search box */}
        <Space size={20} direction="vertical" />
        <SearchInput
          startIcon={<Image source={searchIcon} />}
          placeholder={t('Search Orders')}
          placeholderTextColor={theme.palette.grey[theme.mode][3]}
          endicon={<Image source={scanIcon} />}
          value={values.search}
          onChangeText={handleChange("search")}
        />
      </View>
      <View style={styles.body}>
        <MyTabView enabledSwip={false} tabRoutes={TabRoutes} sceneRendrer={renderScene} />
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
      backgroundColor: palette.primary[mode].main,
      padding: 24
    },
    title: {
      flexDirection: isRTL()?"row-reverse":'row',
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

