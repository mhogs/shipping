import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'
import { ChatlIcon, PhoneCallIcon, StarIcon } from '../icons'
import { Space } from '../util'


type DriverItemProps = {
    picture?: string,
    name: string,
    rating?: number
}
export const DriverItem = (props: DriverItemProps) => {
    const { picture, name, rating } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <View style={styles.root}>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Image source={{ uri: picture }} style={styles.avatar} />
                </View>
                <View style={styles.driverInfo}>
                    <Text>
                        {name}
                    </Text>
                    <View style={styles.ratingContainer}>
                        <StarIcon size={14} color={theme.palette.warning[theme.mode].main} />
                        <Text style={styles.ratingValueText}>
                            {rating}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <PhoneCallIcon />
                <Space size={14} />
                <ChatlIcon />
            </View>
        </View>
    )
}
const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        avatar: {
            width: 46,
            height: 46,
            borderRadius: 46
        },
        driverInfo: {
            marginLeft: 14,
            justifyContent: "space-around"
        },
        ratingContainer: {
            flexDirection: "row",
            alignItems: "center"
        },
        ratingValueText: {
            ...text.regular.P12_Lh130,
            color: palette.grey[mode].main,
            marginLeft: 4
        },
    })
}