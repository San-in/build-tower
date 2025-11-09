import { ConfettiGif, StarsGif } from '@assets/gifs'
import birdsAnimation from '@assets/icons/animations/birds.json'
import {
  BackgroundImg,
  BlockImg,
  GroundImg,
  ModalBorderBlueImg,
  ModalBorderDivideImg,
  ModalBorderGreenImg,
  ModalBorderMinusImg,
  ModalBorderMultiplyImg,
  ModalBorderOrangeImg,
  ModalBorderPlusImg,
  ModalBorderPurpleImg,
  MonkeyFirstConstructorImg,
  MonkeyModalImg,
  MonkeyNotificationImg,
  MonkeySecondConstructorImg,
  MonkeyWizardImg,
  SplashImg,
  WinBannerImg,
} from '@assets/images'
import { Button, OutlinedText } from '@components/atoms'
import { useAssetPreload, useAssetsReady } from '@hooks'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { COLORS, GlobalStyles } from '@theme'
import { SCREENS } from '@types'
import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { AnimatePresence, MotiView } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ActivityModal, SideMenu } from './components'
import { ACTIVITY_MODAL_TYPES } from './components/AcitvityModal/ActivityModal.types'
import { styles } from './WelcomeScreen.styles'

const ASSET_KEYS = { BG: 'background', ASSETS: 'assets' } as const

type ActivityModal = {
  type: ACTIVITY_MODAL_TYPES
  isVisible: boolean
}
const INITIAL_ACTIVITY_MODAL_STATE: ActivityModal = {
  type: ACTIVITY_MODAL_TYPES.MARKET,
  isVisible: false,
}

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<GameStackParamList>>()
  const assetsToPreload = useMemo(
    () => [
      BackgroundImg,
      BlockImg,
      GroundImg,
      ModalBorderBlueImg,
      ModalBorderDivideImg,
      ModalBorderGreenImg,
      ModalBorderMinusImg,
      ModalBorderMultiplyImg,
      ModalBorderOrangeImg,
      ModalBorderPlusImg,
      ModalBorderPurpleImg,
      MonkeyFirstConstructorImg,
      MonkeyModalImg,
      MonkeyNotificationImg,
      MonkeySecondConstructorImg,
      MonkeyWizardImg,
      SplashImg,
      WinBannerImg,
      StarsGif,
      ConfettiGif,
    ],
    []
  )
  const { ready: preloaded } = useAssetPreload(assetsToPreload)
  const { ready: bgReady, done: assetLoaded } = useAssetsReady(
    useMemo(() => Object.values(ASSET_KEYS), [])
  )

  const [activityModalConfig, setActivityModalConfig] = useState<ActivityModal>(
    INITIAL_ACTIVITY_MODAL_STATE
  )

  const handleStartButtonPress = () => {
    navigation.navigate(SCREENS.LevelsScreen)
  }

  const handleMarketIconPress = () => {}
  const handleAwardsIconPress = () => {}
  const handleCalendarIconPress = () => {}
  const handleSettingsIconPress = () => {
    setActivityModalConfig({
      type: ACTIVITY_MODAL_TYPES.SETTINGS,
      isVisible: true,
    })
  }

  useEffect(() => {
    if (preloaded) {
      assetLoaded(ASSET_KEYS.ASSETS)
    }
  }, [assetLoaded, preloaded])

  return (
    <View style={styles.backgroundImage}>
      <View
        pointerEvents={'none'}
        style={[StyleSheet.absoluteFillObject, styles.birdsAnimationContainer]}
      >
        <LottieView
          loop
          autoPlay={true}
          source={birdsAnimation}
          style={styles.birdsAnimation}
        />
      </View>

      <Image
        allowDownscaling
        cachePolicy="disk"
        contentFit="cover"
        onError={() => assetLoaded(ASSET_KEYS.BG)}
        onLoadEnd={() => assetLoaded(ASSET_KEYS.BG)}
        priority="high"
        source={SplashImg}
        style={[StyleSheet.absoluteFill, styles.image]}
        transition={100}
      />

      <SafeAreaView
        pointerEvents={bgReady ? 'auto' : 'none'}
        style={GlobalStyles.centeredContainer}
      >
        <AnimatePresence>
          <MotiView
            animate={{ opacity: Number(bgReady) }}
            exit={{ opacity: 0 }}
            from={{ opacity: 0 }}
            style={styles.sideMenuContainer}
            transition={{ type: 'timing', duration: 300, delay: 150 }}
          >
            <SideMenu
              handleAwards={handleAwardsIconPress}
              handleCalendar={handleCalendarIconPress}
              handleMarket={handleMarketIconPress}
              handleSettings={handleSettingsIconPress}
            />
            <OutlinedText
              color={COLORS.yellow}
              fontSize={60}
              offset={5}
              strokeColor={COLORS.brown}
              style={styles.title}
            >
              BuildTower
            </OutlinedText>

            <MotiView
              animate={{ opacity: Number(bgReady) }}
              from={{ opacity: 0 }}
              key="start-button"
              style={styles.startButton}
              transition={{ type: 'timing', duration: 300, delay: 200 }}
            >
              <Button
                onPress={handleStartButtonPress}
                textSize={27}
                title="START"
              />
            </MotiView>
          </MotiView>
        </AnimatePresence>
      </SafeAreaView>
      <ActivityModal
        isVisible={activityModalConfig.isVisible}
        onClose={() => {
          setActivityModalConfig((prevState) => ({
            ...prevState,
            isVisible: false,
          }))
        }}
        onReopen={() => {
          setActivityModalConfig((prevState) => ({
            ...prevState,
            isVisible: true,
          }))
        }}
        type={activityModalConfig.type}
      />
    </View>
  )
}

export default WelcomeScreen
