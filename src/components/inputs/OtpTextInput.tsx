import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { Space } from '../util'

type OtpTextInputProps = {
    digits?: number,
    onceFilled?: (text: number) => void
}

export const OtpTextInput = (props: OtpTextInputProps) => {
    const { digits = 6, onceFilled } = props
    const inputRef = useRef(new Array(digits));

    const { theme } = useTheme()
    const styles = getStyles(theme)

    const [code, setCode] = useState<string[]>(Array(6).fill(""))
    const [focused, setFocused] = useState(0)



    const handleChange = (index: number, text: string) => {
        if (text === "") {
            setCode((prev) => prev.map((item, i) => i === index ? text : item))
            setFocused(index)
        }
        else {
            if (index + 1 < digits) inputRef.current[index + 1].focus()
            setCode((prev) => prev.map((str, i) => i === index ? text : str))
            setFocused(prev => prev + 1)
        }
    }
    useEffect(() => {
        const isFilled = code.filter(item => item === "").length === 0
        if (isFilled) {
            const otp = code.reduce((prev, item) => {
                return prev + item
            }, "")
            onceFilled && onceFilled(parseInt(otp))
        }
    }, [code])
    return (
        <View style={styles.otpContainer}>
            {
                Array(digits).fill("").map((_, index) => (
                    <Fragment key={index}>
                        <View style={index === focused ? styles.inputFocusedWraper : styles.inputNotFocusedWraper}>
                            <TextInput
                                ref={el => inputRef.current[index] = el}
                                autoFocus={index === 0}
                                style={styles.input}
                                maxLength={1}
                                keyboardType="numeric"
                                onChangeText={(text) => handleChange(index, text)}
                            />
                        </View>
                        <Space size={8} />
                    </Fragment>

                ))
            }
        </View>


    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        otpContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        inputFocusedWraper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: palette.primary[mode].main,
            backgroundColor: palette.lightGrey[mode][3],
            flexGrow: 1,
            height: 60,
            borderRadius: 12
        },
        inputNotFocusedWraper: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode][3],
            backgroundColor: palette.lightGrey[mode][3],
            flexGrow: 1,
            height: 60,
            borderRadius: 12
        },
        input: {
            padding: 13,
            flex: 1,
            textAlign: 'center',
            ...text.medium.P20_Lh130,
        },

    })
}