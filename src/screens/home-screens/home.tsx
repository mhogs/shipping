import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, KeyboardAvoidingView, Pressable } from 'react-native'
import { checkRatesIcon, HelpCenterFeatureIcon, logo_asset, NearByFeatureIcon, notification_asset, OrderFeatureIcon, OtherFeatureIcon, scanIcon, searchIcon, WalletFeatureIcon } from '../../assets'
import { MyBalnce } from '../../components/content'
import { SearchInput } from '../../components/inputs'
import { Space } from '../../components/util'
import { listToMatrix } from '../../helpers'
import { RootStackParamList } from '../../navigation/BottomNavigationBar'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeStack'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
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
                        <View style={styles.logo_wraper}>
                            <Image source={logo_asset} />
                            <Text style={styles.logo_text}  >Tracky</Text>
                        </View>
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
                    {/** balance banner */}
                    <Space direction="vertical" size={30} />
                    <MyBalnce onTopUpPress={() => navigation.navigate("TopUp")}/>
                    {/**search box */}
                    <Space size={20} direction="vertical" />
                    <SearchInput
                        startIcon={<Image source={searchIcon} />}
                        placeholder='Enter track number'
                        placeholderTextColor={theme.palette.grey[theme.mode][3]}
                        onFocus={() => navigate("TrackingStack")}
                        endicon={<Image source={scanIcon} />}
                    />


                </View>
                <View style={styles.body} >
                    <Text style={styles.featuresText}>Features</Text>

                    {
                        listToMatrix(features, 3).map((row, row_index) => (
                            <Fragment key={row_index}>
                                <View style={styles.featuresWraper}>
                                    {
                                        row.map((feature: featureType) => (
                                            <Fragment key={feature.name}>
                                                <View style={styles.feature}>
                                                    <Pressable
                                                        style={styles.featurePressable}
                                                        onPress={() => navigate(feature.route)}
                                                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: false }}
                                                    >
                                                        <Image source={feature.icon} />
                                                        <Text style={styles.featureName}>{feature.name}</Text>
                                                    </Pressable>
                                                </View>
                                                <Space size={15} />
                                            </Fragment>
                                        ))
                                    }
                                </View>
                                <Space size={15} direction='vertical' />
                            </Fragment>
                        ))
                    }

                </View>
            </KeyboardAvoidingView>
        </>

    )
}

type featureType = {
    name: string,
    icon: any,
    route: keyof RootStackParamList
}
const features = [
    {
        name: 'CkeckRates',
        icon: checkRatesIcon,
        route: 'CheckRatesStack'
    },
    {
        name: 'Nearby Drop',
        icon: NearByFeatureIcon,
        route: 'NearbyDropStack'
    },
    {
        name: 'Order',
        icon: OrderFeatureIcon,
        route: 'OrdersStack'
    },
    {
        name: 'Help Center',
        icon: HelpCenterFeatureIcon,
        route: 'HelpCenterStack'
    },
    {
        name: 'Wallet',
        icon: WalletFeatureIcon,
        route: 'WalletStack'
    },
    {
        name: 'Others',
        icon: OtherFeatureIcon,
        route: 'HomeStack'
    },
]

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.bg[theme.mode].main,
        },
        head: {
            backgroundColor: palette.primary["light"].main,
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
      
      
       
        /** Body */
        body: {
            flex: 1,
            paddingTop: 30,
            paddingLeft: 24,
            paddingRight: 24
        },
        featuresText: {
            ...text.heading.H3,
            color: palette.text[mode].main,
            marginBottom: 20
        },
        featuresWraper: {
            flexDirection: "row",
            flexWrap: "wrap",
        },
        feature: {
            position: 'relative',
            flex: 1,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode][2],
            alignItems: 'center',
            borderRadius: 12
        },
        featurePressable: {
            paddingTop: 16,
            paddingBottom: 16,
            width: "100%",
            alignItems: 'center'
        },
        featureName: {
            ...text.medium.P12_Lh130,
            color: palette.text[mode].main,
            marginTop: 6
        }
    })
}


