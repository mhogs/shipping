import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { ServiceType } from '../../@types';

type serviceItemProps = {
    id:number,
    icon?: any,
    name: string,
    description?: string,
    price: string
    onPress?: (s : ServiceType) => void
}

export const ServiceItem = (props: serviceItemProps) => {
    const {id, icon, name, description, price, onPress } = props
    const { theme } = useTheme()
    

    return (
        <View style={{
            width: '100%',
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.palette.lightGrey[theme.mode].main}}
        >
            <Pressable
                style={{ padding: 10, }}
                onPress={() => {
                    onPress? onPress({name,icon,id}) : null
                }}
                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
            >
                <View style={{
                    paddingVertical: 5,
                    paddingHorizontal: 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            padding: 13,
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.palette.lightGrey[theme.mode].main,
                            borderRadius: 10,
                        }}>
                            <Image source={{uri:icon}} style={{width:24, height:24}} />
                        </View>
                        <View style={{
                            marginLeft: 14,
                            justifyContent: "space-around"
                        }}>
                            <Text style={{
                                ...theme.text.medium.P14_Lh130,
                                color: theme.palette.black[theme.mode].main
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
                        color: theme.palette.black[theme.mode].main
                    }}>
                        {price}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}
