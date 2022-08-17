import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, StyleSheet, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { Actions, ActionsProps, AvatarProps, Bubble, BubbleProps, Composer, ComposerProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, LoadEarlier, LoadEarlierProps, MessageImage, MessageImageProps, Send, SendProps } from 'react-native-gifted-chat'
import { avatar_asset } from '../../assets';
import { AttachmentIcon, LeftArrowIcon, PhoneCallIcon, SendIcon, ThreeDotsIcon } from '../../components/icons';
import { useHideBottomBar } from '../../components/navigation';
import { Space } from '../../components/util';
import { MessagesStackParamList } from '../../navigation/MessagesStack';
import { useTheme } from '../../state';
import { ThemeType } from '../../constants/theme';
import { useMessageDetails } from './useMessageDetails';
import { isRTL, useTranslation } from '../../locales';

const INPUT_HEIGHT = 44

type ChatScreenScreenProps = NativeStackScreenProps<MessagesStackParamList, "MessageDetails">;

export const ChatScreen = ({ navigation, route }: ChatScreenScreenProps) => {
    const { goBack } = navigation
    const { sender } = route.params
    useHideBottomBar(navigation, 1)
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme, isRTL()])
    const {t} = useTranslation("messages")
    const { messages, dispatch, can_load_more, loading_more, isLoading, loadMore, onSend, } = useMessageDetails({ user2: sender.id || 0 })

    return (
        <View style={styles.root}>
            <View style={styles.chatHeader}>
                <View style={styles.chatHeaderWraper}>
                    <Pressable
                        onPress={() => goBack()}
                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                        style={styles.backButtonWraper}
                    >
                        <LeftArrowIcon color={theme.palette.text[theme.mode].main} />
                    </Pressable>
                    <Space size={20} />
                    <View >
                        <View style={styles.messageContainer}>
                            <View style={styles.infoWraper}>
                                <View>
                                    {
                                        sender.picture ?
                                            <Image
                                                style={styles.avatarPicture}
                                                source={{ uri: sender.picture }}
                                            />
                                            :
                                            <Image source={avatar_asset} style={styles.avatarPicture} />
                                    }

                                </View>
                                    <Space size={14} />
                                <View style={styles.info} >
                                    <Text style={styles.user2Name}>
                                        {sender.first_name} {sender.last_name}
                                    </Text>
                                    <Text style={styles.onlineStatus}>
                                        Online
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.iconsWraper}>
                    <Pressable
                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                    >
                        <PhoneCallIcon size={22} color={theme.palette.text[theme.mode].main} />
                    </Pressable>
                    <Space size={20} />
                    <Pressable
                        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: true }}
                    >
                        <ThreeDotsIcon size={22} color={theme.palette.text[theme.mode].main} />
                    </Pressable>
                </View>
            </View>
            {/** body chat */}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                placeholder={t("Type your message")}
                alwaysShowSend
                user={{ _id: 1, name: 'Bz', }}
                loadEarlier={can_load_more}
                onLoadEarlier={loadMore}

                isLoadingEarlier={loading_more}
                renderAvatar={(av) => (
                    <Image source={{ uri: av.currentMessage?.user.avatar as string | undefined }}
                        style={styles.chatAvatar}
                    />
                )}
                messagesContainerStyle={{ paddingBottom: 20 }}
                renderMessageImage={(props) => customtImage(props, theme)}
                renderInputToolbar={(toolbarProps) => customtInputToolbar(toolbarProps, theme)}
                renderBubble={(props) => renderBubble(props, theme)}
                renderLoadEarlier={(props) => renderLoadEarlier(props, theme)}
                renderComposer={(props) => customtComposer(props, theme)}
                renderSend={(props) => customtSend(props, theme)}
                renderActions={(props) => customtAction(props, theme)}
                renderLoading={() => <ActivityIndicator size="large" color={theme.palette.primary[theme.mode].main} />}
                listViewProps={{
                    //onEndReached: loadMore
                }}

            />

        </View>

    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.bg[mode].main
        },
        chatHeader: {
            flexDirection: isRTL() ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 24,
            borderBottomColor: palette.bg[mode][2],
            borderBottomWidth: 1,
        },
        chatHeaderWraper: {
            flexDirection: isRTL() ? "row-reverse" : "row",
            alignItems: "center"
        },
        messageContainer: {
            paddingVertical: 5,
            paddingHorizontal: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
        },
        avatarPicture: {
            width: 44,
            height: 44,
            borderRadius: 44,
        },

        user2Name: {
            ...text.medium.P14_Lh130,
            color: palette.text[mode].main
        },
        onlineStatus: {
            ...text.regular.P14_Lh130,
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
        infoWraper: {
            flexDirection: isRTL() ? "row-reverse" : "row",
            alignItems: "center"
        },
        iconsWraper:
        {
            flexDirection: isRTL() ? "row-reverse" : "row",
            alignItems: "center"
        },
        backButtonWraper: {
            transform: [{ rotateY: isRTL()? '180deg':"0deg" }]
        },
        info:{
            alignItems:isRTL()? "flex-end":"flex-start"
        },
      
    })
}

const renderBubble = (props: Readonly<BubbleProps<IMessage>> & Readonly<{
    children?: React.ReactNode;
}>, theme: ThemeType) => {

    const { palette, mode, text } = theme
    return (
        <Bubble
            {...props}
            textStyle={{
                left: {
                    ...text.regular.P14_Lh180,
                    color: palette.grey[mode].main,
                },
                right: {
                    ...text.regular.P14_Lh180,
                    color: 'white',
                },

            }}
            wrapperStyle={{
                left: {
                    backgroundColor: palette.bg[mode][2]
                },
                right: {
                    backgroundColor: palette.primary["light"].main
                }
            }}>
            {props.children}
        </Bubble>
    )
}
const renderLoadEarlier = (props: LoadEarlierProps, theme: ThemeType) => {
    const { palette, mode } = theme
    return (
        <LoadEarlier
            {...props}
            label="Load earlier"
            wrapperStyle={{ backgroundColor: "#3264FF15", paddingVertical: 4, paddingHorizontal: 16 }}
            textStyle={{ color: palette.primary["light"].main }}
        />
    )
}
const customtInputToolbar = (props: InputToolbarProps<IMessage>, theme: ThemeType) => {
    const { palette, mode } = theme

    return (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: palette.bg[mode].main,
                borderTopWidth: 1,
                borderTopColor: palette.bg[mode][2],

            }}
            primaryStyle={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                flexDirection:isRTL()? "row-reverse":"row",
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
                marginLeft: isRTL()?0: 10,
                marginRight: isRTL()?10: 0,
                transform: [{ rotateY: isRTL()? '180deg':"0deg" }]
            }}>
            <SendIcon color={palette.primary["light"].main} />
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
                backgroundColor: palette.bg[mode][2],
                borderTopRightRadius:isRTL()?10: 0,
                borderBottomRightRadius: isRTL()?10: 0,
                borderTopLeftRadius:isRTL()?0: 10,
                borderBottomLeftRadius: isRTL()?0: 10,
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
                backgroundColor: palette.bg[mode][2],
                borderTopRightRadius:isRTL()?0: 10,
                borderBottomRightRadius: isRTL()?0: 10,
                borderTopLeftRadius:isRTL()?10: 0,
                borderBottomLeftRadius: isRTL()?10: 0,
                marginLeft: 0,
                marginBottom: 0,
                marginTop: 0,
                flexGrow: 1,
                textAlign: isRTL()?"right":"left"
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






