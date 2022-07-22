import { View, Text, Image, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from "../../../state/theming";
import { ThemeType } from "../../../theme";
import { onboardingItemProps } from './types';
import { Space } from '../../util';



export const OnboardingItem = ({item} : onboardingItemProps) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image, {width} ]} />
            <Space direction='vertical' size={30} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitle}>{item.subTitle}</Text>
            </View> 
        </View>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme;
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            flex: 1,
            justifyContent: 'center',
            resizeMode: 'cover'
        },
        infoContainer: {
            paddingHorizontal: 24,
        },
        title: {
            textAlign: 'center',
            marginBottom: 10,
            ...text.heading.H1,
            color: palette.black[mode].main
        },
        subTitle : {
            textAlign: 'center',
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main
        }
    });
};