import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import MapView, { LatLng, Marker, Region } from 'react-native-maps'


import { useHideBottomBar } from '../../components/navigation'
import { Devider, ModalTopBarIndicator, MyMarkerIcon, SimpleScreenHeader, Space } from '../../components/util'
import { TrackingStackParamList } from '../../navigation/TrackingStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import * as Location from 'expo-location';
import { ChatlIcon, EmailIcon, InfoIcon, LocationIcon, MyLocationIcon, PhoneCallIcon, StarIcon } from '../../components/icons'
import { comingIcon } from '../../assets'
import { AdresseItem, DriverItem } from '../../components/content'
import { SaveChangesButton } from '../../components/buttons'
import { TrackingDetailsModal } from './modals'

type MapstateType = {
    mapRegion: Region,
    hasLocationPermissions: boolean,
    locationResult: Location.LocationObject | null,
    errorMsg: string | null,

}
type TrackingDetailsScreenProps = NativeStackScreenProps<TrackingStackParamList, 'TrackingDetails'>;

export const TrackingDetailsScreen = ({ navigation }: TrackingDetailsScreenProps) => {
    // 1 is the depth of this screen relative to the stack
    useHideBottomBar(navigation, 2)
    const { navigate } = navigation
    const { goBack } = navigation
    const { theme } = useTheme()
    const { palette, mode, text } = theme
    const styles = getStyles(theme)
    const [modalOpen, setModalOpen] = useState(false)
    const [mapState, setMapState] = useState<MapstateType>({
        mapRegion: {
            latitude: 60,
            longitude: 18,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        hasLocationPermissions: false,
        locationResult: null,
        errorMsg: null
    })


    useEffect(() => {
        async function initLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setMapState({
                    ...mapState,
                    locationResult: location,
                    mapRegion: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    errorMsg: null,
                    hasLocationPermissions: true
                });
                return
            }

            setMapState(
                {
                    ...mapState,
                    errorMsg: 'Permission to access location was denied',
                    hasLocationPermissions: false
                }
            );
        };
        initLocation()


    }, []);

    function handleMapRegionChange(mapRegion: Region) {
        // setMapState({ ...mapState, mapRegion });
    }

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

                        }
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
                    </MapView>
                    <TrackingDetailsModal visible={modalOpen} onBtnPress={() => { }} closeModal={()=>setModalOpen(false)} />
                    <Pressable
                        style={styles.detailsBtn}
                        onPress={()=>setModalOpen(true)}
                        android_ripple={{color:theme.palette.grey[theme.mode][3]}}
                    >
                        <Text style={styles.detailsBtnText}>Check Details</Text>
                    </Pressable>

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
            paddingHorizontal:14,
            paddingVertical:10,
            backgroundColor:palette.primary[mode].main,
            borderRadius:16
        },
        detailsBtnText:{
            ...text.medium.P14_Lh130,
            color:palette.white[mode].main
        }
    })
}
