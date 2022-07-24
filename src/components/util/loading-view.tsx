import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'

export const LoadingView = () => {
    const { theme } = useTheme()
    return (
        <View style={
            {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.primary[theme.mode].main
            }
        }
        >
            <ActivityIndicator size="large" color={theme.palette.white[theme.mode].main}  />
        </View>
    )
}
