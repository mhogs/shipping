import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'

type NotificaionProps = {
    icon?: any,
    title: string,
    description?: string,
    time: string,
    onPress?: () => void
}
export const NotificationItem = (props: NotificaionProps) => {
    const { icon, title, description, time, onPress } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    return (
        <View style={{borderRadius:8, overflow:'hidden'}}>
            <Pressable
                style={styles.notificationContainer}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.notifIcon}>
                        {icon}
                    </View>
                    <View style={styles.notificationDetailsContainer}>
                        <Text style={styles.notificatioTitle}>
                            {title}
                        </Text>
                        <Text style={styles.notificatioBrief}>
                            {description}
                        </Text>
                    </View>
                </View>

                <Text style={styles.notificatioTime}>
                    {time}
                </Text>
            </Pressable>
        </View>

    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    var { height, width } = Dimensions.get('window');
    const iconWidth = 44
    const notifTimewidth = 40
    const marginH = 14
    return StyleSheet.create({

        notificationContainer: {
            paddingVertical:15,
            paddingHorizontal:2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
        },
        notifIcon: {
            width: iconWidth,
            height: iconWidth,
            backgroundColor: palette.primary[mode].main,
            borderRadius: iconWidth,
            justifyContent: 'center',
            alignItems: 'center'
        },
        notificationDetailsContainer: {

            marginHorizontal: marginH,
            maxWidth: width - (marginH * 2 + iconWidth + notifTimewidth) - 5
        },
        notificatioTitle: {
            ...text.medium.P14_Lh130,
            color: palette.text[mode].main
        },
        notificatioBrief: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        },
        notificatioTime: {
            maxWidth: notifTimewidth,
            ...text.regular.P12_Lh180,
            color: palette.grey[mode].main
        },

    })
}