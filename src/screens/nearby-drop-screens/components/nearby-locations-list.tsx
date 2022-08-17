import React, { Fragment } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrdersResponseDataType } from '../../../@types'
import { LocationItem } from '../../../components/content'
import { DropLocationIcon, PickUpLocationIcon } from '../../../components/icons'
import { Devider, LoadingBlock } from '../../../components/util'
import { useTheme } from '../../../state'

type NearByLocationsListProps = {
    orders?: OrdersResponseDataType[] | undefined
    isLoading: boolean,
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrdersResponseDataType | null>>
}
export const NearByLocationsList = (props: NearByLocationsListProps) => {
    const { orders, isLoading, setSelectedOrder } = props
    const { theme } = useTheme()
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View >
                {isLoading && <LoadingBlock />}
                {orders &&
                    orders.map((order, index) => (
                        <Fragment key={index}>
                            <LocationItem
                                icon={
                                    order.state == "on_progress" ?
                                        <DropLocationIcon size={24} color={theme.palette.primary[theme.mode].main} />
                                        :
                                        <PickUpLocationIcon size={24} color={theme.palette.warning[theme.mode].main} />
                                }
                                title={order.description}
                                place={order.destination?.place}
                                distance="3.7 km"
                                onPress={() => setSelectedOrder(order)}
                            />
                            <Devider spacing={8} />
                        </Fragment>
                    ))
                }
            </View>
        </ScrollView>

    )
}
