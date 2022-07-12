import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type OtpTextInputProps = {
    value?: string,
}

export const OtpTextInput = (props: OtpTextInputProps) => {
    const { value } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const [focused, setFocused] = useState(false)

    return (
        <View style={focused? styles.inputFocusedWraper: styles.inputNotFocusedWraper}>
            <TextInput 
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
                style={styles.input}
                maxLength={1}
                keyboardType="numeric"
            />
        </View>
        
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        
        inputFocusedWraper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: palette.primary[mode].main,
            backgroundColor: palette.lightGrey[mode][3],
            width:66,
            height:60,
            borderRadius: 12
        },
        inputNotFocusedWraper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode][3],
            backgroundColor: palette.lightGrey[mode][3],
            width:66,
            height:60,
            borderRadius: 12
        },
        input: {
            padding: 13,
            flex: 1,
            textAlign:'center',
            ...text.medium.P20_Lh130,
        }
    })
}