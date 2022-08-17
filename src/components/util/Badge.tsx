import React, { FC } from 'react'
import { View } from 'react-native'
import { useTheme } from '../../state/theming'

type BadgeProps = {
    color?: string,
    right?: number | string,
    top?: number | string,
    height?: number,
    width?: number
}
export const Badge: FC<BadgeProps> = (props) => {
    const { theme } = useTheme()
    return (
        <View style={{
            position: 'absolute',
            borderRadius: 10,
            minHeight:props.height,
            minWidth:props.width,
            backgroundColor: props.color || theme.palette.danger[theme.mode].main,
            top: props.top || 2,
            right: props.right || 2,
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
        }} >
            {props.children}
        </View>
    )
}
