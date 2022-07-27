import React, { Fragment } from "react"
import { Modal, View, Text, StyleSheet, Pressable } from "react-native"
import { useTheme } from '../../../state';
import { ThemeType } from '../../../theme';
import { Space } from "../../../components/util";
import { ServiceItem } from "../../../components/content/service-item";
import { cargoIcon, expressIcon, regularIcon } from "../../../assets";
import { ServiceType } from "../../../@types";


type SelectServiceModalProps = {
    visible: boolean
    closeModal: () => void
    selectService: (service: ServiceType) => void
}


const services:ServiceType[] = [
    {
        icon:"", name:'Regular',id:1
    },
    {
        icon:cargoIcon, name:'Cargo',id:2
    },
    {
        icon:expressIcon, name:'Express', id:3
    },
]


export const SelectServiceModal = (props: SelectServiceModalProps) => {
    const { visible, closeModal, selectService } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    const selectServiceCloseModal = (service: ServiceType) =>{
        selectService(service);
        closeModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.modalContainer}>
                <Pressable
                    style={styles.modalOverlay}
                    onPress={closeModal}
                >
                </Pressable>

                <View style={styles.modalContent}>
                    <View style={styles.modalTopBa}></View>
                    <View style={styles.contentContainer}>
                        <Space direction='vertical' size={46} />
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.selectServiceTitle}>Services</Text>
                        </View>
                        <Space direction='vertical' size={20} />
                        <View  style={styles.servicesListe}>
                            {
                                services?.map((item,index)=>{
                                    return (
                                        <Fragment key={index}>
                                            <ServiceItem icon={item.icon} title={item.title} description={item.description} price={item.price} onPress={selectServiceCloseModal} />               
                                            <Space direction='vertical' size={15} />
                                        </Fragment>
                                    )
                                })
                            }    
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({

        root: { flex: 1 },
        modalContainer: {
            flexGrow: 1,
            justifyContent:"space-between"
        },
        modalContent: {
            position: 'relative',
            paddingHorizontal: 24,
            paddingVertical: 10,
            height: "60%",
            backgroundColor: palette.white[mode].main
        },
        modalTopBa: {
            width: 60,
            height: 6,
            position: 'absolute',
            zIndex:10,
            top: 10,
            backgroundColor: palette.lightGrey[mode].main,
            borderRadius: 10,
            alignSelf: "center"
        },
        modalOverlay: {
            height: "40%",
            backgroundColor: 'rgba(25, 29, 49, 0.3)',
        },
        contentContainer: {
            flex: 1,
            marginBottom: 47,
        },
        selectServiceTitle: {
            ...text.medium.P18_Lh180,
            color: palette.black[mode].main
        },
        servicesListe: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
    })
}
