import { RootStackWrapperProps } from '@components/wrappers/RootStackWrapper/RootStackWrapper.types'
import { bananasService, levelService } from '@services'
import { useAppDispatch } from '@store/hooks'
import { COLORS, GlobalStyles } from '@theme'
import * as Font from 'expo-font'
import React, { FC, useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { marketService } from '../../../services/marketService'
import { styles } from './RootStackWrapper.styles'

const loadFonts = async () => {
  await Font.loadAsync({
    BellGothicBlack: require('../../../../assets/fonts/Bell-gothic-black.ttf'),
    BellGothicLight: require('../../../../assets/fonts/Bell-gothic-light.ttf'),
    BellGothicBold: require('../../../../assets/fonts/Bell-gothic-bold.ttf'),
  })
}

const RootStackWrapper: FC<RootStackWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const [appLoaded, setAppLoaded] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      try {
        await Promise.all([
          loadFonts(),
          levelService.initLevels(dispatch),
          bananasService.initBananas(dispatch),
          marketService.initMarket(dispatch),
        ])
        setAppLoaded(true)
      } catch (error) {
        console.warn(error)
      }
    }
    loadApp()
  }, [dispatch])

  if (!appLoaded) {
    return (
      <View style={[styles.container, GlobalStyles.centeredContainer]}>
        <ActivityIndicator color={COLORS.white} size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.codeGrey}
        barStyle={'light-content'}
        hidden={true}
      />

      {children}
      <Toast />
    </View>
  )
}

export default RootStackWrapper
