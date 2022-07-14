import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { MyTextInput } from '../../components/inputs'
import { MyTabView, Space } from '../../components/util'
import { callIcon, googleIcon, appleIcon } from '../../assets'
import { LockOutLineIcon } from '../../components/icons'
import { AuthActionButton, SocialLoginButton } from '../../components/buttons'
import { Devider } from '../../components/util/Devider'
import { AuthScreenProps, AuthStackParamList } from '../../navigation/AuthStack';
import { SceneRendererProps } from 'react-native-tab-view';



export const OrdersFormMeScene = (props: any) => {
    const { navigation } = props;

    const { theme } = useTheme()
    const styles = getStyles(theme)


    // 👇️ type T1 = string

    const TabRoutes = [
        { key: "all", title: "All" },
        { key: "pending", title: "Pending" },
        { key: "on_progress", title: "On Progress" },
        { key: "deliverded", title: "Deliverded" },
    ]




    return (
        <View style={styles.root}>
            <MyTabView
                enabledSwip={false}
                tabRoutes={TabRoutes}
                sceneRendrer={renderScene}
                tapBarstyle={styles.tapBar}
                tabItemFocusedStyle={styles.tabItemFocused}
                tabItemNotFocusedStyle={styles.tabItemNotFocused}
                focusedLabelstyle={styles.focusedLabel}
                nonFocusedLabelStyle={styles.nonFocusedLabel}
                scrollable
            />
        </View>
    )
}

const renderScene = (props: SceneRendererProps & {
    route: {
        key: string;
        title: string;
    };
}) => {
    const { route } = props;

    switch (route.key) {
        case 'all':
            return <View><Text>all</Text></View>;
        case 'pending':
            return <View><Text>pending</Text></View>;
        case 'on_progress':
            return <View><Text>on_progress</Text></View>;
        case 'deliverded':
            return <View><Text>deliverded</Text></View>;
        default:
            return null;
    }
};

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            marginTop: 20,
            backgroundColor: palette.white[theme.mode].main,
            
        },
        tapBar: {
            display: "flex", 
            flexDirection: "row",
            alignItems: "center",
            
        },
        tabItemFocused: {
            borderRadius: 25,
            paddingHorizontal: 17,
            paddingVertical: 6,
            height: "100%",
            backgroundColor: palette.primary[mode].main,
            justifyContent: "center",
            marginRight: 10
        },
        tabItemNotFocused: {
            borderRadius: 25,
            paddingHorizontal: 17,
            paddingVertical: 6,
            height: "100%",
            backgroundColor: palette.lightGrey[mode].main,
            borderColor: palette.lightGrey[mode].main,
            borderWidth: 0.5,
            justifyContent: "center",
            marginRight: 10
        },
        focusedLabel: {
            color: palette.white[mode].main,
            ...text.medium.P12_Lh130,
            textAlign: "center",
        },
        nonFocusedLabel: {
            color: palette.grey[mode].main,
            ...text.medium.P12_Lh130,
            textAlign: "center",
        },


    })
}
