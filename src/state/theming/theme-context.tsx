import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY } from "../../constants";
import { defaultTheme, ThemeType } from "../../constants/theme";
import { getModeFromStorage } from "../../helpers";

type ThemeContextType = {
    theme: ThemeType
    switchMode: () => void
    setTheme: Dispatch<SetStateAction<ThemeType>>
}
const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
    switchMode: () => { },
    setTheme: () => { }
})



export const ThemeProvider: FC<{}> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>(defaultTheme)
    function switchMode() {
        setTheme(prev => prev.mode === "light" ? ({ ...prev, mode: "dark" }) : ({ ...prev, mode: 'light' }))
    }
    const contextValue: ThemeContextType = useMemo(() => (
        {
            theme,
            switchMode,
            setTheme
        }
    ), [theme])


    useEffect(() => {
        async function loadThemeMode() {
            const mode = await getModeFromStorage()
            setTheme(prev => ({ ...prev, mode }))
        }
        loadThemeMode()
    }, [])

    useEffect(() => {
        async function saveThemeMode() {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme.mode)
        }
        saveThemeMode()
    }, [theme.mode])

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)