import { Region } from "react-native-maps";
import {LocationObject} from 'expo-location';

export type MapstateType = {
    mapRegion: Region,
    hasLocationPermissions: boolean,
    locationResult: LocationObject | null,
    errorMsg: string | null,

}
export type locationType = {
    id?: number
    latitude: number,
    longitude: number,
    place?: string,
    details?: string,
} | null

export type directionType={
    pickup:locationType,
    destination:locationType
}