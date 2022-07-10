import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, TextInput } from 'react-native'
import MapView from 'react-native-maps';
import { LocationIcon, searchIcon, searchIconGrey } from '../../assets';
import { LocationItem } from '../../components/content';
import { ThreeDotsIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { SimpleScreenHeader, Space } from '../../components/util'
import { NearByStackParamList } from '../../navigation/NearByStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';

type NearByScreenProps = NativeStackScreenProps<NearByStackParamList, 'NearBy'>;
export const NearByScreen = ({ navigation }: NearByScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = getStyles(theme)

  return (

    <KeyboardAvoidingView style={styles.root} >
      <View style={{ paddingHorizontal: 24 }}>
        <SimpleScreenHeader
          title='NearBy Drop'
          goBack={() => navigation.goBack()}
          endIcon={<ThreeDotsIcon size={16} />}
        />
      </View>
      <ScrollView>
        <MapView style={styles.map} />

        <View style={{ padding: 24 }}>
          <View style={styles.searchBox}>
            <Image source={searchIconGrey} width={24} height={24} />
            <TextInput
              placeholder='Enter track number'
              placeholderTextColor={theme.palette.grey[theme.mode][3]}
              style={styles.searchInput}
            />
          </View>
        </View>



        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}>
          <LocationItem
            icon={<Image source={LocationIcon} width={22} height={22} />}
            title="New Montgomery"
            description='4517 Washington Ave. Manchester. Washington Ave. Mancheste '
            time="3.21 Km"
          />
          <Space size={15} direction="vertical" />
          <LocationItem
            icon={<Image source={LocationIcon} width={22} height={22} />}
            title="New Montgomery"
            description='4517 Washington Ave. Manchester. Washington Ave. Mancheste '
            time="3.21 Km"
          />
          <Space size={15} direction="vertical" />
          <LocationItem
            icon={<Image source={LocationIcon} width={22} height={22} />}
            title="New Montgomery"
            description='4517 Washington Ave. Manchester. Washington Ave. Mancheste '
            time="3.21 Km"
          />
        </ScrollView>
      </ScrollView>

    </KeyboardAvoidingView>




  )
}
const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      paddingTop: 24,
      backgroundColor: palette.white[theme.mode][3],
    },
    map: {
      marginTop: 24,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 2.5,
    },
    searchBox: {
      backgroundColor: palette.lightGrey[mode][2],
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      alignItems: 'center',
      paddingHorizontal: 14,

    },
    searchInput: {
      padding: 14,
      flex: 1,
      color: palette.grey[mode][3]
    },

  })
}
