import { View, Text, StyleSheet, StatusBar, Pressable, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { LoginScreen } from './login-screen'
import { RegisterScreen } from './register-screen'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { LeftArrowIcon } from '../../components/icons'

export const AuthScreen = () => {
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={theme.palette.white[theme.mode].main} />

            <KeyboardAvoidingView style={styles.root}>
                <View style={styles.header}>
                    <Pressable onPress={()=> console.log("back")} style={styles.back_wraper}>
                        <LeftArrowIcon size={24} color={theme.palette.black[theme.mode].main}></LeftArrowIcon>
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
