import { ActivityIndicator, StyleProp, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'

export function LoadingBlock(props: { style?: StyleProp<ViewStyle> }) {
    const {style } = props
    const { theme } = useTheme()
    return (
        <View style={[{height:50,justifyContent:"center", alignItems:"center"},style]}>
            <ActivityIndicator size="small" color={theme.palette.primary[theme.mode].main} />
        </View>
    )

}

export default LoadingBlock