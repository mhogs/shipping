import React, { Fragment } from "react"
import { Text, StyleSheet, FlatList, View } from "react-native"
import { orderHistoryFilterType, OrdersResponseDataType } from "../../../@types"
import { OrderHistoryItem } from "../../../components/content"
import { LoadingBlock, Space } from "../../../components/util"
import { useInfinitOrders, useRefreshOnFocus } from "../../../hooks"

import { useTheme } from "../../../state"
import { ThemeType } from "../../../constants/theme"
import { isRTL, useTranslation } from "../../../locales"
import { isTheLastElement } from "../../../helpers"

type OrdersHistoryListProps = {
    filter?: orderHistoryFilterType
}


export const OrdersHistoryList = (props: OrdersHistoryListProps) => {
    const { filter } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme, isRTL()])
    const { t } = useTranslation("orders_history")
    const {
        results: orders,
        isLoading,
        isFetchingNextPage: loading_more,
        fetchNextPage: loadMore,
        refetch,
        resultsCount
    } = useInfinitOrders(filter)

    useRefreshOnFocus(refetch)


    const _renderItem = ({ item, index }: { item: OrdersResponseDataType, index: number }) => (
        <Fragment >
            <OrderHistoryItem
                id={item.id}
                code={item.code}
                state={item.state}
                description={item.description}
            />
            <Space size={15} direction='vertical' />
            {!loading_more && isTheLastElement(orders, index) &&
                <Space size={50} direction='vertical' />
            }
            {loading_more && isTheLastElement(orders, index) &&
                <LoadingBlock style={{ justifyContent: "flex-start" }} />
            }
        </Fragment>
    );
    if (isLoading) {
        return (
            <LoadingBlock style={{ height: 50 }} />
        )
    }
    return (
        <>
            <View style={styles.resultsHeader}>
                <Text style={styles.resultsText}>
                    {resultsCount}
                </Text>
                <Space size={8} />
                <Text style={styles.resultsText}>
                    {t("Results")}
                </Text>
            </View>

            <Space size={20} direction='vertical' />
            <FlatList
                data={orders}
                renderItem={_renderItem}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={100}
                onEndReached={() => loadMore()}
            />


        </>


    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        resultsHeader:{ 
            flexDirection: isRTL() ? "row-reverse" : "row" ,
            textAlign: isRTL()?"right" :"left"
        },
        resultsText: {
            ...text.heading.H3,
            color: palette.text[mode].main
        },

    })
}
