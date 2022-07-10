import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'

type MessageItemProps = {
    picture?: any,
    fullName: string,
    messageText?: string,
    time: string,
    onPress?: () => void
}
export const MessageItem = (props: MessageItemProps) => {
    const { picture, fullName, messageText, time, onPress } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={{borderRadius:8, overflow:'hidden'}}>
            <Pressable
                style={styles.notificationContainer}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.locationIconcontainer}>
                        {picture}
                    </View>
                    <View style={styles.notificationDetailsContainer}>
                        <Text style={styles.notificatioTitle}>
                            {fullName}
                        </Text>
                        <Text style={styles.notificatioBrief}>
                            {messageText}
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
            paddingVertical:5,
            paddingHorizontal:2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
        },
        locationIconcontainer: {
            width: iconWidth,
            height: iconWidth,
            borderRadius: iconWidth,
            justifyContent: 'center',
            alignItems: 'center'
        },
        notificationDetailsContainer: {

            marginHorizontal: marginH,
            maxWidth: width - (marginH * 2 + iconWidth + notifTimewidth) - 10
        },
        notificatioTitle: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
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