import React from 'react'
import { View, StyleSheet, Image, StatusBar, Text } from 'react-native'
import { logo_asset, notification_asset } from '../../assets'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

export const HomeScreen = () => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <>
            <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
            <View style={styles.root}>
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
                    <View>
                        
                    </View>

                </View>
                <View style={styles.body} >

                </View>
            </View>
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
            flex: 1,
            backgroundColor: palette.primary[theme.mode].main,
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24
        },
        body: {
            flex: 2
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
        }

    })
}


