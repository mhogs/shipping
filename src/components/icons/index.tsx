import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

import React from 'react'

type IconPropsType={
    color?:string,
    size?:number
}


export const PickUpLocationIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialIcons name="add-location-alt"  color={color} size={size}  />
    )
}
export const LightDarkModeIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialCommunityIcons name="theme-light-dark"  color={color} size={size}  />
    )
}

export const DropLocationIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Entypo name="location"  color={color} size={size}  />
    )
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
export const EyeOffIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Ionicons name="eye-off-outline" color={color} size={size} />
    )
}

export const CheckIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="check" color={color} size={size} />
    )
}
export const PlusIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="plus" color={color} size={size} />
    )
}
export const PlusSquareIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="plussquare" color={color} size={size} />
    )
}

export const MinusIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="minus" color={color} size={size} />
    )
}
export const Arrowdown = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="down" color={color} size={size} />
    )
}
export const StarIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="star" color={color} size={size} />
    )
}


export const WhatsAppIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <FontAwesome name="whatsapp" color={color} size={size} />
    )
}
export const EmailIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Ionicons name="md-chatbox-ellipses-outline" color={color} size={size} />
    )
}
export const ChatlIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Ionicons name="chatbox-ellipses" color={color} size={size} />
    )
}
export const InfoIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialIcons name="info" color={color} size={size} />
    )
}
export const SignoutIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <AntDesign name="logout" color={color} size={size} />
    )
}


export const PhoneCallIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialIcons name="phone" color={color} size={size} />
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
export const CircleIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <FontAwesome5 name="circle" color={color} size={size} />
    )
}
export const SendIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Ionicons name="send" color={color} size={size} />
    )
}
export const AttachmentIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialIcons name="attachment"  color={color} size={size} />
    )
}
export const LocationIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <Ionicons name="md-location-sharp"  color={color} size={size} />
    )
}

export const MyLocationIcon = ({ color, size=24 }:IconPropsType) => {
    return (
        <MaterialIcons name="my-location"  color={color} size={size} />
    )
}







