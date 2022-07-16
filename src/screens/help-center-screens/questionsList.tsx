import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import { MinusIcon, PlusIcon } from '../../components/icons';
import { Devider, Space } from '../../components/util';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';

const SECTIONS = [
    {
        title: 'Why my track is not showing?',
        content: 'library you can easily transition the background color between the active and inactive state or add animations.',
    },
    {
        title: 'How to place order?',
        content: 'library you can easily transition the background color between the active and inactive state or add animations.',
    },
    {
        title: 'Tracky insurance terms',
        content: 'library you can easily transition the background color between the active and inactive state or add animations.',
    },
    {
        title: 'How to do track?',
        content: 'library you can easily transition the background color between the active and inactive state or add animations.',
    },
];

export function QuestionsListView() {
    const [activeSections, setActiveSections] = useState<any[]>([])
    const { theme } = useTheme()
    const styles = getStyles(theme)


    const _IsActive = (section: any) => {
        if (!activeSections.length) return false
        return Boolean(activeSections.filter(item => SECTIONS[item].title === section.title).length)

    }

    const _renderHeader = (section: any) => {
        return (
            <View style={styles.questionHeader}>
                <Text style={styles.questionHeaderText}>{section.title}</Text>
                {_IsActive(section) ? <MinusIcon color={theme.palette.primary[theme.mode].main} /> : <PlusIcon color={theme.palette.primary[theme.mode].main} />}
            </View>
        );
    };


    const _renderContent = (section: any) => {
        return (
            <View style={{ marginTop: 14 }}>
                <Text style={styles.mutedText}>
                    {section.content}
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

    const _updateSections = (sections: any[]) => {
        setActiveSections(sections);
    };


    return (
        <View>
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
                underlayColor={theme.palette.lightGrey[theme.mode].main}
                touchableComponent={Pressable}
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
        }


    })
}
