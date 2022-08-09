import React, { Fragment, useState } from 'react'
import { View, Image, Text, StyleSheet, TextInput, Pressable, GestureResponderEvent } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { CheckIcon, EyeIcon, EyeOffIcon } from '../icons'
import { Space } from '../util'

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
    onChangeText?: (text: string) => void,
    onBlur?: (e: any) => void,
    touched?: boolean
    error?: string
}
export const MyTextInput = (props: TextInputProps) => {
    const {
        label,
        placeholder,
        editable = true,
        isNumeric = false,
        startIcon,
        endIcon,
        value,
        secureTextEntry = false,
        endIconAction,
        startIconAction,
        onChangeText,
        onBlur,
        error,
        touched,
    } = props
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
            {label &&
                <Fragment>
                    <Text style={styles.inputLabel}> {label}</Text>
                    <Space size={10} direction="vertical" />
                </Fragment>
            }

            <View style={[
                styles.inputWraper,
                (touched && error) ? { borderColor: theme.palette.danger[theme.mode].main } : {},
                editable ? {} : { backgroundColor: theme.palette.lightGrey[theme.mode].main }
            ]}>
                {startIcon &&
                    <Pressable
                        onPress={onIconPress(startIconAction)}
                        style={{ paddingLeft: 13 }}
                    >
                        {startIcon}
                    </Pressable>
                }

                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={theme.palette.text[theme.mode].main}
                    defaultValue={value}
                    secureTextEntry={isSecret}
                    editable={editable}
                    keyboardType={isNumeric ? "numeric" : undefined}
                    onChangeText={text => onChangeText && onChangeText(text)}
                    onBlur={onBlur}
                />
                <Pressable
                    onPress={onIconPress(endIconAction)}
                    style={{ paddingRight: 13 }}
                >
                    {!secureTextEntry && !endIcon && touched && !error &&
                        <CheckIcon color={theme.palette.success[theme.mode].main} size={20} />
                    }
                    {secureTextEntry ? (
                        isSecret ?
                            <EyeIcon color={theme.palette.grey[theme.mode].main} />
                            :
                            <EyeOffIcon color={theme.palette.grey[theme.mode].main} />
                    ) :
                        endIcon
                    }

                </Pressable>

            </View>
            {touched && error && <Text style={styles.errorText}>- {error}</Text>}
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
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode][2],
            borderRadius: 12
        },
        input: {
            paddingHorizontal: 8,
            paddingVertical: 13,
            flex: 1,
            textAlign: "left",
            color: palette.text[mode].main
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