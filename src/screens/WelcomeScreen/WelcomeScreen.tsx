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
import { useAppDispatch } from '@store/hooks'
import { increaseRepeatsForAward } from '@store/slices/awardsSlice'
import { COLORS, GlobalStyles } from '@theme'
import { MARKET_SPECIAL_PRIZE, SCREENS } from '@types'
import { Image } from 'expo-image'
import LottieView from 'lottie-react-native'
import { AnimatePresence, MotiView } from 'moti'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  ActivityCalendar,
  ActivityModal,
  SideMenu,
  SuccessAwardClaimedModal,
} from './components'
import { ACTIVITY_MODAL_TYPES } from './components/AcitvityModal/ActivityModal.types'
import { AWARD_TYPE } from './components/AcitvityModal/components/AwardsContent/config'
import { SuccessAwardClaimedModalProps } from './components/SuccessAwardClaimedModal/SuccessAwardClaimedModal'
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
const INITIAL_AWARD_CLAIMED_MODAL_STATE: Omit<
  SuccessAwardClaimedModalProps,
  'onPress'
> = {
  title: 'Congratulations!',
  typePrize: MARKET_SPECIAL_PRIZE.Bananas,
  countPrize: 0,
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

  const dispatch = useAppDispatch()
  const [activityModalConfig, setActivityModalConfig] = useState<ActivityModal>(
    INITIAL_ACTIVITY_MODAL_STATE
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [successAwardClaimedModal, setSuccessAwardClaimedModal] = useState<
    Omit<SuccessAwardClaimedModalProps, 'onPress'>
  >(INITIAL_AWARD_CLAIMED_MODAL_STATE)

  const {
    isVisible: isAwardsModalVisible,
    typePrize,
    countPrize,
    title: awardModalTitle,
  } = successAwardClaimedModal
  const handleStartButtonPress = () => {
    setIsCalendarOpen(false)
    navigation.navigate(SCREENS.LevelsScreen)
  }

  const handleAwardsIconPress = () => {
    setIsCalendarOpen(false)
    handleOpenActivityModal(ACTIVITY_MODAL_TYPES.AWARDS)
  }
  const handleCalendarIconPress = () => {
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
              handleClose={() => setIsCalendarOpen(false)}
              handleMarket={() =>
                handleOpenActivityModal(ACTIVITY_MODAL_TYPES.MARKET)
              }
              handleSettings={() =>
                handleOpenActivityModal(ACTIVITY_MODAL_TYPES.SETTINGS)
              }
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
              <Button
                onPress={() =>
                  dispatch(increaseRepeatsForAward(AWARD_TYPE.EARLY_CLEAR))
                }
                title="Add Award"
              />
            </MotiView>
          </MotiView>
        </AnimatePresence>
      </SafeAreaView>
      <ActivityModal
        isVisible={activityModalConfig.isVisible}
        onAwardClaimModalShow={(data) => {
          setSuccessAwardClaimedModal(data)
          handleCloseActivityModal()
        }}
        onClose={handleCloseActivityModal}
        onReopen={() => {
          setActivityModalConfig((prevState) => ({
            ...prevState,
            isVisible: true,
          }))
        }}
        type={activityModalConfig.type}
      />
      <ActivityCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
      <SuccessAwardClaimedModal
        countPrize={countPrize}
        isVisible={isAwardsModalVisible}
        onPress={() => {
          setSuccessAwardClaimedModal((prevState) => ({
            ...prevState,
            isVisible: false,
          }))

          setActivityModalConfig((prevState) => ({
            ...prevState,
            isVisible: true,
          }))
        }}
        title={awardModalTitle}
        typePrize={typePrize}
      />
    </View>
  )
}

export default WelcomeScreen
