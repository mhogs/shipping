import React from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'
import { CheckIcon } from '../icons'

type MenuItemProps = {
    title: string
    icon?: any
    selected?: boolean,
    onPress?: () => void,

}
export const MenuItem = (props: MenuItemProps) => {
    const { title, icon, selected = false, onPress } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <View style={[styles.settingWraper, selected ? styles.selectedMenu : {}]}>
            <Pressable
                style={styles.setting}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode].main, borderless: false }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {icon}
                    <Text style={styles.MenuItemText}>{title}</Text>
                </View>

                {selected && <CheckIcon color={theme.palette.primary[theme.mode].main} size={16} />}
            </Pressable>
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({

        sectionTitle: {
            ...text.heading.H3,
            color: palette.black[mode].main,
        },
        settingWraper: {
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: palette.lightGrey[mode].main
        },
        selectedMenu: {
            borderColor: palette.primary[mode].main
        },

        setting: {
            flexDirection: 'row',
            padding: 11,
            alignItems: 'center',
            justifyContent: "space-between"
        },
        MenuItemText: {
            ...text.medium.P14_Lh180,
            color: palette.black[mode].main,
            marginLeft: 14,
        }

    })
}