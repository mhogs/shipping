import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation, changeLanguage } from './src/locales'
import { LoginScreen, RegisterScreen } from './src/screens/auth-screens';
import { HomeScreen } from './src/screens/home-screens';


export default function App() {
  const { t } = useTranslation('home')
  const switch_lang=()=>changeLanguage('fr')
  
  return (
    <LoginScreen/>
  );
}


