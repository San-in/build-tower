import { COLORS } from '@theme'
import * as Font from 'expo-font'
import { FC, useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'

import { styles } from './RootStackWrapper.styles'
import { RootStackWrapperProps } from '@components/wrappers/RootStackWrapper/RootStackWrapper.types'

const loadFonts = async () => {
  await Font.loadAsync({
    BellGothicBlack: require('../../../../assets/fonts/Bell-gothic-black.ttf'),
    BellGothicLight: require('../../../../assets/fonts/Bell-gothic-light.ttf'),
    BellGothicBold: require('../../../../assets/fonts/Bell-gothic-bold.ttf'),
  })
}

const RootStackWrapper: FC<RootStackWrapperProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      try {
        await loadFonts()
        setFontsLoaded(true)
      } catch (error) {
        console.warn(error)
      }
    }

    loadApp()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.codeGrey} barStyle={'light-content'} />

      {children}
    </View>
  )
}

export default RootStackWrapper
