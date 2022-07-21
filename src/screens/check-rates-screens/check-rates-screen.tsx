


import { View, StyleSheet, StatusBar, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { SimpleScreenHeader, Space } from '../../components/util';
import { AuthActionButton } from '../../components/buttons';
import { CheckRatesModal } from './check-rates-modal';
import { useHideBottomBar } from '../../components/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GooglePlacesInput, MyTextInput } from '../../components/inputs';
import { CkeckRatesParamList } from '../../navigation/CheckRatesStack';
import { boxSearchIcon, gpsIcon } from '../../assets';

type ChackRatesScreenProps = NativeStackScreenProps<CkeckRatesParamList, 'CkeckRates'>;
export const ChackRatesScreen = (props : ChackRatesScreenProps) => {
    const { navigation } = props;
    useHideBottomBar(navigation,2)
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const [modal, setModal] = useState(false);
    
    const [pickupLocation, setPickupLocation] = useState(null);
    const [destination, setDestination] = useState(null);

    const checkRate = ()=>{
      setModal(true)
    }

    return (
        <>
            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={theme.palette.white[theme.mode].main}
            />
            <View style={styles.root} >
                <SimpleScreenHeader
                    title='Check Rates'
                    goBack={()=>navigation.goBack()}
                />
                <Space direction='vertical' size={35} />
                <View style={{flex:1}}>
                  <GooglePlacesInput 
                    placeholder='Pick up Location'
                    onChange={setPickupLocation}
                    icon={gpsIcon}
                  />
                  <Space direction='vertical' size={30} />
                  <GooglePlacesInput
                    placeholder='Package Destination'
                    onChange={setDestination}
                    icon={gpsIcon}
                  />
                  <Space direction='vertical' size={30} />

                  <MyTextInput 
                    label='Weight'
                    placeholder='0'
                    isNumeric={true}
                    startIcon={<Image source={boxSearchIcon}/>}
                    endIcon={<Text style={styles.unit}>Kg</Text>}
                  />

                  <Space direction='vertical' size={40} />
                  <AuthActionButton
                    label='Check' 
                    onClick={checkRate}
                  />
                </View>

                
            </View>

            <CheckRatesModal 
              visible={modal} 
              closeModal={() => setModal(false)}
            />
        </>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            position: 'relative',
            paddingTop:24,
            paddingHorizontal: 24,
            backgroundColor: palette.white[theme.mode][3],
        },
        unit: {
          ...text.medium.P14_Lh130,
          color: palette.black[mode].main
      },
    })
}
