import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import MapView, { LatLng, Marker, Region } from 'react-native-maps'


import { useHideBottomBar } from '../../components/navigation'
import { Devider, MyMarkerIcon, SimpleScreenHeader, Space } from '../../components/util'
import { TrackingStackParamList } from '../../navigation/TrackingStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import * as Location from 'expo-location';
import { LocationIcon, MyLocationIcon } from '../../components/icons'
import { comingIcon } from '../../assets'
import { AdresseItem } from '../../components/content'

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
    const { palette, mode } = theme
    const styles = getStyles(theme)
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
                    {/** delivery header text */}
                    <View style={styles.deliveryDetails}>
                        <View style={styles.deliverystateContainer}>
                            <Text style={styles.deliverystateHeading}>
                                Your Package on The Way
                            </Text>
                            <Text style={styles.deliverystateSubText}>
                                Arriving at pick up point in 2 mins
                            </Text>
                        </View>

                        <Devider spacing={15} />
                        <Devider spacing={15} />
                        <View>
                            <AdresseItem
                                startIcon={<MyLocationIcon color={palette.warning[mode].main} />}
                                adress="1213 Washington Blvd, Belpre, OH"
                            />
                            <View style={styles.pathlink }/>
                            <AdresseItem
                                startIcon={<LocationIcon color={palette.primary[mode].main} />}
                                adress="1213 Washington Blvd, Belpre, OH"
                            />
                        </View>
                    </View>

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
            height: '50%'
        },

        body: {
            flex: 1
        },
        deliveryDetails: {
            padding: 24
        },
        deliverystateContainer: {

        },
        deliverystateHeading: {
            ...text.heading.H2,
            color: palette.black[mode].main
        },
        deliverystateSubText: {
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main
        },
        pathlink: {
            height: 30,
            marginLeft: 11,
            marginVertical: 5,
            borderLeftWidth: 2,
            borderColor: palette.grey[mode].main,
            borderStyle: "dashed"
        },

    })
}
