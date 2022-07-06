import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from './src/locales'


export default function App() {
  const { t } = useTranslation('home')
  const { t: tcommon } = useTranslation()
  
  return (
    <View style={styles.container}>
      <Text>hello.......... {t('title')}</Text>
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
