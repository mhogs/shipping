
import { View, StyleSheet, StatusBar, Image, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { SimpleScreenHeader, Space } from '../../components/util';
import { AuthActionButton, SaveChangesButton } from '../../components/buttons';
import { CheckRatesModal } from './check-rates-modal';
import { useHideBottomBar } from '../../components/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GooglePlacesInput, MyTextInput } from '../../components/inputs';
import { CkeckRatesParamList } from '../../navigation/CheckRatesStack';
import { boxSearchIcon, gpsIcon } from '../../assets';
import * as yup from 'yup';
import { Formik, useFormik } from 'formik';
import { locationType } from '../../@types';
import { ScrollView } from 'react-native-gesture-handler';
import { i18n, isRTL, useTranslation } from '../../locales';


const checkRateShema = yup.object().shape({
  pickup: yup.object().required(),
  destination: yup.object().required(),
  weight: yup.number().required(),
});

type ChackRatesScreenProps = NativeStackScreenProps<CkeckRatesParamList, 'CkeckRates'>;
export const ChackRatesScreen = (props: ChackRatesScreenProps) => {
  const { navigation } = props;
  useHideBottomBar(navigation, 2)
  const { t } = useTranslation("check_rates")
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme,isRTL()])  
  const [modal, setModal] = useState(false);

  const { handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue } = useFormik({
    initialValues: {
      pickup: null,
      destination: null,
      weight: ""
    },
    onSubmit: (values) => {
      setModal(true)
    },
    validationSchema: checkRateShema
  }

  )


  return (

    <KeyboardAvoidingView style={styles.root} >



      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={theme.palette.white[theme.mode].main}
      />
      <SimpleScreenHeader
        title={t('Check Rates') }
        goBack={() => navigation.goBack()}
      />
      
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'

      >
        <View style={{ flex: 1 }}>
          <GooglePlacesInput
            label={t('Pickup Adress')}
            placeholder={t('Where to pickup from')}
            onChange={(adress: locationType) => setFieldValue("pickup", adress)}
            icon={<Image source={gpsIcon} />}
            touched={touched.pickup}
            error={errors.pickup}
            onBlur={handleBlur("pickup")}
          />
         
          <Space direction='vertical' size={30} />
          <GooglePlacesInput
            label={t('Drop Adress')}
            placeholder={t('Where to drop')}
            onChange={(adress) => setFieldValue("destination", adress)}
            icon={<Image source={gpsIcon} />}
            touched={touched.destination}
            error={errors.destination}
            onBlur={handleBlur("destination")}
          />
          <Space direction='vertical' size={30} />

          <MyTextInput
            label={t('Weight')}
            placeholder='0'
            isNumeric={true}
            startIcon={<Image source={boxSearchIcon} />}
            endIcon={<Text style={styles.unit}>{t("kg")}</Text>}
            value={values.weight}
            onChangeText={handleChange('weight')}
            onBlur={handleBlur('weight')}
            touched={touched.weight}
            error={errors.weight}
          />

          <Space direction='vertical' size={40} />
          <SaveChangesButton
            text={t('Check')}
            onPress={handleSubmit}
            disabled={!isValid}
          />
        </View>
        <CheckRatesModal
          visible={modal}
          closeModal={() => setModal(false)}
          route={values}
        />
      </ScrollView>




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
      paddingHorizontal: 24,
      backgroundColor: palette.bg[theme.mode].main,
    },
    unit: {
      ...text.medium.P14_Lh130,
      color: palette.text[mode].main
    },
  })
}
