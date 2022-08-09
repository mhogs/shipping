import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'

type LocationItemProps = {
    icon?: any,
    title?: string,
    place?: string,
    distance?: string,
    onPress?: () => void
}
export const LocationItem = (props: LocationItemProps) => {
    const { icon, title, place, distance, onPress } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    return (
        <View style={{borderRadius:8, overflow:'hidden'}}>
            <Pressable
                style={styles.locationContainer}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.locationIconcontainer}>
                        {icon}
                    </View>
                    <View style={styles.locationDetailsContainer}>
                        <Text style={styles.locationTitle}>
                            {title}
                        </Text>
                        <Text style={styles.locationBrief}>
                            {place}
                        </Text>
                    </View>
                </View>

                <Text style={styles.locationTime}>
                    {distance}
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

        locationContainer: {
            paddingVertical:5,
            paddingHorizontal:2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        locationIconcontainer: {
            width: iconWidth,
            height: iconWidth,
            borderRadius: iconWidth,
            justifyContent: 'center',
            alignItems: 'center'
        },
        locationDetailsContainer: {
            marginHorizontal: marginH,
            maxWidth: width - (marginH * 2 + iconWidth + notifTimewidth) - 10,
            
        },
        locationTitle: {
            ...text.medium.P14_Lh130,
            color: palette.text[mode].main
        },
        locationBrief: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        },
        locationTime: {
            maxWidth: notifTimewidth,
            ...text.regular.P12_Lh180,
            color: palette.grey[mode].main
        },

    })
}