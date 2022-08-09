export type BasicColorType = {
    main: string
    2: string
    3: string
}
export type ColorType = {
    light: BasicColorType,
    dark: BasicColorType
}

export type TextStyleType = {
    fontSize: number,
    fontWeight: "600" | "500" | "400",
    lineHeight?: number,
    fontFamily: string
}
export type TypographyType = {
    P20_Lh180: TextStyleType,
    P18_Lh180: TextStyleType,
    P16_Lh180: TextStyleType,
    P14_Lh180: TextStyleType,
    P12_Lh180: TextStyleType,
    P20_Lh130: TextStyleType,
    P18_Lh130: TextStyleType,
    P16_Lh130: TextStyleType,
    P14_Lh130: TextStyleType,
    P12_Lh130: TextStyleType,
    P10_Lh130?: TextStyleType,
    P8_Lh130?: TextStyleType
}
export type ThemeType = {
    mode: "dark" | "light",
    palette: {
        primary: ColorType,
        black: ColorType,
        grey: ColorType,
        lightGrey: ColorType,
        white: ColorType,
        warning: ColorType,
        success: ColorType,
        danger: ColorType,
        bg: ColorType,
        text: ColorType
    },
    text: {
        heading: {
            H1: TextStyleType,
            H2: TextStyleType,
            H3: TextStyleType,
            H4: TextStyleType,
            H5: TextStyleType,
        }
        regular: TypographyType,
        medium: TypographyType,
    }
}

export const defaultTheme: ThemeType = {
    mode: "light",
    palette: {
        primary: {
            light: {
                main: "#133BB7",
                2: "#10329B",
                3: "#BBCBFF"
            },
            dark: {
                main: "#3264FF",
                2: "#7698FF",
                3: "#0D277A"
            }
        },
        black: {
            light: {
                main: "#191D31",
                2: "#666876",
                3: "#8C8E98",
            },
            dark: {
                main: "#ffffff",
                2: "#29303C",
                3: "#757788"
            }
        },
        white: {
            light: {
                main: "#FFFFFF",
                2: "#FFFFFF",
                3: "#FFFFFF"
            },
            dark: {
                main: "#FFFFFF",
                2: "#000000",
                3: "#000000"
            }
        },
        grey: {
            light: {
                main: "#A7A9B7",
                2: "#B6B7C3",
                3: "#C4C6CF"
            },
            dark: {
                main: "#A7A9B7",
                2: "#B6B7C3",
                3: "#C4C6CF"
            }
        },
        lightGrey: {
            light: {
                main: "#F3F3F3",
                2: "#F9F9F9",
                3: "#F8F9FB"
            },
            dark: {
                main: "#0F1621",
                2: "#182231",
                3: "#757788"
            },
        },
        warning: {
            light: {
                main: "#E68C00",
                2: "#FFC96E",
                3: "#FFF8E9"
            },
            dark: {
                main: "#FFB436",
                2: "#FFCD79",
                3: "#FFE6BC"
            }
        },
        success: {
            light: {
                main: "#00D261",
                2: "#39FF94",
                3: "#E1FFF1"
            },
            dark: {
                main: "#00D261",
                2: "#39FF94",
                3: "#E1FFF1"
            }
        },
        danger: {
            light: {
                main: "#E50000",
                2: "#FF4C4D",
                3: "#FFDBDB"
            },
            dark: {
                main: "#E50000",
                2: "#FF4C4D",
                3: "#FFDBDB"
            }
        },
        bg: {
            light: {
                main: "#ffffff",
                2: "#F8F9FB",
                3: "#FFFFFF"
            },
            dark: {
                main: "#0F1621",
                2: "#182231",
                3: "#000000"
            }
        },
        text: {
            light: {
                main: "#191D31",
                2: "#666876",
                3: "#8C8E98",
            },
            dark: {
                main: "#ffffff",
                2: "#29303C",
                3: "#757788"
            }
        }

    },
    text: {
        heading: {
            H1: {
                fontSize: 22,
                fontWeight: "600",
                lineHeight: 28.6,
                fontFamily: 'Outfit_600SemiBold'
            },
            H2: {
                fontSize: 18,
                fontWeight: "600",
                lineHeight: 23.4,
                fontFamily: 'Outfit_600SemiBold'
            },
            H3: {
                fontSize: 16,
                fontWeight: "600",
                lineHeight: 20.8,
                fontFamily: 'Outfit_600SemiBold'
            },
            H4: {
                fontSize: 14,
                fontWeight: "600",
                lineHeight: 18.2,
                fontFamily: 'Outfit_600SemiBold'
            },
            H5: {
                fontSize: 12,
                fontWeight: "600",
                lineHeight: 15.6,
                fontFamily: 'Outfit_600SemiBold'
            },
        },
        regular: {
            P20_Lh180: {
                fontSize: 20,
                fontWeight: "400",
                lineHeight: 36,
                fontFamily: 'Outfit_400Regular'

            },
            P20_Lh130: {
                fontSize: 20,
                fontWeight: "400",
                lineHeight: 26,
                fontFamily: 'Outfit_400Regular'
            },
            P18_Lh180: {
                fontSize: 18,
                fontWeight: "400",
                lineHeight: 32.4,
                fontFamily: 'Outfit_400Regular'
            },
            P18_Lh130: {
                fontSize: 18,
                fontWeight: "400",
                lineHeight: 23.4,
                fontFamily: 'Outfit_400Regular'
            },
            P16_Lh180: {
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 28.8,
                fontFamily: 'Outfit_400Regular'
            },
            P16_Lh130: {
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 20.8,
                fontFamily: 'Outfit_400Regular'
            },
            P14_Lh180: {
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 25.2,
                fontFamily: 'Outfit_400Regular'
            },
            P14_Lh130: {
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 18.2,
                fontFamily: 'Outfit_400Regular'
            },
            P12_Lh180: {
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 21.6,
                fontFamily: 'Outfit_400Regular'
            },
            P12_Lh130: {
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
                fontFamily: 'Outfit_400Regular'
            },
            P10_Lh130: {
                fontSize: 10,
                fontWeight: "400",
                lineHeight: 13,
                fontFamily: 'Outfit_400Regular'
            },
            P8_Lh130: {
                fontSize: 8,
                fontWeight: "400",
                lineHeight: 10,
                fontFamily: 'Outfit_400Regular'
            },

        },
        medium: {
            P20_Lh180: {
                fontSize: 20,
                fontWeight: "500",
                lineHeight: 36,
                fontFamily: 'Outfit_500Medium'
            },
            P20_Lh130: {
                fontSize: 20,
                fontWeight: "400",
                lineHeight: 26,
                fontFamily: 'Outfit_500Medium'
            },
            P18_Lh180: {
                fontSize: 18,
                fontWeight: "400",
                lineHeight: 32.4,
                fontFamily: 'Outfit_500Medium'
            },
            P18_Lh130: {
                fontSize: 18,
                fontWeight: "400",
                lineHeight: 23.4,
                fontFamily: 'Outfit_500Medium'
            },
            P16_Lh180: {
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 28.8,
                fontFamily: 'Outfit_500Medium'
            },
            P16_Lh130: {
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 20.8,
                fontFamily: 'Outfit_500Medium'
            },
            P14_Lh180: {
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 25.2,
                fontFamily: 'Outfit_500Medium'
            },
            P14_Lh130: {
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 18.2,
                fontFamily: 'Outfit_500Medium'
            },
            P12_Lh180: {
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 21.6,
                fontFamily: 'Outfit_500Medium'
            },
            P12_Lh130: {
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
                fontFamily: 'Outfit_500Medium'
            },
        },
    }
}