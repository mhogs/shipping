
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Fragment, useState } from 'react'
import { View, Text, Image, ScrollView, KeyboardAvoidingView, StyleSheet, Dimensions, TextInput, Modal, Pressable } from 'react-native'
import MapView from 'react-native-maps';
import { insuranceIconColored, LocationIcon, MobileIconColored, searchIcon, searchIconGrey, trackIconColored } from '../../assets';
import { SaveChangesButton, SocialLoginButton } from '../../components/buttons';
import { HelpCenterCategoryItem, LocationItem } from '../../components/content';
import { EmailIcon, PlusIcon, ThreeDotsIcon, WhatsAppIcon } from '../../components/icons';
import { SearchInput } from '../../components/inputs';
import { useHideBottomBar } from '../../components/navigation';
import { Devider, SimpleScreenHeader, Space } from '../../components/util'
import { listToMatrix } from '../../helpers';
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { MessagesStackParamList } from '../../navigation/MessagesStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { helpCentercategories } from './help-center-screen';
import { QuestionsListView } from './questionsList';

type HelpCenterCategoryScreenProps = NativeStackScreenProps<HelpCenterStackParamList & MessagesStackParamList, 'HelpCategory'>;
export const HelpCenterCategoryScreen = ({ route, navigation }: HelpCenterCategoryScreenProps) => {
    useHideBottomBar(navigation, 2)
    const { name: categoryName } = route.params
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <KeyboardAvoidingView style={styles.root} >
            <SimpleScreenHeader
                title={`Help Center - ${categoryName}`}
                goBack={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false} >


                <SearchInput
                    startIcon={<Image source={searchIconGrey} />}
                    placeholder='Tap to search faq'
                    placeholderTextColor={theme.palette.grey[theme.mode][3]}
                    extraStyle={styles.searchBox}
                />
                <View >
                    <Text style={styles.sectionTitle} >
                        Category
                    </Text>
                    <View>

                        <HelpCenterCategoryItem
                            icon={helpCentercategories.find(item => item.name = categoryName)?.icon}
                            name={categoryName}
                        />

                    </View>
                    <Text style={styles.sectionTitle} >
                        FAQ
                    </Text>
                    {/** questions list  */}
                    <QuestionsListView navigation={navigation} />
                    
                   
                </View>
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

