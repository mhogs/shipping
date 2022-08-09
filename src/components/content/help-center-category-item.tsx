import React from 'react'
import { Pressable, View, StyleSheet, Image, Text, Dimensions } from 'react-native'
import { MessageNotifIcon } from '../../assets'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme'

type LocationItemProps = {
  icon?: any,
  name: string,
  onPress?: () => void
}
export const HelpCenterCategoryItem = (props: LocationItemProps) => {
  const { icon, name, onPress } = props
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme])  
  return (
    <View style={styles.category}>
      <Pressable
        style={styles.categoryPressable}
        onPress={onPress}
        android_ripple={{ color: theme.palette.grey[theme.mode][3], borderless: false }}
      >
        <Image source={{ uri: icon }} style={styles.iconstyle} />
        <Text style={styles.categoryName}>{name}</Text>
      </Pressable>
    </View>

  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  var { height, width } = Dimensions.get('window');
  const iconWidth = 44
  const notifTimewidth = 40
  const marginH = 14
  return StyleSheet.create({

    category: {
      flex: 1,
      borderRadius: 12,
      overflow: 'hidden',
      borderColor: palette.lightGrey[mode].main,
      borderWidth: 1
    },
    iconstyle: {
      width: 24,
      height: 24
    },
    categoryPressable: {
      flexDirection: 'row',
      paddingVertical: 11,
      paddingHorizontal: 11,
      alignItems: 'center'
    },
    categoryName: {
      ...text.medium.P14_Lh180,
      color: palette.text[mode].main,
      marginLeft: 10
    },

  })
}