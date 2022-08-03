import React, { Fragment } from 'react'
import { LatLng, Marker } from 'react-native-maps'
import { OrdersResponseDataType } from '../../../@types'
import { DropLocationIcon, PickUpLocationIcon } from '../../../components/icons'
import { MyMarkerIcon } from '../../../components/util'
import { useFetcher } from '../../../hooks'
import { useTheme } from '../../../state'

export const DeliveryPlaces = (props: { orders?: OrdersResponseDataType[] }) => {
    const { orders } = props
    const { theme } = useTheme()

    return (
        <>
            {orders &&
                orders?.map((order, index) => order.state === "pending" ?
                    <Marker
                        key={index}
                        coordinate={
                            {
                                latitude: order.destination?.latitude,
                                longitude: order.destination?.longitude,
                            } as LatLng
                        }
                    >
                        <MyMarkerIcon
                            icon={<PickUpLocationIcon size={14} color="#fff" />}
                            maincolor={theme.palette.warning[theme.mode].main}
                            secondaryColor="rgba(19, 59, 183, 0.15)"
                        />
                    </Marker>
                    :
                    <Marker
                        key={index}
                        coordinate={
                            {
                                latitude: order.destination?.latitude,
                                longitude: order.destination?.longitude,
                            } as LatLng
                        }
                    >
                        <MyMarkerIcon
                            icon={<DropLocationIcon size={13} color="#fff" />}
                            maincolor={theme.palette.primary[theme.mode].main}
                            secondaryColor="rgba(19, 59, 183, 0.15)"
                        />
                    </Marker>

                )
            }
        </>

    )
}
