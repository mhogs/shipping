import React, { Fragment, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';

import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { Space } from '../util';

type GooglePlacesInputProps = {
    label?: string,
    placeholder?: string,
    onChange?: (value: any) => void,
    icon?: any,
}


export const GooglePlacesInput = (props: GooglePlacesInputProps) => {
    const { label, placeholder, icon, onChange } = props;
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

    const setPlace = (value: any) => {
        onChange ? onChange(value) : null;

    }

    const clear = () => {
        inputRef?.current?.clear()
    }


    const renderIcon = () => {
        return (
            <Pressable
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                    clear()
                }}
            >
                {icon}
            </Pressable>
        )
    }

    const renderListItem = (data: GooglePlaceData, index: number) => {
        return (
            <View style={{
                paddingVertical: 15,
            }}>
                <Text style={{
                    color: theme.palette.black[theme.mode].main,
                    ...theme.text.regular.P14_Lh180,
                }}>
                    {data.description}
                </Text>
            </View>
        )
    }

    return (
        <Fragment>
            {label ?
                <Fragment>
                    <Text style={styles.inputLabel}> {label}</Text>
                    <Space size={10} direction="vertical" />
                </Fragment> : null
            }
            
            <GooglePlacesAutocomplete
                ref={inputRef}
                placeholder={placeholder ? placeholder : 'Search location'}
                onPress={(data, details = null) => {
                    setPlace(data);
                }}
                suppressDefaultStyles={true}
                minLength={3}
                enablePoweredByContainer={false}
                query={{
                    key: 'AIzaSyBeg9OGJfQWY0CWyRh8PfW2ERQbsP-yEwc',
                    language: 'en',
                    components: 'country:dz'
                }}
                renderRow={renderListItem}
                renderRightButton={renderIcon}

                styles={styles}
            />
        </Fragment>


    );
};


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        container: {
        },
        inputLabel: {
            ...text.medium.P16_Lh180,
            color: palette.black[mode].main
        },
        textInputContainer: {
            height: 52,
            paddingVertical: 8,
            paddingHorizontal: 14,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: palette.lightGrey[mode].main,
            backgroundColor: palette.white[mode].main,
        },
        textInput: {
            flex: 1,
            color: palette.black[mode].main,
            ...text.regular.P14_Lh180,
        },
        listView: {
            backgroundColor: palette.white[mode].main,
            borderColor: palette.lightGrey[mode].main,
            marginTop: 5,
            zIndex: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
            borderWidth: 1.5,
        },
        separator: {
            height: 1,
            backgroundColor: palette.lightGrey[mode].main,
        },

    })
}
