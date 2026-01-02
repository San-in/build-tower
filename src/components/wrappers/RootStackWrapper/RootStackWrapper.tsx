import { RootStackWrapperProps } from '@components/wrappers/RootStackWrapper/RootStackWrapper.types'
import { useSettings } from '@providers'
import { bananasService, levelService, marketService } from '@services'
import { useAppDispatch } from '@store/hooks'
import { checkAndUpdateOnAppStart } from '@store/slices/userActivitySlice'
import { COLORS, GlobalStyles } from '@theme'
import * as Font from 'expo-font'
import React, { FC, useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { awardsService } from '../../../services/awardsServices'
import { userActivityService } from '../../../services/userActivityService'
import { toastConfig } from '../ToastWrapper/toastConfig'
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
  const { hydrated } = useSettings()
  const [appLoaded, setAppLoaded] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      try {
        await loadFonts()
        await Promise.all([
          dispatch(bananasService.hydrateBananas()),
          dispatch(marketService.hydrateMarket()),
          dispatch(levelService.hydrateLevels()),
          dispatch(awardsService.hydrateAwards()),
          dispatch(userActivityService.hydrateUserActivity()),
        ])

        dispatch(checkAndUpdateOnAppStart())
      } catch (error) {
        console.warn(error)
      } finally {
        setAppLoaded(true)
      }
    }

    loadApp().then()
  }, [dispatch])

  if (!appLoaded || !hydrated) {
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
      <Toast config={toastConfig} />
    </View>
  )
}

export default RootStackWrapper
