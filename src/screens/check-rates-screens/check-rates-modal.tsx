import React, { Fragment } from "react"
import { Modal, Image, View, Text, StyleSheet, Pressable } from "react-native"
import { useTheme } from '../../state';
import { ThemeType } from '../../theme';
import { Devider, Space } from "../../components/util";
import { ServiceItem } from "../../components/content/service-item";
import { cargoIcon, expressIcon, regularIcon, doubleArrowIcon } from "../../assets";


const data = {
    pickup: "1304 Tiffin Ave, Findlay",
    destination: '1410  Market St, Celina',
    services: [
        {
            icon:regularIcon, title:'Regular', description:'2 - 3 Days', price:'$10'
        },
        {
            icon:cargoIcon, title:'Cargo', description:'3 - 6 Days', price:'$24'
        },
        {
            icon:expressIcon, title:'Express', description:'1 - 2 Days', price:'$40'
        },
    ]
}

type CheckRatesModalProps = {
    visible: boolean
    closeModal: () => void
}

export const CheckRatesModal = (props: CheckRatesModalProps) => {
    const { visible, closeModal } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)


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
                        <View style={styles.headerContainer}>
                            <View style={styles.pickupPlaceContainer}>
                                <Text style={styles.pickupPlace}>{data.pickup}</Text>
                                <Text style={styles.type}>Pick Up</Text>
                            </View>
                            <Image source={doubleArrowIcon} />
                            <View style={styles.destinationPlaceContainer}>
                                <Text style={styles.destinationPlace}>{data.destination}</Text>
                                <Text style={styles.type}>Destination</Text>
                            </View>
                        </View>
                        <Space direction='vertical' size={15} />
                        <Devider />
                        <Space direction='vertical' size={15} />
                        <View  style={styles.servicesListe}>
                            {
                                data.services?.map((item, index)=>{
                                    return (
                                        <Fragment key={index}>
                                            <ServiceItem icon={item.icon} title={item.title} description={item.description} price={item.price} />               
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
        headerContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },
        pickupPlaceContainer:{
            width:'40%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'flex-start'
        },
        destinationPlaceContainer:{
            width:'40%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'flex-end'
        },
        pickupPlace:{
            textAlign:'left',
            color: palette.black[mode].main,
            ...text.medium.P14_Lh130
        },
        destinationPlace:{
            textAlign:'right',
            color: palette.black[mode].main,
            ...text.medium.P14_Lh130
        },
        type:{
            marginTop:4,
            color: palette.grey[mode].main,
            ...text.regular.P12_Lh130
        }
    })
}
