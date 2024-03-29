import React, { useMemo } from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { avatar_asset } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'
import { dialogType } from '../../@types'
import { isRTL } from '../../locales'

type MessageItemProps = dialogType & {
    onPress?: () => void
}
export const MessageItem = (props: MessageItemProps) => {
    const { picture, fullName, messageText, time, unread, onPress } = props
    const { theme } = useTheme()
    const styles = useMemo(() => getStyles(theme, unread), [theme, unread, isRTL()])
    return (
        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <Pressable
                style={styles.messageContainer}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={styles.messageWraper}>
                    <View style={styles.avatarContainer}>
                        {
                            picture ?
                                <Image source={{ uri: picture }} style={styles.picture} />
                                :
                                <Image source={avatar_asset} style={styles.picture} />

                        }

                    </View>
                    <View style={styles.messageDetailsContainer}>
                        <Text style={styles.senderName}>
                            {fullName}
                        </Text>
                        <Text style={styles.messageText}>
                            {messageText?.substring(0, 25)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.messageTime}>
                    {time}
                </Text>
            </Pressable>
        </View>

    )
}

const getStyles = (theme: ThemeType, unread: boolean) => {
    const { palette, mode, text } = theme
    var { height, width } = Dimensions.get('window');
    const iconWidth = 44
    const notifTimewidth = 50
    const marginH = 14
    return StyleSheet.create({

        messageContainer: {
            paddingVertical: 5,
            paddingHorizontal: 2,
            flexDirection: isRTL()?"row-reverse" :"row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        messageWraper: {
            flexDirection: isRTL()?"row-reverse" :"row",
        },
        avatarContainer: {
            position: "relative"
        },
        messageDetailsContainer: {
            marginHorizontal: marginH,
            maxWidth: width - (marginH * 2 + iconWidth + notifTimewidth) - 10,
            justifyContent: "space-around",
            alignItems: isRTL()? "flex-end":"flex-start"
        },
        senderName: unread ?
            {
                ...text.heading.H4,
                color: palette.text[mode].main,
            }
            :
            {
                ...text.medium.P14_Lh130,
                color: palette.text[mode].main,
            },
        messageText: {
            ...text.regular.P14_Lh130,
            color: unread ? palette.primary[mode].main : palette.grey[mode].main,
            
        },
        messageTime: {
            maxWidth: notifTimewidth,
            ...text.regular.P10_Lh130,
            color: unread ? palette.text[mode].main : palette.grey[mode].main
        },
        picture: {
            width: 44,
            height: 44,
            borderRadius: 44
        }

    })
}