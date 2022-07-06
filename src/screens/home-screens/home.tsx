import React, { FC } from 'react'
import { View, StyleSheet, Image, StatusBar, Text, TextInput, KeyboardAvoidingView, Pressable } from 'react-native'
import { add_squar_icon_asset, checkRatesIcon, logo_asset, notification_asset, scanIcon, searchIcon } from '../../assets'
import { Space } from '../../components/util'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

export const HomeScreen = () => {
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
                            <Image width={28} height={28} source={logo_asset} />
                            <Text style={styles.logo_text}  >Tracky</Text>
                        </View>
                        <View style={styles.notification_wraper}>
                            <View style={styles.notification_icon}>
                                <View style={styles.notification_indicator} />
                                <Image source={notification_asset} />
                            </View>
                        </View>
                    </View>
                    {/** balance banner */}
                    <View style={styles.balanceBaner}>
                        <View>
                            <Text style={styles.balancetitle}>My balance</Text>
                            <Text style={styles.balanceAmount}>$ 3.356.00</Text>
                        </View>
                        <View style={styles.addBalanceWraper}>
                            <Text style={styles.addBalanceText}>Top up</Text>
                            <View>
                                <Image width={24} height={24} source={add_squar_icon_asset} />
                            </View>
                        </View>
                    </View>
                    {/**search box */}
                    <View style={styles.searchBox}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={searchIcon} width={24} height={24} />
                            <TextInput
                                placeholder='Enter track number'
                                placeholderTextColor={theme.palette.grey[theme.mode][3]}
                                style={styles.searchInput}
                            />
                        </View>
                        <Image source={scanIcon} />
                    </View>

                </View>
                <View style={styles.body} >
                    <Text style={styles.featuresText}>Features</Text>
                    <View style={styles.featuresWraper}>
                        <Pressable style={styles.feature} >
                            <Image source={checkRatesIcon} width={24} height={24} />
                            <Text style={styles.featureName}>Check Rates</Text>
                        </Pressable>
                        <Space size={15} />
                        <Pressable style={styles.feature} >
                            <Image source={checkRatesIcon} width={24} height={24} />
                            <Text style={styles.featureName}>Nearby Drop</Text>
                        </Pressable>
                        <Space size={15} />
                        <Pressable style={styles.feature} >
                            <Image source={checkRatesIcon} width={24} height={24} />
                            <Text style={styles.featureName}>Order</Text>
                        </Pressable>
                    </View>
                    <Space size={15} direction= 'vertical'/>
                    <View style={styles.featuresWraper}>
                        <Pressable style={styles.feature} >
                            <Image source={checkRatesIcon} width={24} height={24} />
                            <Text style={styles.featureName}>Help Center</Text>
                        </Pressable>
                        <Space size={15} />
                        <Pressable style={styles.feature} >
                            <Image source={checkRatesIcon} width={24} height={24} />
                            <Text style={styles.featureName}>Wallet</Text>
                        </Pressable>
                        <Space size={15} />
                        <Pressable style={styles.feature} >
                            <Image source={checkRatesIcon} width={24} height={24} />
                            <Text style={styles.featureName}>Others</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>

    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.white[theme.mode].main,
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
            marginLeft: 14,
            color: palette.grey[mode][3]
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
            color: palette.black[mode].main,
            marginBottom:20
        },
        featuresWraper: {
            flexDirection: "row",
            flexWrap: "wrap",
        },
        feature: {
            flex: 1,
            paddingTop: 16,
            paddingBottom: 16,
            borderWidth: 1,
            borderColor: palette.lightGrey[mode].main,
            alignItems: 'center',
        },
        featureName: {
            ...text.medium.P12_Lh130,
            color: palette.black[mode].main,
            marginTop: 6
        }
    })
}


