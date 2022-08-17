import React from 'react'
import { TextInput, View, Image, StyleSheet, Pressable } from 'react-native'
import { searchIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'
import { ClockIcon, CloseIcon } from '../icons'
import { Space } from '../util'
import { isRTL } from '../../locales'

type searchBoxProps = {
    onFocus?: () => void,
    placeholder?: string,
    placeholderTextColor?: string,
    extraStyle?: Object,
    startIcon: any,
    endicon?: any,
    autoFocus?: boolean,
    value?: string,
    onChangeText?: ((text: string) => void)
}
export const SearchInput = (props: searchBoxProps) => {
    const {
        onFocus,
        value,
        onChangeText,
        placeholder,
        placeholderTextColor,
        extraStyle,
        endicon,
        startIcon,
        autoFocus = false
    } = props

    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    return (
        <View style={[styles.searchBox, extraStyle]}>
            {startIcon}
            <TextInput
                onFocus={onFocus && onFocus}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.searchInput]}
                autoFocus={autoFocus}
                onChangeText={onChangeText}
                value={value}
            />
            {Boolean(value) &&
                <Pressable
                    onPress={() => onChangeText && onChangeText("")}
                    android_ripple={{color:theme.palette.grey[theme.mode][3], borderless:true}}
                >
                    <CloseIcon color={theme.palette.grey[theme.mode].main} size={20} />
                </Pressable>

            }

            {endicon}
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        searchBox: {
            backgroundColor: palette.primary["light"][2],
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 12,
            alignItems: 'center',
            paddingHorizontal: 14
        },
        searchInput: {
            padding: 14,
            flex: 1,
            color: palette.grey[mode][3],
            textAlign:isRTL()?"right":"left"
        },

    })
}
