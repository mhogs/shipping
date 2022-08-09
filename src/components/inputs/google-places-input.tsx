import React, { Fragment, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Dimensions, useWindowDimensions } from 'react-native'
import { GooglePlaceData, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';

import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { Space } from '../util';

type GooglePlacesInputProps = {
    label?: string,
    placeholder?: string,
    onChange: (value: any) => void,
    onBlur?: (e: any) => void,
    icon?: any,
    touched?: boolean
    error?: string
}


export const GooglePlacesInput = (props: GooglePlacesInputProps) => {
    const { label, placeholder, icon, onChange, touched, error,onBlur } = props;
    const { theme } = useTheme()
    const styles = getStyles(theme, Boolean(error)&&touched)

    const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

    

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

    const renderListItem = (data: any, index: number) => {
        return (
            <View style={{
                paddingVertical: 15,
            }}>
                <Text style={{
                    color: theme.palette.text[theme.mode].main,
                    ...theme.text.regular.P14_Lh180,
                }}>
                    {data.description || data.formatted_address || data.name}
                    
                </Text>
            </View>
        )
    }
    const { width: deviceWidth } = useWindowDimensions()
    return (
        <View >
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: "100%" }}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'

            >
                <View style={{ flexGrow: 1 }}>

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
                            onChange({ 
                                place:data.description, 
                                longitude:details?.geometry.location.lng,
                                latitude:details?.geometry.location.lat,
                            });
                        }}
                        
                        fetchDetails={true}
                        suppressDefaultStyles={true}
                        minLength={2}
                        enablePoweredByContainer={false}
                        query={{
                            key: 'AIzaSyBeg9OGJfQWY0CWyRh8PfW2ERQbsP-yEwc',
                            language: 'en',
                            //components: 'country:dz'
                        }}    
                        renderRow={renderListItem}
                        renderRightButton={renderIcon}
                        styles={styles}
                        textInputProps={{
                            onChangeText: (location) => location === "" && onChange(null),
                        }}
                        
                        debounce={200}

                    />

                </View>

            </ScrollView>

        </View>

    );
};


const getStyles = (theme: ThemeType, error?: boolean) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        container: {
        },
        inputLabel: {
            ...text.medium.P16_Lh180,
            color: palette.text[mode].main
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
            borderColor: error ? palette.danger[mode].main : palette.lightGrey[mode].main,
            backgroundColor: palette.white[mode].main,
        },
        textInput: {
            flex: 1,
            color: palette.text[mode].main,
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
        errorText: {
            fontSize: 10,
            marginLeft: 8,
            color: palette.danger[mode].main,
            position: "absolute",
            bottom: -16
        },
        predefinedPlacesDescription: {
            color: '#1faadb'
        }

    })
}
