import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { ServiceType } from '../../@types';
import { isRTL, useTranslation } from '../../locales';
import { Space } from '../util';

type serviceItemProps = {
    id: number,
    icon?: any,
    name: string,
    description?: string,
    price: string
    onPress?: (s: ServiceType) => void
}

export const ServiceItem = (props: serviceItemProps) => {
    const { id, icon, name, description, price, onPress } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])
    const { t } = useTranslation("services")
    return (
        <View style={styles.root}
        >
            <Pressable
                style={styles.pressable}
                onPress={() => {
                    onPress ? onPress({ name, icon, id }) : null
                }}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >

                <View style={styles.info_Wraper}>
                    <View style={styles.iconWraper}>
                        <Image source={{ uri: icon }} style={styles.icon} />
                    </View>
                    <Space size={14} />
                    <View style={styles.infos}>
                        <Text style={styles.nameText}>
                            {t(name)}
                        </Text>
                        <Text style={styles.descriptionText}>
                            {description && t(description)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.priceText}>
                    {price}
                </Text>

            </Pressable>
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            width: '100%',
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.palette.bg[mode][2]
        },
        pressable: {
            padding: 10,
            flexDirection: isRTL() ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        info_Wraper: {
            flexDirection: isRTL() ? "row-reverse" : 'row'
        },
        infos: {
            justifyContent: "space-around"
        },
        icon: {
            width: 24,
            height: 24
        },
        iconWraper: {
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.bg[mode][2],
            borderRadius: 10,
        },
        nameText: {
            ...theme.text.medium.P14_Lh130,
            color: theme.palette.text[theme.mode].main
        },
        descriptionText: {
            ...theme.text.regular.P14_Lh130,
            color: theme.palette.grey[theme.mode].main
        },
        priceText:{
            ...theme.text.medium.P12_Lh130,
            color: theme.palette.text[theme.mode].main
        }
    })
}