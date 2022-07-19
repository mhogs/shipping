import { View, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { SimpleScreenHeader, Space } from '../../../components/util';
import { ScrollView } from 'react-native-gesture-handler';
import { MyTextAreaInput, MyTextInput } from '../../../components/inputs';
import { callIcon, locationIcon, ProfileIcon } from '../../../assets';
import { AuthActionButton } from '../../../components/buttons';


export const SenderDetailsScreen = ({navigation, switchIndex}: any) => {
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const next = ()=>{
      switchIndex(1);
    }

    return (
      <>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={theme.palette.white[theme.mode].main}
        />
        <View style={styles.root} >
          <SimpleScreenHeader
            title='Sender details'
            goBack={() => navigation.goBack()}
          />
          <Space direction='vertical' size={35} />
          <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            <MyTextInput
                label='Full Name'
                placeholder='Enter your name'
                startIcon={<Image source={ProfileIcon} />}
            />
            <Space direction='vertical' size={20} />
            <MyTextInput
                label='Phone Number'
                placeholder='Enter your number'
                startIcon={<Image source={callIcon} />}
            />
            <Space direction='vertical' size={20} />
            <MyTextInput
                label='City / Province'
                placeholder='Enter your city / province'
                startIcon={<Image source={locationIcon} />}
            />
            <Space direction='vertical' size={20} />
            <MyTextAreaInput 
              label={'Detail Location'}
              placeholder={'Type detailed location to make it easier for us to pick up the package'}
              h={160}
            />
          </ScrollView>
          <View style={styles.actionContainer}>
            <AuthActionButton 
                label='Continue'
                onClick={next}
            />
          </View>
        </View>
        
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
      actionContainer: {
        marginBottom:20
      }
    })
}