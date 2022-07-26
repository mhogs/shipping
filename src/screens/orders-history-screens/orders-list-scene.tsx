import { View, StyleSheet, Image, Text, ScrollView, ActivityIndicator } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment } from 'react'
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
import { OrderHistoryItem } from '../../components/content';
import { OrdersResponseDataType } from '../../@types';


type OrdersFormMeSceneProps = {
    orders?: OrdersResponseDataType[],
    loading: boolean
}

export const OrdersListScene = (props: OrdersFormMeSceneProps) => {
    const { orders,loading } = props;

    const { theme } = useTheme()
    const styles = getStyles(theme)


    // 👇️ type T1 = string

    const TabRoutes = [
        { key: "all", title: "All" },
        { key: "pending", title: "Pending" },
        { key: "on_progress", title: "On Progress" },
        { key: "deliverded", title: "Deliverded" },
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
                return <OrdersHistoryList loading={loading} orders={orders} />;
            case 'pending':
                return <OrdersHistoryList loading={loading} orders={orders?.filter(order => order.state === 'pending')} />;
            case 'on_progress':
                return <OrdersHistoryList loading={loading} orders={orders?.filter(order => order.state === 'on_progress')} />;
            case 'deliverded':
                return <OrdersHistoryList loading={loading} orders={orders?.filter(order => order.state === 'delivered')} />;
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


type OrdersHistoryListProps = {
    orders?: OrdersResponseDataType[]
    loading?: boolean
}
const OrdersHistoryList = (props: OrdersHistoryListProps) => {
    const { loading, orders } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Text style={styles.resultsText}>
                    {orders?.length} Results
                </Text>
                <Space size={20} direction='vertical' />

                {
                    orders?.map((order, index) => (
                        <Fragment key={index}>
                            <OrderHistoryItem
                                {...order}
                            />
                            <Space size={15} direction='vertical' />
                        </Fragment>
                    ))
                }
                {loading && <ActivityIndicator size="large" color={theme.palette.primary[theme.mode].main} />}

            </View>
        </ScrollView>

    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            marginTop: 20,
            backgroundColor: palette.white[theme.mode].main,

        },
        tapBar: {
            height: 28,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20

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
        resultsText: {
            ...text.heading.H3,
            color: palette.black[mode].main
        }


    })
}




