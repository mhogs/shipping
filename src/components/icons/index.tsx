import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

import React from 'react'

type IconPropsType={
    color?:string,
    size?:number
}


export const LeftArrowIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="arrowleft" color={color} size={size}  />
    )
}
export const CheckedIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="checkcircle" color={color} size={size} />
    )
}
export const EyeIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="eyeo" color={color} size={size} />
    )
}
export const CheckIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="check" color={color} size={size} />
    )
}

export const LockOutLineIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialIcons name="lock-outline" color={color} size={size} />
    )
}
export const NotificationMessgaeIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialCommunityIcons name="message-processing" color={color} size={size} />
    )
}
export const ThreeDotsIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Entypo name="dots-three-vertical" color={color} size={size}  />
    )
}
export const ClockIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialCommunityIcons name="clock-time-five-outline" color={color} size={size} />
    )
}
export const CloseIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialCommunityIcons name="close" color={color} size={size} />
    )
}

export const FilterIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Ionicons name="ios-filter-outline" color={color} size={size} />
    )
}
export const SearchIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Feather name="search" color={color} size={size} />
    )
}




