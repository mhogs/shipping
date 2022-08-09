import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../state/theming'

type DeviderProps = {
    spacing?: number,
    color?: string
}
export const Devider = (props: DeviderProps) => {
    const { color, spacing } = props
    const { theme } = useTheme()
    return (
        <View style={
            {
                height: 1.5,
                backgroundColor: color ? color : theme.palette.bg[theme.mode][2],
                marginVertical: spacing,
                alignSelf:'stretch'
            }
        } />
    )
}
