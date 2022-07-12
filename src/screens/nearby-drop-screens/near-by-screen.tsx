import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, TextInput, Modal, Pressable } from 'react-native'
import MapView from 'react-native-maps';
import { LocationIcon, searchIcon, searchIconGrey } from '../../assets';
import { SaveChangesButton } from '../../components/buttons';
import { LocationItem } from '../../components/content';
import { ThreeDotsIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { NearByStackParamList } from '../../navigation/NearByStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';

type NearByScreenProps = NativeStackScreenProps<NearByStackParamList, 'NearBy'>;
export const NearByScreen = ({ navigation }: NearByScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [modalVisible, setModalVisible] = useState(false);
  return (

    <KeyboardAvoidingView style={styles.root} >
      <View style={{ paddingHorizontal: 24 }}>
        <SimpleScreenHeader
          title='NearBy Drop'
          goBack={() => navigation.goBack()}
          endIcon={<ThreeDotsIcon size={16} />}
        />
      </View>
      <ScrollView style={{ backgroundColor: "white", marginVertical: 16 }}>
        <MapView style={styles.map} />

        <View style={{ padding: 24 }}>
          <SearchInput
            startIcon={<Image source={searchIconGrey} width={24} height={24} />}
            placeholder='Search Location'
            placeholderTextColor={theme.palette.grey[theme.mode][3]}
            extraStyle={styles.searchBox}
          />
        </View>


        <View style={{ paddingHorizontal: 24 }}>

          {
            locations.map((location, index) => (
              <Fragment key={index}>
                <LocationItem {...location}
                  onPress={() => setModalVisible(true)}
                />
                <Space size={15} direction="vertical" />
              </Fragment>
            ))
          }


        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={styles.modalContainer}

        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(!modalVisible)}
          >

          </Pressable>
          <ScrollView style={{ backgroundColor: theme.palette.white[theme.mode].main }}>
            <View style={styles.modalContent}>
              <View style={styles.modalIcon}>
                <Image source={LocationIcon} style={{ width: 32, height: 32 }} />
              </View>
              <Space size={20} direction="vertical" />
              <Text style={styles.modelContentTitle}>
                New Montgomery
              </Text>
              <Text style={styles.adressText}>
                4517 Washington Ave. Manchester, Kentucky 39495
              </Text>
              <Devider spacing={15} />
              <Text style={styles.phoneText} >
                0799085706
              </Text>
              <Devider spacing={15} />
              <View style={{ alignSelf: "stretch", marginTop: 15 }}>
                <SaveChangesButton text='Dial' onPress={() => { }} />
                <Space direction='vertical' size={15} />
                <SaveChangesButton
                  text='Direction'
                  onPress={() => { }}
                  bgColor={theme.palette.white[theme.mode].main}
                  textColor={theme.palette.black[theme.mode].main}
                />
              </View>
            </View>
          </ScrollView>

        </View>
      </Modal>

    </KeyboardAvoidingView>




  )
}
const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      position: 'relative',
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
    modalContainer: {
      flex: 1,


    },
    /**modal */
    modalContent: {
      padding: 24,
      height: "70%",
      alignItems: "center"
    },
    modalOverlay: {
      height: "30%",
      backgroundColor: 'rgba(25, 29, 49, 0.3)',
    },

    modalIcon: {
      padding: 24,
      borderRadius: 18,
      backgroundColor: palette.lightGrey[mode].main
    },
    modelContentTitle: {
      ...text.medium.P18_Lh130,
      color: palette.black[mode].main
    },
    adressText: {
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main,
      textAlign: "center"
    },
    phoneText: {
      ...text.regular.P14_Lh130,
      color: palette.grey[mode].main
    }

  })
}


const locations = [
  {
    icon: <Image source={LocationIcon} width={22} height={22} />,
    title: "New Montgomery",
    description: '4517 Washington Ave. Manchester. Washington Ave. Mancheste ',
    time: "3.21 Km",
  },
  {
    icon: <Image source={LocationIcon} width={22} height={22} />,
    title: "New Montgomery",
    description: '4517 Washington Ave. Manchester. Washington Ave. Mancheste ',
    time: "3.21 Km",
  },
  {
    icon: <Image source={LocationIcon} width={22} height={22} />,
    title: "New Montgomery",
    description: '4517 Washington Ave. Manchester. Washington Ave. Mancheste ',
    time: "3.21 Km",
  },
  {
    icon: <Image source={LocationIcon} width={22} height={22} />,
    title: "New Montgomery",
    description: '4517 Washington Ave. Manchester. Washington Ave. Mancheste ',
    time: "3.21 Km",
  }
]