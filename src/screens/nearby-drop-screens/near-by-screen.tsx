import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, Modal, Pressable } from 'react-native'
import MapView, { LatLng, Marker } from 'react-native-maps';
import { OrdersResponseDataType } from '../../@types';
import { comingIcon, searchIconGrey } from '../../assets';
import { SaveChangesButton } from '../../components/buttons';
import { LocationItem } from '../../components/content';
import { DropLocationIcon, PickUpLocationIcon, ThreeDotsIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { Devider, LoadingBlock, MyMarkerIcon, SimpleScreenHeader, Space } from '../../components/util'
import { useMapHandler, useOrders, useRefreshOnFocus } from '../../hooks';
import { NearByStackParamList } from '../../navigation/NearByStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { DeliveryPlaces, LocationModal } from './components';

type NearByScreenProps = NativeStackScreenProps<NearByStackParamList, 'NearBy'>;
export const NearByScreen = ({ navigation }: NearByScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])
  const [search, setSearch] = useState("")
  const [selectedOreder, setSelectedOrder] = useState<OrdersResponseDataType | null>(null);
  const { mapState, handleMapRegionChange } = useMapHandler()
  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({ as_driver: true })

  const filteredOrders = orders?.filter(order => order.description?.includes(search))
  useRefreshOnFocus(refetch)
  return (

    <KeyboardAvoidingView style={styles.root} >
      <View style={{ paddingHorizontal: 24 }}>
        <SimpleScreenHeader
          title='NearBy Drop'
          goBack={() => navigation.goBack()}
          endIcon={<ThreeDotsIcon size={16} color={theme.palette.text[theme.mode].main} />}
        />
      </View>
      <ScrollView >
        <MapView
          region={mapState.mapRegion}
          onRegionChange={handleMapRegionChange}
          style={styles.map}
          mapType="standard"

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
                  maincolor={theme.palette.black["light"].main}
                  secondaryColor="rgba(25, 29, 49, 0.15)"
                  icon={<Image source={comingIcon} />}
                />
              </Marker>

            </>

          }
          <DeliveryPlaces orders={filteredOrders} />
        </MapView>

        <View style={{ padding: 24 }}>
          <SearchInput
            startIcon={<Image source={searchIconGrey} />}
            placeholder='Search Location'
            placeholderTextColor={theme.palette.grey[theme.mode][3]}
            extraStyle={styles.searchBox}
            onChangeText={(text) => setSearch(text)}
          />
        </View>

        <View style={{ paddingHorizontal: 24 }}>
          {isLoading && <LoadingBlock />}
          {filteredOrders &&
            filteredOrders.map((order, index) => (
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
      <LocationModal selectedOreder={selectedOreder} setSelectedOrder={setSelectedOrder} />

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
      color: palette.text[mode].main
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


