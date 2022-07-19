import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, Pressable, Image, TextStyle, KeyboardAvoidingView, Platform } from 'react-native';
import { Actions, ActionsProps, AvatarProps, Bubble, BubbleProps, Composer, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, LeftRightStyle, Message, MessageImage, MessageImageProps, MessageProps, MessageText, MessageTextProps, Send, SendProps, Time, TimeProps } from 'react-native-gifted-chat'
import { AttachmentIcon, LeftArrowIcon, PhoneCallIcon, SendIcon, ThreeDotsIcon } from '../../components/icons';
import { useHideBottomBar } from '../../components/navigation';
import { Space } from '../../components/util';
import { MessagesStackParamList } from '../../navigation/MessagesStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';

const INPUT_HEIGHT = 44

type ChatScreenScreenProps = NativeStackScreenProps<MessagesStackParamList, "MessageDetails">;

export const ChatScreen = ({ navigation }: ChatScreenScreenProps) => {
    const { goBack } = navigation
    useHideBottomBar(navigation, 1)
    const { theme } = useTheme()
    const styles = getStyles(theme)
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Loqman',
                    avatar: 'https://placeimg.com/140/140/any',
                },
                image: 'https://placeimg.com/140/140/any'

            },
            {
                _id: 2,
                text: 'Hello dudes',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Node',
                    avatar: 'https://placeimg.com/140/140/any',
                },
                image: 'https://placeimg.com/140/140/any'
            },
        ])
    }, [])

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={styles.root}>
            <View style={styles.chatHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable
                        onPress={() => goBack()}
                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                    >

                        <LeftArrowIcon />
                    </Pressable>

                    <View style={{ marginLeft: 20 }}>
                        <View style={styles.messageContainer}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <View style={[styles.avatarContainer, { marginRight: 14 }]}>
                                    <Image
                                        style={styles.avatarContainer}
                                        source={{ uri: "https://placeimg.com/140/140/any" }}
                                    />
                                    <View style={styles.onlineBadge}>

                                    </View>
                                </View>

                                <View >
                                    <Text style={styles.notificatioTitle}>
                                        Kathryn Murphy
                                    </Text>
                                    <Text style={styles.notificatioBrief}>
                                        Online
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable
                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                    >
                        <PhoneCallIcon size={22} />
                    </Pressable>
                    <Space size={20} />
                    <Pressable
                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                    >
                        <ThreeDotsIcon size={22} />
                    </Pressable>
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                placeholder="Type your message "
                alwaysShowSend
                user={{ _id: 1, name: 'Bz', }}

                renderAvatar={(av) => (
                    <Image source={{ uri: av.currentMessage?.user.avatar as string | undefined }}
                        style={styles.chatAvatar}
                    />
                )}
                
                renderMessageImage={(props) => customtImage(props, theme)}
                renderInputToolbar={(toolbarProps) => customtInputToolbar(toolbarProps, theme)}
                renderComposer={(props) => customtComposer(props, theme)}
                renderSend={(props) => customtSend(props, theme)}
                renderActions={(props) => customtAction(props, theme)}
                renderChatFooter={() => <View style={{ height: 24 }} />}

            />

        </View>

    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.white[mode].main
        },
        chatHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 24,
            borderBottomColor: palette.lightGrey[mode].main,
            borderBottomWidth: 1,

        },
        messageContainer: {
            paddingVertical: 5,
            paddingHorizontal: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
        },
        avatarContainer: {
            position: "relative",
            width: 44,
            height: 44,
            borderRadius: 44,
        },

        notificatioTitle: {
            ...text.medium.P14_Lh130,
            color: palette.black[mode].main
        },
        notificatioBrief: {
            ...text.regular.P14_Lh130,
            color: palette.grey[mode].main
        },
        notificatioTime: {
            ...text.regular.P12_Lh180,
            color: palette.grey[mode].main
        },
        onlineBadge: {
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: 10,
            backgroundColor: palette.success[mode].main,
            top: 0, right: 0
        },
        chatAvatar: {
            width: 24,
            height: 24,
            borderRadius: 24
        },
    })
}


const customtInputToolbar = (props: InputToolbarProps<IMessage>, theme: ThemeType) => {
    const { palette, mode } = theme

    return (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: "white",
                borderTopWidth: 1,
                borderTopColor: palette.lightGrey[mode].main,

            }}
            primaryStyle={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                alignItems: "stretch",
            }}
        />
    );
};

const customtSend = (props: SendProps<IMessage>, theme: ThemeType) => {
    const { palette, mode } = theme
    return (
        <Send
            {...props}
            containerStyle={{
                justifyContent: "center",
                marginLeft: 10
            }}>
            <SendIcon color={palette.primary[mode].main} />
        </Send>

    );
};
const customtAction = (props: ActionsProps, theme: ThemeType) => {
    const { palette, mode } = theme

    return (
        <Actions
            {...props}
            icon={() => <AttachmentIcon color={palette.grey[mode].main} />}
            containerStyle={{
                backgroundColor: palette.lightGrey[mode].main,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                marginBottom: 0,
                marginLeft: 0,
                height: INPUT_HEIGHT,
                justifyContent: "center",
                alignItems: "center",
                width: 50,
            }}
        />
    );
};

const customtComposer = (props: ComposerProps, theme: ThemeType) => {
    const { palette, mode } = theme

    return (
        <Composer
            {...props}
            composerHeight={INPUT_HEIGHT}
            placeholderTextColor={theme.palette.grey[mode].main}
            textInputStyle={{
                backgroundColor: palette.lightGrey[mode].main,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                marginLeft: 0,
                marginBottom: 0,
                marginTop: 0,
                flexGrow: 1,
            }}
        />
    );
};

const customtImage = (props: MessageImageProps<IMessage>, theme: ThemeType) => {
    const { palette, mode } = theme
    return (
        <MessageImage
            {...props}
            imageStyle={{}}

        />
    );
};






