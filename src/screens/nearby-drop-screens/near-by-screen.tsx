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
import { MyTabView, useHideBottomBar } from '../../components/navigation';
import { Devider, LoadingBlock, MyMarkerIcon, SimpleScreenHeader, Space } from '../../components/util'
import { useMapHandler, useOrders, useRefreshOnFocus } from '../../hooks';
import { NearByStackParamList } from '../../navigation/NearByStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { DeliveryPlaces, LocationModal, NearByLocationsList } from './components';
import { isRTL, useTranslation } from '../../locales';
import { SceneRendererProps } from 'react-native-tab-view';

type NearByScreenProps = NativeStackScreenProps<NearByStackParamList, 'NearBy'>;
export const NearByScreen = ({ navigation }: NearByScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme, isRTL()])
  const { t } = useTranslation("nearby")
  const [status, setStatus] = useState<"pending" | "on_progress" | "all">("all")
  const [selectedOreder, setSelectedOrder] = useState<OrdersResponseDataType | null>(null);
  const { mapState, handleMapRegionChange } = useMapHandler()
  const {
    data: orders,
    isLoading,
    refetch,
  } = useOrders({ as_driver: true })
  useRefreshOnFocus(refetch)

  const TabRoutes = [
    { key: "all", title: t("all") },
    { key: "pickup", title: t("pickup") },
    { key: "drop", title: t("drop") },
  ]
  const renderScene = (props: SceneRendererProps & {
    route: {
      key: string;
      title: string;
    };
  }) => {
    const { route } = props;

    switch (route.key) {
      case 'all':

        return <NearByLocationsList
          orders={orders}
          isLoading={isLoading}
          setSelectedOrder={setSelectedOrder}
        />
      case 'pickup':

        return <NearByLocationsList
          orders={orders?.filter(order => order.state === "pending")}
          isLoading={isLoading}
          setSelectedOrder={setSelectedOrder}
        />
      case 'drop':

        return <NearByLocationsList
          orders={orders?.filter(order => order.state === "on_progress")}
          isLoading={isLoading}
          setSelectedOrder={setSelectedOrder}
        />
      default:
        return null;
    }
  };

  return (

    <KeyboardAvoidingView style={styles.root} >
      <View style={{ paddingHorizontal: 24 }}>
        <SimpleScreenHeader
          title={t('NearBy Drop')}
          goBack={() => navigation.goBack()}
          endIcon={
            <Pressable
              style={{ padding: 4 }}
              android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
            >
              <ThreeDotsIcon size={16} color={theme.palette.text[theme.mode].main} />
            </Pressable>
          }
        />
      </View>
      <View style={{ flex: 1 }} >

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
          <DeliveryPlaces orders={orders} />
        </MapView>
        <View style={styles.body}>
          <MyTabView enabledSwip={false} tabRoutes={TabRoutes} sceneRendrer={renderScene} />
        </View>
      </View>
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
      backgroundColor: palette.bg[theme.mode].main,
    },
    body: {
      flex: 1,
      padding: 24
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 2.5,
    },
    searchBox: {
      backgroundColor: palette.bg[mode][2],
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


