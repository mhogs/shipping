import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../../state/theming'
import { ThemeType } from '../../../constants/theme'
import { SceneRendererProps } from 'react-native-tab-view';
import { orderHistoryFilterType } from '../../../@types';
import { OrdersHistoryList } from './orders-history-list';
import { MyTabView } from '../../../components/navigation';
import { isRTL, useTranslation } from '../../../locales';


type OrdersFormMeSceneProps = {
    filter?: orderHistoryFilterType
}

export const OrdersListScene = (props: OrdersFormMeSceneProps) => {
    const { filter } = props;
    const {t} = useTranslation("orders_history")
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme,isRTL()])  


    // 👇️ type T1 = string

    const TabRoutes = [
        { key: "all", title: t("all" )},
        { key: "draft", title: t("draft") },
        { key: "pending", title: t("pending") },
        { key: "on_progress", title: t("on_progress") },
        { key: "delivered", title: t("delivered") },
    ]

    const renderScene = (props: SceneRendererProps & {
        route: {
            key: string;
            title: string;
        };
    }) => {
        const { route } = props;

        switch (route.key) {
            case 'all':
                return <OrdersHistoryList filter={{ ...filter }} />;
            case 'draft':
                return <OrdersHistoryList filter={{ ...filter,state: "draft" }} />;
            case 'pending':
                return <OrdersHistoryList filter={{ ...filter, state: "pending" }} />;
            case 'on_progress':
                return <OrdersHistoryList filter={{ ...filter, state: "on_progress" }} />;
            case 'delivered':
                return <OrdersHistoryList filter={{ ...filter, state: "delivered" }} />;
            default:
                return null;
        }
    };


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





const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
        },
        tapBar: {
            height: 28,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
           
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
            backgroundColor: palette.bg[mode].main,
            borderColor: palette.bg[mode][2],
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




