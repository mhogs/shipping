
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { Fragment, useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Pressable } from 'react-native'
import { faqCategoriesResponseDataType } from '../../@types';
import { insuranceIconColored, MobileIconColored, searchIconGrey, trackIconColored } from '../../assets';
import { SocialLoginButton } from '../../components/buttons';
import { HelpCenterCategoryItem } from '../../components/content';
import { EmailIcon, ThreeDotsIcon, WhatsAppIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { LoadingBlock, SimpleScreenHeader, Space } from '../../components/util'
import { listToMatrix } from '../../helpers';
import { useFaqCategories } from '../../hooks';
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { MessagesStackParamList } from '../../navigation/MessagesStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { QuestionsListView } from './components/faq-list';


type HelpCenterScreenProps = NativeStackScreenProps<HelpCenterStackParamList & MessagesStackParamList, 'Help'>;
export const HelpCenterScreen = ({ navigation }: HelpCenterScreenProps) => {
  useHideBottomBar(navigation, 2)
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])  
  const {
    fasq_categories,
    faqs_cats_loading
  } = useFaqCategories()

  return (
    <Formik
      initialValues={{
        search: "",
      }}
      onSubmit={() => { }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
        <KeyboardAvoidingView style={styles.root} >
          <SimpleScreenHeader
            title='Help Center'
            goBack={() => navigation.goBack()}
            endIcon={<ThreeDotsIcon size={16} />}
          />
          <ScrollView showsVerticalScrollIndicator={false} >


            <SearchInput
              startIcon={<Image source={searchIconGrey} />}
              placeholder='Tap to search faq'
              placeholderTextColor={theme.palette.grey[theme.mode][3]}
              extraStyle={styles.searchBox}
              value={values.search}
              onChangeText={handleChange('search')}
            />
            <View >
              <Text style={styles.sectionTitle} >
                Categories
              </Text>
              {faqs_cats_loading && <LoadingBlock />}
              <View>
                {values.search === "" && fasq_categories?.length &&
                  listToMatrix(fasq_categories, 2).map((row, index) => (
                    <Fragment key={index}>
                      <View style={styles.row}>
                        {
                          row.map((category, index) => (
                            <Fragment key={index}>
                              <HelpCenterCategoryItem
                                {...category}
                                onPress={() => navigation.navigate("HelpCategory", { category })}
                              />
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

              <QuestionsListView navigation={navigation} params={{ search: values.search }} />

              <Text style={styles.customerServiceText} >
                Contact Customer Service
              </Text>
              <View>
                <SocialLoginButton
                  label='Contact Via Whatsapp'
                  textColor={theme.palette.white[theme.mode].main}
                  bgColor="#33BD46"
                  icon={<WhatsAppIcon color={theme.palette.white[theme.mode].main} />}
                  onClick={() => { }}
                />
                <Space direction='vertical' size={15} />
                <SocialLoginButton
                  label='Contact With Email'
                  textColor={theme.palette.text[theme.mode].main}
                 
                  bgColor={theme.palette.bg[theme.mode][2]}
                  icon={<EmailIcon color={theme.palette.text[theme.mode].main} />}
                  onClick={() => { }}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}
const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      position: 'relative',
      padding: 24,
      backgroundColor: palette.bg[mode].main,
    },

    searchBox: {
      backgroundColor: palette.bg[mode][2],
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 12,
      alignItems: 'center',
      paddingHorizontal: 14,
    },
    sectionTitle: {
      ...text.heading.H3,
      color: palette.text[mode].main,
      marginTop: 20,
      marginBottom: 15
    },
    row: {
      flexDirection: 'row'
    },
    
   
    customerServiceText: {
      ...text.heading.H3,
      color: palette.text[mode].main,
      marginVertical: 20
    }
  })
}

