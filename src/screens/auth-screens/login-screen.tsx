import { View, Text, StyleSheet, StatusBar, Image, Pressable, PlatformColor, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { profile_asset, call_asset, lock_asset, leftarrow_asset } from '../../assets'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

export const LoginScreen = () => {
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.palette.white[theme.mode].main} />

            <KeyboardAvoidingView style={styles.root}>
                <View style={styles.header}>
                    <Pressable onPress={()=> console.log("back")} style={styles.back_wraper}>
                        <Image source={leftarrow_asset} style={styles.back_arrow}/>
                    </Pressable>
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
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        back_arrow: {
            width: 23,
            height: 23,
        },
        back_wraper: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 46,
            height: 46,
            borderRadius: 46,
            borderWidth: 1,
            borderColor: palette.grey[theme.mode][3],
        },
    })
}
