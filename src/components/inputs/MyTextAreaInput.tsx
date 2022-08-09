import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'

type TextAreaInputProps = {
    label: string,
    placeholder?: string,
    value?: string,
    h?: number,
    onChangeText?: (text: string) => void,
    onBlur?: (e: any) => void,
    touched?:boolean
    error?:string
}

export const MyTextAreaInput = (props: TextAreaInputProps) => {
    const { label, placeholder, value, h, onChangeText,onBlur,error,touched } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    return (
        <View>
            <View style={{flexDirection:"row"}}>
                <Text style={styles.inputLabel}>{label}</Text>
            </View>

            <View style={{...styles.inputWraper, height: h? h:160 }}>
                <TextInput
                    style={[
                        styles.input,
                        (touched && error)?{ borderColor:theme.palette.danger[theme.mode].main}:{},
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.palette.grey[theme.mode].main}
                    defaultValue={value}
                    multiline={true}
                    onChangeText={(text)=>onChangeText && onChangeText(text)}
                    onBlur={onBlur}
                />
                {touched && error && <Text style={styles.errorText}>- {error}</Text>}
            </View>
        </View>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        inputLabel: {
            ...text.medium.P16_Lh180,
            color: palette.text[mode].main
        },
        inputWraper: {
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingLeft: 14,
            paddingRight: 14,
            borderWidth: 1.5,
            borderColor: palette.bg[mode][2],
            borderRadius: 12
        },
        input: {
            padding: 13,
            flex: 1,
            textAlign:"left"
        },
        errorText: {
            fontSize: 10,
            marginLeft: 8,
            color: palette.danger[mode].main,
            position: "absolute",
            bottom: -16
        }
    })
}