
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, TextInput, Modal, Pressable } from 'react-native'
import MapView from 'react-native-maps';
import { insuranceIconColored, LocationIcon, MobileIconColored, searchIcon, searchIconGrey, trackIconColored } from '../../assets';
import { SaveChangesButton, SocialLoginButton } from '../../components/buttons';
import { LocationItem } from '../../components/content';
import { EmailIcon, PlusIcon, ThreeDotsIcon, WhatsAppIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { listToMatrix } from '../../helpers';
import { CheckRatesParamList } from '../../navigation/CheckRatesStack';
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';

type ChackRatesScreenProps = NativeStackScreenProps<CheckRatesParamList, "CkeckRates">;
export const ChackRatesScreen = ({ navigation }: ChackRatesScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <KeyboardAvoidingView style={styles.root} >
      <SimpleScreenHeader
        title='Check Rates'
        goBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} >

      </ScrollView>
    </KeyboardAvoidingView>




  )
}
const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      position: 'relative',
      padding: 24,
      backgroundColor: palette.white[theme.mode][3],
    }
  })
}


