import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { ServiceType } from '../../@types';

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

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.icon}>
                        <Image source={{ uri: icon }} style={{ width: 24, height: 24 }} />
                    </View>
                    <View style={{
                        marginLeft: 14,
                        justifyContent: "space-around"
                    }}>
                        <Text style={{
                            ...theme.text.medium.P14_Lh130,
                            color: theme.palette.text[theme.mode].main
                        }}>
                            {name}
                        </Text>
                        <Text style={{
                            ...theme.text.regular.P14_Lh130,
                            color: theme.palette.grey[theme.mode].main
                        }}>
                            {description}
                        </Text>
                    </View>
                </View>

                <Text style={{
                    ...theme.text.medium.P12_Lh130,
                    color: theme.palette.text[theme.mode].main
                }}>
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center'
        },
        icon:{
            padding: 13,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.bg[mode][2],
            borderRadius: 10,
        }
    })
}