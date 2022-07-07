

import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Navigation } from './src/navigation';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, } from '@expo-google-fonts/outfit';
import { Image } from 'react-native';

export default function App() {

  const appIsReady = useAppLoader()

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>

  );
}


const useAppLoader = () => {

  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setAppIsReady(fontsLoaded)
  }, [fontsLoaded])

  useEffect(() => {
    async function prepare() {
      try {
        if (!appIsReady)
          await SplashScreen.preventAutoHideAsync();
        else
          await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [appIsReady]);

  return appIsReady
}

