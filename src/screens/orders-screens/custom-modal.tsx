import { View, Text, StyleSheet, Modal, Pressable  } from 'react-native'
import React from 'react'
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';

type ModaltProps = {
    modalAction: ()=>void,
    onClose: ()=>void,
}


export const CustomModal = (props: ModaltProps) => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    
    return (
        <View>
            <Text>CustomModal</Text>
        </View>
    )
}




const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            position: 'relative',
            paddingTop:24,
            paddingHorizontal: 24,
            backgroundColor: palette.white[theme.mode][3],
        },
        actionContainer: {
            marginBottom:20
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'row'
        },
        groupLabel: {
            ...text.medium.P16_Lh180,
            color: palette.black[mode].main
        },
        unit: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
        }
    })
}