import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderStackParamList } from '../../navigation/OrdersStack';
import { useHideBottomBar } from '../../components/navigation';
import { SceneRendererProps, TabView } from 'react-native-tab-view';
import { OrderDetailsScreen, SenderDetailsScreen } from './steps'


type OrderScreenProps = NativeStackScreenProps<OrderStackParamList, 'order'>;
export const OrderScreen = (props : OrderScreenProps) => {
    const { navigation } = props;
    useHideBottomBar(navigation,2)
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "sender", title: "Sender Details" },
        { key: "order", title: "Order Details" },
    ]);

    const renderScene = (props: SceneRendererProps & {
        route: {
          key: string;
          title: string;
        };
      }) => {
        const { route } = props;
    
        switch (route.key) {
          case 'sender':
            return <SenderDetailsScreen navigation={navigation} switchIndex={setIndex}/>;
          case 'order':
            return <OrderDetailsScreen navigation={navigation} switchIndex={setIndex}/>;
          default:
            return null;
        }
      };
    
    return (
        <View style={{flex: 1}}>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={()=>null}
                renderScene={renderScene}
                swipeEnabled={false}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}
