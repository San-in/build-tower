import { COLORS } from '@theme'
import * as Font from 'expo-font'
import { FC, useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { styles } from './RootStackWrapper.styles'
import { RootStackWrapperProps } from '@components/wrappers/RootStackWrapper/RootStackWrapper.types'
import { useAppDispatch } from '@store/hooks'
import { bananasService, levelService } from '@services'

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
        ])
        setAppLoaded(true)
      } catch (error) {
        console.warn(error)
      }
    }
    loadApp()
  }, [])

  if (!appLoaded) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.codeGrey}
        barStyle={'light-content'}
        hidden={true}
      />

      {children}
    </View>
  )
}

export default RootStackWrapper
