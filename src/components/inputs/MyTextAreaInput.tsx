import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type TextAreaInputProps = {
    label: string,
    placeholder?: string,
    value?: string,
    h?: number,
}

export const MyTextAreaInput = (props: TextAreaInputProps) => {
    const { label, placeholder, value, h } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputLabel}>{label}</Text>
            </View>

            <View style={{...styles.inputWraper, height: h? h:160 }}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    defaultValue={value}
                    multiline={true}
                />
            </View>
        </View>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        inputLabel: {
            ...text.medium.P16_Lh180,
            color: palette.black[mode].main
        },
        inputWraper: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingLeft: 14,
            paddingRight: 14,
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode].main,
            borderRadius: 12
        },
        input: {
            padding: 13,
            flex: 1,
            textAlign:"left"
        }
    })
}