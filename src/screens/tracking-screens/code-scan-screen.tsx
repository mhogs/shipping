import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { DiscountIcon, EmptyOrderHistory, MessageNotifIcon, PackageIcon, scanIcon, scanSuccessful, searchIconGrey, sucessfulPaymentImage } from '../../assets'
import { OrderItem } from '../../components/content/order-item'
import { SearchInput } from '../../components/inputs'

import { NotificationItem, useHideBottomBar } from '../../components/navigation'
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { NotificationsStackParamList } from '../../navigation/NotificationsStack'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { TrackingStackParamList } from '../../navigation/TrackingStack'
import { useAuth } from '../../state'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { OperationSuccessfulModal } from '../../components/modals'

type CodeScanScreenProps = NativeStackScreenProps<TrackingStackParamList, 'Tracking'>;

export const CodeScanScreen = ({ navigation }: CodeScanScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 2)
  const { navigate } = navigation
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])  
  /**  */
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setModalOpen(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (

    <View style={styles.root}>
      <SimpleScreenHeader title="Scan Barcode" goBack={goBack} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={{ flex: 1, justifyContent: 'center', }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned &&
            <Pressable onPress={() => setScanned(false)} >
              <Text>
                Tap to Scan Again
              </Text>
            </Pressable>}
        </View>

        <OperationSuccessfulModal
          visible={modalOpen}
          image={scanSuccessful}
          closeModal={() => setModalOpen(false)}
          title="Scan Successfully"
          sub_title='Yey! Your package has been identified,
           click the button below to confirm reception '
          buttonText='Confirm Reception'
          onBtnPress={()=>navigate("Tracking")}
        />

      </ScrollView>
    </View>




  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      padding: 24,
      backgroundColor: palette.white[theme.mode].main,
    }
  })
}

