import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import { faqRequestParmsType, faqResponseDataType } from '../../../@types';

import { MinusIcon, PlusIcon } from '../../../components/icons';
import { Devider, LoadingBlock, Space } from '../../../components/util';
import { HelpCenterStackParamList } from '../../../navigation/HelpCenterStack';
import { MessagesStackParamList } from '../../../navigation/MessagesStack';
import { useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { useFetchFaqs } from '../custom-hooks';




type QuestionsListViewProps = {
    navigation: any,
    params?: faqRequestParmsType
}
export function QuestionsListView(props: QuestionsListViewProps) {
    const { navigation, params } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const { faqs, faqs_loading } = useFetchFaqs(params || {})
 

    const [activeFAQs, setActiveFAQs] = useState<number[]>([])

    const _IsActive = (question: any) => {
        if (!faqs?.length) return false
        if (!activeFAQs?.length) return false
        return Boolean(activeFAQs.filter(index => faqs[index].title === question.title).length)

    }


    const _renderHeader = (faq: faqResponseDataType) => {
        return (
            <View style={styles.questionHeader}>
                <Text style={styles.questionHeaderText}>{faq.title}</Text>
                {_IsActive(faq) ?
                    <MinusIcon color={theme.palette.primary[theme.mode].main} />
                    :
                    <PlusIcon color={theme.palette.primary[theme.mode].main} />
                }
            </View>
        );
    };


    const _renderContent = (faq: faqResponseDataType) => {
        return (
            <View style={{ marginTop: 14 }}>
                <Text style={styles.mutedText}>
                    {faq.content}
                </Text>
                <Devider spacing={10} />
                <View style={styles.reviewContainer}>
                    <Text style={styles.mutedText}>
                        Does this help you?
                    </Text>
                    <View style={styles.reviewButtonsContainer}>
                        <Pressable
                            android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                        >
                            <Text style={styles.reviewButtonsText}>
                                Yes
                            </Text>
                        </Pressable>
                        <Space size={15} />
                        <Pressable
                            android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                            onPress={() => { }}
                        >
                            <Text style={styles.reviewButtonsText}>
                                No
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    };

    const _updateSections = (faqs_indexes: number[]) => {
        setActiveFAQs(faqs_indexes);
    };


    if (faqs_loading)
        return <LoadingBlock />
    if (!faqs?.length) {
        return (
            <Text style={styles.empty_result_test}>
                Empty!
            </Text>
        )
    }

    return (
        <View>
            <Accordion
                sections={faqs}
                activeSections={activeFAQs}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
                underlayColor={theme.palette.lightGrey[theme.mode].main}
                touchableComponent={Pressable as any}
                sectionContainerStyle={styles.sectionContainerStyle}
            />
            <View style={{ alignItems: "center" }}>
                <Pressable
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    android_ripple={{ color: theme.palette.grey[theme.mode][3] }}
                >
                    <Text style={styles.seeMoreText}>
                        see more
                    </Text>
                </Pressable>
            </View>
        </View>

    );

}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
        },

        questionHeader: {
            borderRadius: 12,
            overflow: "hidden",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

        },
        questionHeaderText: {
            ...text.medium.P14_Lh180,
            color: palette.black[mode].main,
        },

        mutedText: {
            ...text.regular.P14_Lh180,
            color: palette.grey[mode].main
        },
        reviewContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between'
        },
        reviewButtonsContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        reviewButtonsText: {
            ...text.medium.P14_Lh180,
            color: palette.primary[mode].main
        },
        sectionContainerStyle: {
            borderRadius: 12,
            borderColor: palette.lightGrey[mode].main,
            borderWidth: 1,
            marginBottom: 15,
            padding: 14,
        },
        seeMoreText: {
            ...text.medium.P12_Lh130,
            color: palette.primary[mode].main
        },
        empty_result_test: {
            ...text.medium.P14_Lh180,
            color: palette.grey[mode].main,
            textAlign:"center",
            marginTop:20
        }


    })
}
