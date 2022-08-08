import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import MapView, { LatLng, Marker } from 'react-native-maps'
import { useHideBottomBar } from '../../components/navigation'
import {  LoadingView,  MyMarkerIcon, SimpleScreenHeader } from '../../components/util'

import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { comingIcon } from '../../assets'
import { TrackingDetailsModal } from './modals'
import { TrackingStackParamList } from '../../navigation/TrackingStack'
import {  useMapHandler, useOrderByCode } from '../../hooks'


type TrackingDetailsScreenProps = NativeStackScreenProps<TrackingStackParamList, 'TrackingDetails'>;

export const TrackingDetailsScreen = ({ navigation, route }: TrackingDetailsScreenProps) => {
    useHideBottomBar(navigation, 2)
    const { navigate } = navigation
    const { goBack } = navigation
    const { code } = route.params

    const { theme } = useTheme()
    const { palette, mode, text } = theme
    const styles = getStyles(theme)
    const [modalOpen, setModalOpen] = useState(false)

    const { mapState, handleMapRegionChange } = useMapHandler()

    const { data: order, isLoading } = useOrderByCode(code)
    
    if (isLoading)
        return <LoadingView />
    
    

    return (

        <View style={styles.root}>
            <View style={{ paddingHorizontal: 24 }}>
                <SimpleScreenHeader title="Detail Location" goBack={goBack} />
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.body}>
                    <MapView
                        region={mapState.mapRegion}
                        onRegionChange={handleMapRegionChange}
                        //showsUserLocation={true}
                        style={styles.map}
                    >
                        {mapState.hasLocationPermissions &&
                            <>

                                <Marker
                                    coordinate={
                                        {
                                            latitude: mapState?.locationResult?.coords.latitude,
                                            longitude: mapState?.locationResult?.coords.longitude,
                                        } as LatLng
                                    }
                                >
                                    <MyMarkerIcon
                                        maincolor={theme.palette.primary[theme.mode].main}
                                        secondaryColor="rgba(19, 59, 183, 0.15)"
                                    />
                                </Marker>
                                <Marker
                                    coordinate={
                                        {
                                            latitude: (mapState?.locationResult?.coords?.latitude || 0) + 0.02,
                                            longitude: (mapState?.locationResult?.coords?.longitude || 0) + 0.02,
                                        } as LatLng
                                    }
                                >
                                    <MyMarkerIcon
                                        maincolor={theme.palette.black[theme.mode].main}
                                        secondaryColor="rgba(25, 29, 49, 0.15)"
                                        icon={<Image source={comingIcon} />}
                                    />
                                </Marker>
                            </>
                        }

                    </MapView>
                    {order !== undefined &&
                        <>
                            <Pressable
                                style={styles.detailsBtn}
                                onPress={() => setModalOpen(true)}
                                android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
                            >
                                <Text style={styles.detailsBtnText}>Check Details</Text>
                            </Pressable>
                            {/**modal */}

                            <TrackingDetailsModal
                                visible={modalOpen}
                                order={order}
                                onBtnPress={() => navigate("Scan")}
                                closeModal={() => setModalOpen(false)}
                            />
                        </>
                    }




                </View>
            </ScrollView>
        </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            paddingTop: 24,
            backgroundColor: palette.white[theme.mode].main,
        },
        map: {
            width: '100%',
            flex: 1
        },

        body: {
            flex: 1,
            position: 'relative'
        },

        detailsBtn: {
            position: "absolute",
            bottom: 24,
            right: 24,
            paddingHorizontal: 14,
            paddingVertical: 10,
            backgroundColor: palette.primary[mode].main,
            borderRadius: 16
        },
        detailsBtnText: {
            ...text.medium.P14_Lh130,
            color: palette.white[mode].main
        }
    })
}
