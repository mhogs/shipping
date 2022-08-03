import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, TextInput, Modal, Pressable } from 'react-native'
import MapView, { LatLng, Marker } from 'react-native-maps';
import { OrdersResponseDataType } from '../../@types';
import { comingIcon, searchIcon, searchIconGrey } from '../../assets';
import { SaveChangesButton } from '../../components/buttons';
import { LocationItem } from '../../components/content';
import { DropLocationIcon, LocationIcon, PickUpLocationIcon, ThreeDotsIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { Devider, LoadingBlock, MyMarkerIcon, SimpleScreenHeader, Space } from '../../components/util'
import { useFetcher, useMapHandler, useRefreshOnFocus } from '../../hooks';
import { NearByStackParamList } from '../../navigation/NearByStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { DeliveryPlaces } from './components';

type NearByScreenProps = NativeStackScreenProps<NearByStackParamList, 'NearBy'>;
export const NearByScreen = ({ navigation }: NearByScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [selectedOreder, setSelectedOrder] = useState<OrdersResponseDataType | null>(null);
  const { mapState, handleMapRegionChange } = useMapHandler()
  const {
    data: orders,
    isLoading,
    refetch,
  } = useFetcher<OrdersResponseDataType>("nearByPlaces", "/orders/orders/", { as_driver: true })

  useRefreshOnFocus(refetch)
  return (

    <KeyboardAvoidingView style={styles.root} >
      <View style={{ paddingHorizontal: 24 }}>
        <SimpleScreenHeader
          title='NearBy Drop'
          goBack={() => navigation.goBack()}
          endIcon={<ThreeDotsIcon size={16} />}
        />
      </View>
      <ScrollView style={{ backgroundColor: "white", }}>
        <MapView
          region={mapState.mapRegion}
          onRegionChange={handleMapRegionChange}
          style={styles.map}
          
        >
          {mapState.hasLocationPermissions &&
            <>

              <Marker
                coordinate={
                  {
                    latitude: mapState?.locationResult?.coords.latitude,
                    longitude: mapState?.locationResult?.coords.longitude,
                  } as LatLng
                }
              >
                <MyMarkerIcon
                  maincolor={theme.palette.black[theme.mode].main}
                  secondaryColor="rgba(25, 29, 49, 0.15)"
                  icon={<Image source={comingIcon} />}
                />
              </Marker>

            </>

          }
          <DeliveryPlaces orders={orders} />
        </MapView>

        <View style={{ padding: 24 }}>
          <SearchInput
            startIcon={<Image source={searchIconGrey} />}
            placeholder='Search Location'
            placeholderTextColor={theme.palette.grey[theme.mode][3]}
            extraStyle={styles.searchBox}
            
          />
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          {isLoading && <LoadingBlock />}
          {orders &&
            orders.map((order, index) => (
              <Fragment key={index}>
                <LocationItem
                  icon={
                    order.state == "on_progress" ?
                      <DropLocationIcon size={24} color={theme.palette.primary[theme.mode].main} />
                      :
                      <PickUpLocationIcon size={24} color={theme.palette.warning[theme.mode].main} />
                  }
                  title={order.description}
                  place={order.destination?.place}
                  distance="3.7km"
                  onPress={() => setSelectedOrder(order)}
                />
                <Devider spacing={8} />
              </Fragment>
            ))
          }
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedOreder !== null}
        onRequestClose={() => { }}
      >
        <View
          style={styles.modalContainer}

        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setSelectedOrder(null)}
          >

          </Pressable>
          <ScrollView style={{ backgroundColor: theme.palette.white[theme.mode].main }}>
            <View style={styles.modalContent}>
              <View style={styles.modalIcon}>
                {
                  selectedOreder?.state == "pending" ?
                    <PickUpLocationIcon size={24} color={theme.palette.warning[theme.mode].main} />
                    :
                    <DropLocationIcon size={24} color={theme.palette.primary[theme.mode].main} />
                }

              </View>
              <Space size={20} direction="vertical" />
              <Text style={styles.modelContentTitle}>
                {selectedOreder?.description}
              </Text>
              <Text style={styles.adressText}>
                {
                  selectedOreder?.state == "pending" ?
                    selectedOreder.pickup?.place :
                    selectedOreder?.destination?.place
                }
              </Text>
              <Devider spacing={15} />
              <Text style={styles.phoneText} >
                {selectedOreder?.creator_details?.phonenumber}
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

    /**modal */

    modalContainer: {
      flex: 1,
    },
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


