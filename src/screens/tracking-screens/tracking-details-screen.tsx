import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import MapView, { LatLng, Marker, Region } from 'react-native-maps'


import { useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { TrackingStackParamList } from '../../navigation/TrackingStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import * as Location from 'expo-location';

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
    const styles = getStyles(theme)
    const [mapState, setMapState] = useState<MapstateType>({
        mapRegion: {
            latitude: 60,
            longitude: 18,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        },
        hasLocationPermissions: false,
        locationResult: null,
        errorMsg: null
    })


    useEffect(() => {
        async function initLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);

            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setMapState({
                    ...mapState,
                    locationResult: location,
                    mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 },
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
        console.log(mapState);

    }, []);

    function handleMapRegionChange(mapRegion: Region) {
        setMapState({ ...mapState, mapRegion });
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.root}>
                <View style={{ paddingHorizontal: 24 }}>
                    <SimpleScreenHeader title="Detail Location" goBack={goBack} />
                </View>

                <View style={styles.body}>
                    <MapView
                        region={mapState.mapRegion}
                        onRegionChange={handleMapRegionChange}
                        style={styles.map}>
                        {mapState.locationResult &&
                            <Marker
                                coordinate={
                                    {
                                        latitude: mapState.locationResult.coords.latitude,
                                        longitude: mapState.locationResult.coords.longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }
                                }
                            />
                        }

                    </MapView>
                </View>
            </View>
        </ScrollView>



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
            marginTop: 22,
            flex: 1
        },


    })
}
