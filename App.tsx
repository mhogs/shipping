import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation, changeLanguage } from './src/locales'


export default function App() {
  const { t } = useTranslation('home')
  const switch_lang=()=>changeLanguage('fr')
  
  return (
    <View style={styles.container}>
      <Text>hello.......... {t('title')}</Text>
      <Pressable onPress={switch_lang}>
        <Text>change</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
