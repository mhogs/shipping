import { AntDesign } from '@expo/vector-icons';
import React from 'react'

type IconPropsType={
    color?:string,
    size?:number
}


export const LeftArrowIcon = ({ color, size=16 }:IconPropsType) => {
    return (
        <AntDesign name="arrowleft" color={color} size={size}  />
    )
}
