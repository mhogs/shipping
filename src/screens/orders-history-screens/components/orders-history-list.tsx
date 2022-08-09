import React, { Fragment } from "react"
import { Text, StyleSheet, FlatList } from "react-native"
import { orderHistoryFilterType, OrdersResponseDataType } from "../../../@types"
import { OrderHistoryItem } from "../../../components/content"
import { LoadingBlock, Space } from "../../../components/util"
import { useInfinitOrders, useRefreshOnFocus } from "../../../hooks"

import { useTheme } from "../../../state"
import { ThemeType } from "../../../constants/theme"

type OrdersHistoryListProps = {
    filter?: orderHistoryFilterType
}


export const OrdersHistoryList = (props: OrdersHistoryListProps) => {
    const { filter } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

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
            {!loading_more && index >= orders.length - 1 &&
                <Space size={50} direction='vertical' />
            }
            {loading_more && index >= orders.length - 1 &&
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
            <Text style={styles.resultsText}>
                {resultsCount} Results
            </Text>
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
        resultsText: {
            ...text.heading.H3,
            color: palette.text[mode].main
        }
    })
}
