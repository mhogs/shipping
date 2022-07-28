
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { searchIconGrey } from '../../assets';
import { HelpCenterCategoryItem } from '../../components/content';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { SimpleScreenHeader } from '../../components/util'
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { MessagesStackParamList } from '../../navigation/MessagesStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { QuestionsListView } from './components/faq-list';

type HelpCenterCategoryScreenProps = NativeStackScreenProps<HelpCenterStackParamList & MessagesStackParamList, 'HelpCategory'>;
export const HelpCenterCategoryScreen = ({ route, navigation }: HelpCenterCategoryScreenProps) => {
    useHideBottomBar(navigation, 2)
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const { category } = route.params

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
                        title={`Help Center - ${category.name}`}
                        goBack={navigation.goBack}
                    />
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <SearchInput
                            startIcon={<Image source={searchIconGrey} />}
                            placeholder='Tap to search faq'
                            placeholderTextColor={theme.palette.grey[theme.mode][3]}
                            extraStyle={styles.searchBox}
                            value={values.search}
                            onChangeText={handleChange("search")}
                        />
                        <View >
                            <Text style={styles.sectionTitle} >
                                Category
                            </Text>
                            <View>

                                <HelpCenterCategoryItem
                                    {...category}
                                />

                            </View>
                            <Text style={styles.sectionTitle} >
                                FAQ
                            </Text>
                            {/** questions list  */}
                            {
                                <QuestionsListView
                                    navigation={navigation}
                                    params={
                                        {
                                            category: category.id,
                                            search: values.search
                                        }
                                    }
                                />}

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

        customerServiceText: {
            ...text.heading.H3,
            color: palette.black[mode].main,
            marginVertical: 20
        }
    })
}

