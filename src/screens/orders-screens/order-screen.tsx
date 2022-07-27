import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../../navigation/OrdersStack';
import { useHideBottomBar } from '../../components/navigation';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import { ClientDetailsScene, OrderDetailsScene, OrderRouteScene } from './steps'
import { RootStackParamList } from '../../navigation/BottomNavigationBar';
import { OrdersRequestDataType } from '../../@types';
import { useMutation } from '@tanstack/react-query';
import { OrdersServices } from '../../services';
import { useAuthentication } from '../../state';

export type OrderSceneProps = {
  navigation: NativeStackNavigationProp<OrderStackParamList & RootStackParamList, "order", undefined>
  moveForward: () => void
  moveBackward: () => void
  updateOrder:(data:OrdersRequestDataType)=>void
  order?:OrdersRequestDataType
}
type OrderScreenProps = NativeStackScreenProps<OrderStackParamList & RootStackParamList, 'order'>;
export const OrderScreen = (props: OrderScreenProps) => {
  const { navigation,route } = props;
  useHideBottomBar(navigation, 2)
  const layout = useWindowDimensions();
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "sender", title: "Sender Details" },
    { key: "route", title: "Route Details" },
    { key: "order", title: "Order Details" },
  ]);
  /**form state */
  const [order, setOrder] = useState<OrdersRequestDataType>({})
  
  
  
  const renderScene = (props: SceneRendererProps & {
    route: {
      key: string;
      title: string;
    };
  }) => {
    const { route } = props;

    switch (route.key) {

      case 'sender':
        return <ClientDetailsScene
          navigation={navigation}
          moveForward={() => setIndex(i => i + 1)}
          moveBackward={() => navigation.goBack()}
          updateOrder={(data:OrdersRequestDataType)=>setOrder(prev=>({...prev,...data}))}
          order={order}
        />;

      case 'route':
        return <OrderRouteScene
          navigation={navigation}
          moveForward={() => setIndex(i => i + 1)}
          moveBackward={() => setIndex(i => i - 1)}
          updateOrder={(data:OrdersRequestDataType)=>setOrder(prev=>({...prev,...data}))}
          order={order}
        />;

      case 'order':
        return <OrderDetailsScene
          navigation={navigation}
          moveForward={() => { }}
          moveBackward={() => setIndex(i => i - 1)}
          updateOrder={(data:OrdersRequestDataType)=>setOrder(prev=>({...prev,...data}))}
          order={order}
        />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={() => null}
        renderScene={renderScene}
        swipeEnabled={false}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  )
}
