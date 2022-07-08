import { AntDesign } from '@expo/vector-icons';
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

