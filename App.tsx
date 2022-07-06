
import { useTranslation, changeLanguage } from './src/locales'
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { BottomNavigationBar } from './src/navigation';


export default function App() {
  const { t } = useTranslation('home')
  const switch_lang = () => changeLanguage('fr')

  return (
    <NavigationContainer>
      <BottomNavigationBar />
    </NavigationContainer>

  );
}



