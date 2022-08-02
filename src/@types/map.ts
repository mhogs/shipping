import { Region } from "react-native-maps";
import {LocationObject} from 'expo-location';

export type MapstateType = {
    mapRegion: Region,
    hasLocationPermissions: boolean,
    locationResult: LocationObject | null,
    errorMsg: string | null,

}