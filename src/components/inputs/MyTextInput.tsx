import React from 'react'
import { View, Image, Text,StyleSheet,TextInput } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type TextInputProps = {
    label: string,
    placeholder?: string,
    startIcon?: any,
    endIcon?: any,
    value?: string

}
export const MyTextInput = (props: TextInputProps) => {
    const { label, placeholder, startIcon, endIcon,value } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputWraper}>
                {startIcon}
                <TextInput placeholder={placeholder} value={value} style={styles.input} />
                {endIcon}
            </View>
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            padding: 24,
            backgroundColor: palette.lightGrey[theme.mode][3],
        },
        profilePicWraper: {
            position: "relative",
            marginTop: 30,
            width: '100%',
            alignItems: 'center',
        },
        form: {
            marginTop: 30,
        },
        inputLabel: {
            ...text.medium.P16_Lh180,
            color: palette.black[mode].main
        },
        inputWraper: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 14,
            paddingRight: 14,
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode].main,
            borderRadius: 12
        },
        input: {
            padding: 13,
            flex: 1,
        }
    })
}