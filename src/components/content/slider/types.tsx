

export type onboardingItemType = {
    id: string,
    title: string,
    subTitle: string,
    image: any
}
export type onboardingItemProps = {
    item: onboardingItemType
}

export type sliderProps = {
    slides : onboardingItemType[]
}

export type SliderDotsProps = {
    lenght: number,
    active: number,
}