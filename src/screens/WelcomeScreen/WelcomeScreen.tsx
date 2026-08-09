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
import { useAssetPreload, useAssetsReady, useBackgroundMusic } from '@hooks'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { useNavigation } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { COLORS, GlobalStyles } from '@theme'
import { SCREENS } from '@types'
import { formatTabletElementsSize, playSfx } from '@utils'
import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { AnimatePresence, MotiView } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ActivityCalendar, ActivityModal, SideMenu } from './components'
import { ACTIVITY_MODAL_TYPES } from './components/ActivityModal/ActivityModal.types'
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
  useBackgroundMusic('welcome')
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleStartButtonPress = () => {
    setIsCalendarOpen(false)
    navigation.navigate(SCREENS.LevelsScreen)
  }

  const handleAwardsIconPress = () => {
    playSfx('modal_open')
    setIsCalendarOpen(false)
    handleOpenActivityModal(ACTIVITY_MODAL_TYPES.AWARDS)
  }
  const handleCalendarIconPress = () => {
    playSfx('modal_open')
    handleCloseActivityModal()
    setIsCalendarOpen((prevState) => !prevState)
  }
  const handleOpenActivityModal = (type: ACTIVITY_MODAL_TYPES) => {
    setIsCalendarOpen(false)
    setActivityModalConfig({
      type,
      isVisible: true,
    })
  }
  const handleCloseActivityModal = () =>
    setActivityModalConfig((prevState) => ({ ...prevState, isVisible: false }))
  const handleReopenActivityModal = () =>
    setActivityModalConfig((prevState) => ({ ...prevState, isVisible: true }))
  const handleCloseCalendar = () => {
    setIsCalendarOpen(false)
  }
  const handleOpenMarket = () => {
    playSfx('modal_open')
    handleOpenActivityModal(ACTIVITY_MODAL_TYPES.MARKET)
  }
  const handleOpenSettings = () => {
    playSfx('modal_open')
    handleOpenActivityModal(ACTIVITY_MODAL_TYPES.SETTINGS)
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
              handleClose={handleCloseCalendar}
              handleMarket={handleOpenMarket}
              handleSettings={handleOpenSettings}
            />
            <View style={styles.titleWrapper}>
              <OutlinedText
                color={COLORS.yellow}
                fontSize={formatTabletElementsSize(45)}
                offset={5}
                strokeColor={COLORS.brown}
              >
                BuildTower
              </OutlinedText>
            </View>

            <MotiView
              animate={{ opacity: Number(bgReady) }}
              from={{ opacity: 0 }}
              key="start-button"
              style={styles.startButton}
              transition={{ type: 'timing', duration: 300, delay: 200 }}
            >
              <Button
                onPress={handleStartButtonPress}
                textSize={formatTabletElementsSize(25)}
                title="START"
              />
            </MotiView>
          </MotiView>
        </AnimatePresence>
      </SafeAreaView>
      <ActivityModal
        isVisible={activityModalConfig.isVisible}
        onClose={handleCloseActivityModal}
        onReopen={handleReopenActivityModal}
        type={activityModalConfig.type}
      />
      <ActivityCalendar isOpen={isCalendarOpen} onClose={handleCloseCalendar} />
    </View>
  )
}

export default WelcomeScreen
