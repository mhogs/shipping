
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
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { QuestionsListView } from './questionsList';

type HelpCenterScreenProps = NativeStackScreenProps<HelpCenterStackParamList, 'Help'>;
export const HelpCenterScreen = ({ navigation }: HelpCenterScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = getStyles(theme)
  const [modalVisible, setModalVisible] = useState(false);
  return (

    <ScrollView>

      <KeyboardAvoidingView style={styles.root} >

        <SimpleScreenHeader
          title='Help Center'
          goBack={() => navigation.goBack()}
          endIcon={<ThreeDotsIcon size={16} />}
        />
        <Space direction='vertical' size={30} />
        <SearchInput
          startIcon={<Image source={searchIconGrey} width={24} height={24} />}
          placeholder='Tap to search faq'
          placeholderTextColor={theme.palette.grey[theme.mode][3]}
          extraStyle={styles.searchBox}
        />
        <View >
          <Text style={styles.sectionTitle} >
            Categories
          </Text>
          <View>
            {
              listToMatrix(categories, 2).map((row, index) => (
                <Fragment key={index}>
                  <View style={styles.row}>
                    {
                      row.map(category => (
                        <Fragment key={category.name}>
                          <View style={styles.category}>
                            <Pressable
                              style={styles.categoryPressable}
                              onPress={() => { }}
                              android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: false }}
                            >
                              <Image source={category.icon} width={24} height={24} />
                              <Text style={styles.categoryName}>{category.name}</Text>
                            </Pressable>
                          </View>
                          <Space size={10} />
                        </Fragment>
                      ))
                    }
                  </View>
                  <Space size={10} direction='vertical' />
                </Fragment>

              ))
            }
          </View>
          <Text style={styles.sectionTitle} >
            Popular Searched
          </Text>
          <QuestionsListView />
          <Text style={styles.customerServiceText} >
            Contact Customer Service
          </Text>
          <View>
            <SocialLoginButton
              label='Contact Via Whatsapp'
              textColor={theme.palette.white[theme.mode].main}
              bgColor="#33BD46"
              icon={<WhatsAppIcon color={theme.palette.white[theme.mode].main} />}
              onClick={()=>{}}
            />
            <Space direction='vertical' size={15} />
             <SocialLoginButton
              label='Contact With Email'
              textColor={theme.palette.black[theme.mode].main}
              borderColor={theme.palette.grey[theme.mode].main}
              icon={<EmailIcon color={theme.palette.primary[theme.mode].main} />}
              onClick={()=>{}}
            />
          </View>
        </View>

      </KeyboardAvoidingView>


    </ScrollView>

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
    },

    searchBox: {
      backgroundColor: palette.lightGrey[mode][2],
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      alignItems: 'center',
      paddingHorizontal: 14,
    },
    sectionTitle: {
      ...text.heading.H3,
      color: palette.black[mode].main,
      marginTop: 20,
      marginBottom: 15
    },
    row: {
      flexDirection: 'row'
    },
    category: {
      flex: 1,
      borderRadius: 12,
      overflow: 'hidden',
      borderColor: palette.lightGrey[mode].main,
      borderWidth: 1
    },
    categoryPressable: {
      flexDirection: 'row',
      paddingVertical: 11,
      paddingHorizontal: 11,
      alignItems: 'center'
    },
    categoryName: {
      ...text.medium.P14_Lh180,
      color: palette.black[mode].main,
      marginLeft: 10
    },
    customerServiceText: {
      ...text.heading.H3,
      color: palette.black[mode].main,
      marginVertical: 20
    }
  })
}

const categories = [
  {
    name: 'Insurance',
    icon: insuranceIconColored,
    id: 'Insurance'
  },
  {
    name: 'App Guide',
    icon: MobileIconColored,
    id: 'App Guide'
  },
  {
    name: 'Track',
    icon: trackIconColored,
    id: 'Track'
  },
  {
    name: 'Check Rates',
    icon: trackIconColored,
    id: 'Check Rates'
  },

]