import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../state/theming'

export const Badge = (props: { color?: string, right?: number | string, top?: number | string, height?:number, width?:number }) => {
   const {theme}= useTheme()
    return (
        <View style={{
            position: 'absolute',
            width:props.width|| 8,
            height:props.height || 8,
            borderRadius: 5,
            backgroundColor: props.color || theme.palette.danger[theme.mode].main ,
            top: props.top || 2,
            right: props.right || 2,
            zIndex: 1
        }} />
    )
}
