import React, { FC } from "react"
import { View } from "react-native"

type SpaceProps = {
    size: number,
    direction?: 'horizontal' | 'vertical'
}
export const Space: FC<SpaceProps> = (props) => {
    const { size, direction = 'horizontal' } = props
    if (direction === "horizontal")
        return (
            <View style={{ width: size }}>

            </View>
        )
    return (
        <View style={{ height: size }}>

        </View>
    )
}