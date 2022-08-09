import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from "../../../state/theming";
import { ThemeType } from "../../../constants/theme";

type SliderDotsProps = {
    lenght: number,
    active: number,
}

export const SliderDots = ({lenght, active} : SliderDotsProps) => {
    const { theme } = useTheme();
    const styles = React.useMemo(() => getStyles(theme), [theme])  ;

    return (
        <View style={[styles.container]}>
        {
            Array(lenght).fill(0).map((_, index) => (
                <View key={index} style= {active === index? styles.activeDot : styles.dot }></View>
            ))
        }
        </View>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme;
    return StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center',
            height: 10,
            width: 50,
        },
        dot:{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: palette.grey[mode][3]
        },
        activeDot:{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: palette.primary[mode].main
        }
    });
};