import { ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'

export function LoadingBlock(props: { height?: number }) {
    const { height = 50 } = props
    const { theme } = useTheme()
    return (
        <View style={{ height, justifyContent: "center", alignItems: 'center' }}>
            <ActivityIndicator size="small" color={theme.palette.primary[theme.mode].main} />
        </View>
    )

}

export default LoadingBlock