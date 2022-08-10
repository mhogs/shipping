import React from 'react'
import { Pressable, View, StyleSheet, Text } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'
import { CheckIcon } from '../icons'
import { isRTL } from '../../locales'
import { Space } from '../util'

type MenuItemProps = {
    title: string
    icon?: any
    selected?: boolean,
    onPress?: () => void,

}
export const MenuItem = (props: MenuItemProps) => {
    const { title, icon, selected = false, onPress } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme,isRTL()])

    return (
        <View style={[styles.settingWraper, selected ? styles.selectedMenu : {}]}>
            <Pressable
                style={styles.setting}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode].main, borderless: false }}
            >
                <View style={styles.menuWraper}>
                    {icon}
                    <Space size={14} />
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


        settingWraper: {
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: palette.bg[mode][2]
        },
        selectedMenu: {
            borderColor: palette.primary[mode].main
        },

        setting: {
            flexDirection: isRTL() ? 'row-reverse' : 'row',
            padding: 11,
            alignItems: 'center',
            justifyContent: "space-between"
        },
        menuWraper: {
            flexDirection: isRTL() ? 'row-reverse' : 'row',
            alignItems: "center"
        },
        MenuItemText: {
            ...text.medium.P14_Lh180,
            color: palette.text[mode].main,
        }

    })
}