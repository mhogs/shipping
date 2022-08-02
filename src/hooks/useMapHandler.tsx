import React, { useEffect, useState } from 'react'
import { MapstateType } from '../@types'
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

export const useMapHandler = () => {
    const [mapState, setMapState] = useState<MapstateType>({
        mapRegion: {
            latitude: 3.0513006,
            longitude: 3.0513006,
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

    return {mapState,handleMapRegionChange}
}
