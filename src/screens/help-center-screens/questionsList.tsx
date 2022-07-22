import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import { MinusIcon, PlusIcon } from '../../components/icons';
import { Devider, Space } from '../../components/util';
import { HelpCenterStackParamList } from '../../navigation/HelpCenterStack';
import { MessagesStackParamList } from '../../navigation/MessagesStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { useQuestions } from './useQuestions';


type QuestionsListViewProps = {
    navigation: any
}
export function QuestionsListView(props: QuestionsListViewProps) {
    const { navigation } = props
    const [activeQuestions, setActiveQuestions] = useState<number[]>([])
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const { data: questions, isLoading, isError, error } = useQuestions()

    const _IsActive = (question: any) => {
        if (!questions) return false
        if (!activeQuestions?.length) return false
        return Boolean(activeQuestions.filter(index => questions[index].title === question.title).length)

    }

    const _renderHeader = (question: any) => {
        return (
            <View style={styles.questionHeader}>
                <Text style={styles.questionHeaderText}>{question.title}</Text>
                {_IsActive(question) ?
                    <MinusIcon color={theme.palette.primary[theme.mode].main} />
                    :
                    <PlusIcon color={theme.palette.primary[theme.mode].main} />
                }
            </View>
        );
    };


    const _renderContent = (question: any) => {
        return (
            <View style={{ marginTop: 14 }}>
                <Text style={styles.mutedText}>
                    {question.content}
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
                            onPress={() => {}}
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

    const _updateSections = (questions: any[]) => {
        setActiveQuestions(questions);
    };


    return (
        <View>
            {questions?.length &&
                <Accordion
                    sections={questions}
                    activeSections={activeQuestions}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={_updateSections}
                    underlayColor={theme.palette.lightGrey[theme.mode].main}
                    touchableComponent={Pressable as any}
                    sectionContainerStyle={styles.sectionContainerStyle}
                />
            }
            {isLoading && <ActivityIndicator size="large" color={theme.palette.primary[theme.mode].main} />}
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
        }


    })
}
