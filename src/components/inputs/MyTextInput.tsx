import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TextInput, Pressable, GestureResponderEvent } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type iconPressActionType = "TOGGLE_SECRET" | "RESET_INPUT" | undefined
type TextInputProps = {
    label?: string,
    placeholder?: string,
    editable?: boolean,
    startIcon?: any,
    endIcon?: any,
    value?: string,
    secureTextEntry?: boolean,
    endIconAction?: iconPressActionType,
    startIconAction?: iconPressActionType,
    isNumeric?: boolean,
}
export const MyTextInput = (props: TextInputProps) => {
    const { label, placeholder, editable=true, isNumeric=false, startIcon, endIcon, value, secureTextEntry = false, endIconAction, startIconAction } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const [isSecret, setIsSecret] = useState(secureTextEntry)

    const onIconPress = (action: iconPressActionType) => {
        return function (e: GestureResponderEvent) {
            if (!action) return
            switch (action) {
                case "TOGGLE_SECRET":
                    setIsSecret(prev => !prev);
                    break;
                case 'RESET_INPUT':
                    break
                default:
                    break
            }
        }
    }
    return (
        <View>
            {label?
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.inputLabel}> {label}</Text>
                </View> : null
            }

            <View style={styles.inputWraper}>
                <Pressable
                    onPress={onIconPress(startIconAction)}
                    style={startIcon? { paddingLeft:13 } : null}
                    >
                    {startIcon}
                </Pressable> 
                
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    defaultValue={value}
                    secureTextEntry={isSecret}
                    editable={editable}
                    keyboardType={isNumeric? "numeric": undefined }
                />
                <Pressable
                    onPress={onIconPress(endIconAction)}
                    style={endIcon? { paddingRight:13 } : null}
                >
                    {endIcon}
                </Pressable>

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
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode].main,
            borderRadius: 12
        },
        input: {
            paddingHorizontal: 8,
            paddingVertical: 13,
            flex: 1,
            textAlign:"left",
        }
    })
}