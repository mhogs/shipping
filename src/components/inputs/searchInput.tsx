import React from 'react'
import { TextInput, View, Image, StyleSheet } from 'react-native'
import { searchIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'

type searchBoxProps = {
    onFocus?: () => void,
    placeholder?: string,
    placeholderTextColor?: string,
    extraStyle?: Object,
    startIcon:any,
    endicon?: any,
    autoFocus?:boolean
}
export const SearchInput = (props: searchBoxProps) => {
    const { onFocus, placeholder, placeholderTextColor, extraStyle, endicon,startIcon,autoFocus=false } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={[styles.searchBox,extraStyle]}>
            {startIcon}
            <TextInput
                onFocus={onFocus && onFocus}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.searchInput ]}
                autoFocus={autoFocus}
            />
            {endicon}
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        searchBox: {
            backgroundColor: palette.primary[mode][2],
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 12,
            alignItems: 'center',
            paddingHorizontal:14
        },
        searchInput: {
            padding: 14,
            flex: 1,
            color: palette.grey[mode][3]
        },

    })
}
