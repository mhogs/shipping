import { createContext, FC, useContext, useMemo, useState } from "react";
import { defaultTheme, ThemeType } from "../../theme";

type ThemeContextType = {
    theme: ThemeType
    switchMode: () => void
    changeTheme: (theme: ThemeType) => void
}
const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
    switchMode: () => { },
    changeTheme: (theme: ThemeType) => { }
})

export const ThemeProvider: FC<{}> = (props) => {
    const [theme, setTheme] = useState<ThemeType>(defaultTheme)
    const switchMode = () => {
        setTheme(prev => prev.mode === "light" ? { ...prev, mode: "dark" } : { ...prev, mode: 'light' })
    }
    const changeTheme = (theme: ThemeType) => {
        setTheme(theme)
    }
    const contextValue: ThemeContextType = useMemo(() => (
        {
            theme,
            switchMode,
            changeTheme
        }
    ), [])
    return (
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export const useTheme= ()=> useContext(ThemeContext)