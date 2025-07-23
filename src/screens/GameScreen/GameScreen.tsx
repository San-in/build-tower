import { Header, MonkeyAnimation } from '@components/molecules'
import {
  CustomModal,
  OptionModal,
  UnlockOptionModal,
  WheelOfFortuneModal,
} from '@components/organisms'
import {
  BasicModalContent,
  LevelConditionsModalContent,
  LevelResultModalContent,
  PowerUpModalContent,
} from '@components/organisms/CustomModal/components'
import { EdgeGlowOverlay } from '@components/wrappers'
import { BLOCK_DIMENSION, EMPTY_FUNCTION, LEVEL_CONFIG } from '@constants'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { bananasService, levelService } from '@services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getLevelById, Level } from '@store/slices/levelsSlice'
import {
  EDGE_GLOW_OVERLAY_TYPE,
  GAME_MODAL_TYPE,
  GAME_SCREEN_SUCCESS_ACTION,
  LevelId,
  MODAL_TYPE,
  ModalState,
  MONKEY_ANIMATION_TYPE,
  OPERATOR,
  OptionValue,
  POWER_UP_TYPE,
  SCREENS,
  SELECTED_OPTION,
  Star,
  TOWER,
} from '@types'
import {
  generateRandomNumber,
  getLevelBackground,
  getOptionNumberByOperator,
  getOptionOperators,
  getValidOptionNumber,
  showIsUserNeedHelp,
} from '@utils'
import { MotiView } from 'moti'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  View,
} from 'react-native'

import {
  BlockTowerCreator,
  BuildTowerSplash,
  NextButton,
  PrizeSection,
  ProgressBadge,
  ResetStepsModal,
  YouWinBanner,
} from './components'
import {
  INITIAL_BUILD_MODAL_STATE,
  INITIAL_INIT_BUILD_TOWER_MODAL_STATE,
  INITIAL_MODAL_STATE,
  INITIAL_MONKEY_ANIMATION_MODAL_STATE,
  INITIAL_OPTION_STATE,
  INITIAL_RESET_STEPS_MODAL_STATE,
  INITIAL_SUCCESS_ACTION_MODAL_STATE,
} from './constants'
import { styles } from './GameScreen.styles'

const GameScreen: FC = () => {
  // HOOKS
  const {
    params: { level },
  } = useRoute<RouteProp<GameStackParamList, SCREENS.GameScreen>>()
  const scrollViewRef = useRef<ScrollView>(null)
  const { stars } = useAppSelector(getLevelById(level)) as Level
  const navigation = useNavigation<NavigationProp<GameStackParamList>>()
  const dispatch = useAppDispatch()

  // STATES
  const [step, setStep] = useState(0)
  const [initialBlockValue, setInitialBlockValue] = useState(0)
  const [userBlockValue, setUserBlockValue] = useState(0)
  const [focusedTower, setFocusedTower] = useState<TOWER>(TOWER.First)
  const [isScaledTower, setIsScaledTower] = useState(false)
  const [firstOptionCard, setFirstOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [secondOptionCard, setSecondOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [chosenOption, setChosenOption] = useState<SELECTED_OPTION>(
    SELECTED_OPTION.None
  )
  const [isPrizeVisible, setIsPrizeVisible] = useState(false)
  const [isInterfacesVisible, setIsInterfacesVisible] = useState(false)
  const [isLevelFinished, setIsLevelFinished] = useState(false)

  const [isModalOptionVisible, setIsModalOptionVisible] = useState(false)
  const [actionModalData, setActionModalData] =
    useState<ModalState<GAME_MODAL_TYPE>>(INITIAL_MODAL_STATE)
  const [initBuildTowerModalData, setInitBuildTowerModalData] = useState<
    ModalState<TOWER>
  >(INITIAL_INIT_BUILD_TOWER_MODAL_STATE)
  const [buildModalData, setBuildModalData] = useState<ModalState<TOWER>>(
    INITIAL_BUILD_MODAL_STATE
  )
  const [monkeyAnimationData, setMonkeyAnimationData] = useState<
    ModalState<MONKEY_ANIMATION_TYPE>
  >(INITIAL_MONKEY_ANIMATION_MODAL_STATE)
  const [resetStepsModalData, setResetStepsModalData] = useState(
    INITIAL_RESET_STEPS_MODAL_STATE
  )
  const [successActionInfoModalData, setSuccessActionInfoModalData] = useState<
    ModalState<GAME_SCREEN_SUCCESS_ACTION>
  >(INITIAL_SUCCESS_ACTION_MODAL_STATE)

  const [isTowerBuilding, setIsTowerBuilding] = useState(false)

  // LOCAL CONSTANT
  const {
    attempts,
    fistTower,
    secondTower,
    simpleOperators,
    multiplicativeOperators,
    prize,
  } = LEVEL_CONFIG[level]

  const animationRestartKey = `${actionModalData.isVisible}${buildModalData.isVisible} 
  ${monkeyAnimationData.isVisible}`
  const isOutOfAttempts = useMemo(() => step > attempts, [attempts, step])

  // CALLBACKS WITHOUT DEPENDENCIES
  const handleResetLevel = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFocusedTower(TOWER.First)
    setStep(0)
    setChosenOption(SELECTED_OPTION.None)
    setSecondOptionCard(INITIAL_OPTION_STATE)
    setFirstOptionCard(INITIAL_OPTION_STATE)
    setIsPrizeVisible(false)
    setMonkeyAnimationData(INITIAL_MONKEY_ANIMATION_MODAL_STATE)
    setInitBuildTowerModalData(INITIAL_INIT_BUILD_TOWER_MODAL_STATE)
    setIsInterfacesVisible(false)
    setIsLevelFinished(false)

    setTimeout(() => {
      setSuccessActionInfoModalData(INITIAL_SUCCESS_ACTION_MODAL_STATE)
      setResetStepsModalData(INITIAL_RESET_STEPS_MODAL_STATE)
      setIsScaledTower(false)
      setInitialBlockValue(0)
      setUserBlockValue(0)
      setBuildModalData(INITIAL_BUILD_MODAL_STATE)
      setIsTowerBuilding(false)
    }, 1500)
  }, [])

  const handleCloseMonkeyAnimation = () => {
    setMonkeyAnimationData((prevState) => ({ ...prevState, isVisible: false }))
  }

  const handleOpenMonkeyAnimation = (type: MONKEY_ANIMATION_TYPE) => {
    setMonkeyAnimationData({
      isVisible: true,
      type,
    })
  }

  const handleCloseActionModal = useCallback(() => {
    setActionModalData((prevState) => ({ ...prevState, isVisible: false }))
  }, [])

  const handleOpenActionModal = (type: GAME_MODAL_TYPE) => {
    setActionModalData({ isVisible: true, type })
  }

  const handleInitSecondTowerCallBack = (number: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFocusedTower(TOWER.Second)
    setUserBlockValue(number)
    setStep(1)
    setBuildModalData((prevState) => ({ ...prevState, isVisible: false }))
  }

  const handleGetPrizeAndUnlockLevel = useCallback(
    async ({
      prize,
      earnedStars,
      isDoublePrize = false,
      level,
    }: {
      prize: number
      earnedStars: Star
      isDoublePrize?: boolean
      level: LevelId
    }) => {
      const calculatedPrize = isDoublePrize ? prize * 2 : prize
      await levelService.updateLevelRatingAndUnlockNext(
        dispatch,
        level,
        earnedStars
      )
      await bananasService.addBananas(dispatch, calculatedPrize)
    },
    [dispatch]
  )

  const handleCloseSuccessActionModal = () =>
    setSuccessActionInfoModalData((prevState) => ({
      ...prevState,
      isVisible: false,
    }))

  const handleCloseResetStepsModal = () => () => {
    setResetStepsModalData((prevState) => ({
      ...prevState,
      isVisible: false,
    }))
  }

  const handlePressBuildTowerSplash = () => {
    setInitBuildTowerModalData({
      isVisible: true,
      type: buildModalData.type,
    })
  }

  // const handleAddPowerUp = async (type: MARKET_PRODUCT) => {
  //   await marketService.increment(dispatch, type)
  // }

  // const handleAddBananas = async (quantity: number) => {
  //   await bananasService.addBananas(dispatch, quantity)
  // }

  // CALLBACKS WITH DEPENDENCIES
  const handleGoHome = useCallback(async () => {
    navigation.navigate(SCREENS.WelcomeScreen)
    handleCloseActionModal()
  }, [handleCloseActionModal, navigation])

  const handleResetLevelPressed = useCallback(() => {
    handleResetLevel()
    handleCloseActionModal()
  }, [handleCloseActionModal, handleResetLevel])

  const handleResetSteps = useCallback(() => {
    handleCloseActionModal()
    setResetStepsModalData((prevState) => ({ ...prevState, isVisible: true }))
  }, [handleCloseActionModal])

  const userBlockManipulation = useCallback(() => {
    const selectedCard =
      chosenOption === SELECTED_OPTION.First
        ? firstOptionCard
        : secondOptionCard
    const { number, operator } = selectedCard

    if (operator === OPERATOR.Plus) {
      setUserBlockValue((prevState) => prevState + number)
    }
    if (operator === OPERATOR.Minus) {
      setUserBlockValue((prevState) =>
        prevState - number > 1 ? prevState - number : 1
      )
    }
    if (operator === OPERATOR.Division) {
      setUserBlockValue((prevState) =>
        Math.round(prevState / number) > 1 ? Math.round(prevState / number) : 1
      )
    }
    if (operator === OPERATOR.Multiply) {
      setUserBlockValue((prevState) => prevState * number)
    }
    setStep((prevState) => prevState + 1)
    setChosenOption(SELECTED_OPTION.None)
    setFirstOptionCard(INITIAL_OPTION_STATE)
    setSecondOptionCard(INITIAL_OPTION_STATE)
    handleCloseMonkeyAnimation()
  }, [chosenOption, firstOptionCard, secondOptionCard])

  const handleInitFirstTowerCallBack = useCallback((number: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setInitialBlockValue(number)
    setBuildModalData((prevState) => ({ ...prevState, isVisible: false }))
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      handleOpenActionModal(GAME_MODAL_TYPE.LevelConditions)
    }, 1500)
  }, [])

  const handleRandomAddBlockPress = () =>
    userBlockValue
      ? handleOpenActionModal(GAME_MODAL_TYPE.AddBlocks)
      : handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)

  const handleRandomRemoveBlockPress = () =>
    userBlockValue
      ? handleOpenActionModal(GAME_MODAL_TYPE.RemoveBlocks)
      : handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)

  const handleLevelResultGetPrizePressed = useCallback(
    async ({ prize, stars: earnedStars }: { prize: number; stars: Star }) => {
      handleCloseActionModal()
      await handleGetPrizeAndUnlockLevel({
        prize,
        earnedStars,
        level,
      })
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setIsLevelFinished(true)
      setIsPrizeVisible(false)
      handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.JumpToTop)
    },
    [handleCloseActionModal, handleGetPrizeAndUnlockLevel, level]
  )

  const handleLevelResultDoublePrizePressed = useCallback(
    async ({ prize, stars: earnedStars }: { prize: number; stars: Star }) => {
      // TODO: add watching adds logic
      await handleLevelResultGetPrizePressed({ prize, stars: earnedStars })
    },
    [handleLevelResultGetPrizePressed]
  )

  const handleLevelResultResetLevelPressed = useCallback(
    async ({ prize, stars: earnedStars }: { prize: number; stars: Star }) => {
      if (prize) {
        await handleGetPrizeAndUnlockLevel({
          prize,
          earnedStars,
          level,
        })
      }
      handleCloseActionModal()
      handleResetLevelPressed()
    },
    [
      handleCloseActionModal,
      handleGetPrizeAndUnlockLevel,
      handleResetLevelPressed,
      level,
    ]
  )

  const handleLevelConditionsConfirm = useCallback(() => {
    setIsPrizeVisible(true)
    setIsScaledTower(true)
    handleCloseActionModal()
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setBuildModalData({ isVisible: true, type: TOWER.Second })
    }, 1500)
  }, [handleCloseActionModal])

  const handleMonkeyAnimationRunAndJumpFinished = useCallback(() => {
    handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.Landing)
  }, [])

  const handleMonkeyAnimationLandingFinished = useCallback(() => {
    if (isOutOfAttempts) {
      setTimeout(() => handleOpenActionModal(GAME_MODAL_TYPE.LevelResult), 800)
      return
    }
    handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.Idle)
    setIsInterfacesVisible(true)
  }, [isOutOfAttempts])

  const handleMonkeyAnimationJumpToTopFinished = useCallback(
    () =>
      isLevelFinished
        ? setTimeout(() => {
            handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.Celebration)
          }, 800)
        : userBlockManipulation(),
    [isLevelFinished, userBlockManipulation]
  )

  const handleNextStepPress = useCallback(() => {
    if (isOutOfAttempts) {
      return
    }

    if (firstOptionCard.number && secondOptionCard.number) {
      setIsModalOptionVisible(true)
      return
    }
    const { help: isUserNeedHelp, strongHelp: isUserNeedStrongHelp } =
      showIsUserNeedHelp(userBlockValue, initialBlockValue)

    const [firstOperator, secondOperator] = getOptionOperators(
      userBlockValue === 1,
      isUserNeedHelp
    )

    const firstNumber = getOptionNumberByOperator({
      operator: firstOperator,
      simpleOperators,
      multiplicativeOperators,
    })

    let secondNumber = getOptionNumberByOperator({
      operator: secondOperator,
      simpleOperators,
      multiplicativeOperators,
    })

    if (isUserNeedHelp) {
      secondNumber = isUserNeedStrongHelp
        ? multiplicativeOperators.end
        : generateRandomNumber({ min: 2, max: 3 })
    }

    setFirstOptionCard({
      number: getValidOptionNumber({
        operator: firstOperator,
        number: firstNumber,
        totalNumbers: userBlockValue,
      }),
      operator: firstOperator,
    })
    setSecondOptionCard({
      number: getValidOptionNumber({
        operator: secondOperator,
        number: secondNumber,
        totalNumbers: userBlockValue,
      }),
      operator: secondOperator,
    })
    setIsModalOptionVisible(true)
  }, [
    firstOptionCard.number,
    initialBlockValue,
    isOutOfAttempts,
    multiplicativeOperators,
    secondOptionCard.number,
    simpleOperators,
    userBlockValue,
  ])

  const handleConfirmResetStepsModal = useCallback(() => {
    handleCloseActionModal()
    setStep(1)
    setResetStepsModalData((prevState) => ({
      ...prevState,
      isVisible: false,
    }))
    setSuccessActionInfoModalData({
      isVisible: true,
      type: GAME_SCREEN_SUCCESS_ACTION.ResetSteps,
    })
    setTimeout(() => {
      setResetStepsModalData((prevState) => ({
        ...prevState,
        attempt: prevState.attempt - 1,
      }))
    }, 1000)
  }, [handleCloseActionModal])

  const handlePressCloseResetStepsModal = () => () => {
    handleCloseResetStepsModal()
    handleOpenActionModal(GAME_MODAL_TYPE.LevelResult)
  }

  const handleChangeOption = (newOption: SELECTED_OPTION) => {
    if (!isOutOfAttempts) {
      handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.JumpToTop)
    }
    setChosenOption(newOption)
    setIsTowerBuilding(true)
  }

  const handleBlockTowerCreatingEnd = () => {
    if (
      step === 1 &&
      !monkeyAnimationData.isVisible &&
      monkeyAnimationData.type === MONKEY_ANIMATION_TYPE.RunAndJump
    ) {
      handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.RunAndJump)
      return
    }
    if (
      !monkeyAnimationData.isVisible &&
      monkeyAnimationData.type === MONKEY_ANIMATION_TYPE.JumpToTop
    ) {
      handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.Landing)
      setIsTowerBuilding(false)
    }
  }

  // CONFIGS
  const monkeyAnimationConfig = {
    [MONKEY_ANIMATION_TYPE.RunAndJump]: {
      size: 400,
      loop: false,
      onFinishCalBack: handleMonkeyAnimationRunAndJumpFinished,
      speed: 3,
    },
    [MONKEY_ANIMATION_TYPE.Landing]: {
      size: 100,
      loop: false,
      onFinishCalBack: handleMonkeyAnimationLandingFinished,
      speed: 4,
    },
    [MONKEY_ANIMATION_TYPE.Idle]: {
      size: 100,
      loop: true,
      onFinishCalBack: EMPTY_FUNCTION,
      speed: 3,
    },
    [MONKEY_ANIMATION_TYPE.JumpToTop]: {
      size: 140,
      loop: false,
      onFinishCalBack: handleMonkeyAnimationJumpToTopFinished,
      speed: 4,
    },
    [MONKEY_ANIMATION_TYPE.Celebration]: {
      size: 100,
      loop: false,
      onFinishCalBack: EMPTY_FUNCTION,
      speed: 3,
    },
  }[monkeyAnimationData.type]
  const {
    size: monkeyAnimationSize,
    speed: monkeyAnimationSpeed,
    loop: monkeyAnimationLoop,
    onFinishCalBack: monkeyAnimationCallback,
  } = monkeyAnimationConfig

  const initTowerModalConfig = useMemo(
    () =>
      ({
        [TOWER.First]: {
          initTowerStart: fistTower.start,
          initTowerSectors: fistTower.fortuneWheelData,
          initTowerCallBack: handleInitFirstTowerCallBack,
        },
        [TOWER.Second]: {
          initTowerStart: secondTower.start,
          initTowerSectors: secondTower.fortuneWheelData,
          initTowerCallBack: handleInitSecondTowerCallBack,
        },
      })[initBuildTowerModalData.type],
    [
      fistTower.start,
      fistTower.fortuneWheelData,
      handleInitFirstTowerCallBack,
      secondTower.start,
      secondTower.fortuneWheelData,
      initBuildTowerModalData.type,
    ]
  )
  const { initTowerStart, initTowerSectors, initTowerCallBack } =
    initTowerModalConfig

  const actionModalConfig = useMemo(
    () =>
      ({
        [GAME_MODAL_TYPE.Home]: {
          actionModalHeader: 'Wanna go home?',
          actionModalContent: (
            <BasicModalContent
              onCancel={handleCloseActionModal}
              onConfirm={handleGoHome}
              text={
                'Hold on! If you leave now, your progress will poof — disappear!'
              }
            />
          ),
          actionModalColor: MODAL_TYPE.Orange,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.Reset]: {
          actionModalHeader: 'Start over? Really?',
          actionModalContent: (
            <BasicModalContent
              onCancel={handleCloseActionModal}
              onConfirm={handleResetLevelPressed}
              text={'If you restart now, all your progress will go bye-bye!'}
            />
          ),
          actionModalColor: MODAL_TYPE.Orange,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.AddBlocks]: {
          actionModalHeader: 'Let`s add some blocks?',
          actionModalContent: (
            <PowerUpModalContent
              onCancel={handleCloseActionModal}
              onConfirm={EMPTY_FUNCTION}
              type={POWER_UP_TYPE.Plus}
            />
          ),
          actionModalColor: MODAL_TYPE.Green,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.RemoveBlocks]: {
          actionModalHeader: 'Let`s remove some blocks?',
          actionModalContent: (
            <PowerUpModalContent
              onCancel={handleCloseActionModal}
              onConfirm={EMPTY_FUNCTION}
              type={POWER_UP_TYPE.Minus}
            />
          ),
          actionModalColor: MODAL_TYPE.Green,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.PowerUpWarning]: {
          actionModalHeader: 'Build both towers first',
          actionModalContent: (
            <BasicModalContent
              confirmButtonText={'OK'}
              onConfirm={handleCloseActionModal}
              text={
                'You’ll unlock this power-up once both towers are completed.'
              }
            />
          ),
          actionModalColor: MODAL_TYPE.Orange,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.LevelConditions]: {
          actionModalContent: (
            <LevelConditionsModalContent
              initialBlocksQuantity={initialBlockValue}
              onConfirm={handleLevelConditionsConfirm}
              prize={prize}
              stars={stars}
            />
          ),
          actionModalColor: MODAL_TYPE.Purple,
          withCrossIcon: false,
          onCrossIconPress: handleCloseActionModal,
          actionModalStyles: styles.levelConditionModalContainer,
        },
        [GAME_MODAL_TYPE.LevelResult]: {
          actionModalContent: (
            <LevelResultModalContent
              initialBlockValue={initialBlockValue}
              isResetStepsDisabled={!resetStepsModalData.attempt}
              onGetDoublePrize={handleLevelResultDoublePrizePressed}
              onGetPrize={handleLevelResultGetPrizePressed}
              onGoHome={handleGoHome}
              onResetSteps={handleResetSteps}
              onRestartLevel={handleLevelResultResetLevelPressed}
              prize={prize}
              stars={stars}
              userBlockValue={userBlockValue}
            />
          ),
          actionModalColor: MODAL_TYPE.Blue,
          withCrossIcon: false,
          onCrossIconPress: handleGoHome,
        },
      })[actionModalData.type],
    [
      handleCloseActionModal,
      handleGoHome,
      handleResetLevelPressed,
      initialBlockValue,
      handleLevelConditionsConfirm,
      prize,
      stars,
      resetStepsModalData.attempt,
      handleLevelResultDoublePrizePressed,
      handleLevelResultGetPrizePressed,
      handleResetSteps,
      handleLevelResultResetLevelPressed,
      userBlockValue,
      actionModalData.type,
    ]
  )
  const {
    actionModalHeader,
    actionModalContent,
    actionModalColor,
    actionModalStyles = {},
    withCrossIcon,
    onCrossIconPress,
  } = actionModalConfig

  // useEffects
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTimeout(() => {
      if (scrollViewRef?.current && focusedTower === TOWER.Second) {
        const scrolledPosition =
          (initialBlockValue - userBlockValue) * BLOCK_DIMENSION
        scrollViewRef.current.scrollTo({
          x: 0,
          y: scrolledPosition,
          animated: true,
        })
      }
    }, 100)
  }, [scrollViewRef, initialBlockValue, userBlockValue, focusedTower])

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    if (
      scrollViewRef?.current &&
      initialBlockValue &&
      focusedTower === TOWER.First
    ) {
      scrollViewRef.current.scrollToEnd()
    }
  }, [focusedTower, initialBlockValue])

  return (
    <>
      <ImageBackground
        source={getLevelBackground(level)}
        style={styles.backgroundContainer}
      >
        {isLevelFinished && (
          <>
            <EdgeGlowOverlay
              onPress={handleGoHome}
              sides={EDGE_GLOW_OVERLAY_TYPE.Sides}
            />
            <YouWinBanner />
          </>
        )}
        <Header
          level={level}
          onHomePress={() => handleOpenActionModal(GAME_MODAL_TYPE.Home)}
          onRandomAddBlockPress={handleRandomAddBlockPress}
          onRandomRemoveBlockPress={handleRandomRemoveBlockPress}
          onResetPress={() => handleOpenActionModal(GAME_MODAL_TYPE.Reset)}
        />
        {isInterfacesVisible && (
          <View style={styles.progressBadgeContainer}>
            <ProgressBadge
              animationKey={animationRestartKey}
              initialValue={initialBlockValue}
              isTowerBuilding={isTowerBuilding}
              userValue={userBlockValue}
            />
          </View>
        )}
        <ScrollView
          alwaysBounceVertical={false}
          bounces={false}
          contentContainerStyle={styles.towersScrollWrapperContainer}
          ref={scrollViewRef}
        >
          <View style={styles.towersContainer}>
            {!!initialBlockValue && (
              <View style={styles.initialBlockTowerContainer}>
                <PrizeSection
                  animationKey={animationRestartKey}
                  isVisible={isPrizeVisible}
                />
                {isLevelFinished && (
                  <View style={styles.monkeyStageInitTowerContainer}>
                    <MotiView
                      animate={{
                        opacity: !isPrizeVisible && isLevelFinished ? 1 : 0,
                      }}
                      from={{ opacity: 0 }}
                      style={styles.monkeyStageInitTower}
                      transition={{ type: 'timing', duration: 200, delay: 300 }}
                    >
                      <MonkeyAnimation
                        isVisible={monkeyAnimationData.isVisible}
                        loop={monkeyAnimationLoop}
                        onFinish={monkeyAnimationCallback}
                        size={monkeyAnimationSize}
                        speed={monkeyAnimationSpeed}
                        type={monkeyAnimationData.type}
                      />
                    </MotiView>
                  </View>
                )}

                <BlockTowerCreator
                  isScaled={isScaledTower}
                  quantity={initialBlockValue}
                  type={TOWER.First}
                />
              </View>
            )}
            {!!userBlockValue && (
              <View style={styles.userBlockTowerContainer}>
                <View
                  style={[
                    styles.monkeyStageUserTowerContainer,
                    {
                      bottom: userBlockValue * BLOCK_DIMENSION - 12,
                    },
                  ]}
                >
                  {[
                    MONKEY_ANIMATION_TYPE.Idle,
                    MONKEY_ANIMATION_TYPE.Landing,
                    MONKEY_ANIMATION_TYPE.JumpToTop,
                  ].includes(monkeyAnimationData.type) && (
                    <MonkeyAnimation
                      isVisible={monkeyAnimationData.isVisible}
                      loop={monkeyAnimationLoop}
                      onFinish={monkeyAnimationCallback}
                      size={monkeyAnimationSize}
                      speed={monkeyAnimationSpeed}
                      type={monkeyAnimationData.type}
                    />
                  )}
                </View>
                <BlockTowerCreator
                  onAnimatedEnd={handleBlockTowerCreatingEnd}
                  quantity={userBlockValue}
                  type={TOWER.Second}
                />
              </View>
            )}
          </View>
          <View style={styles.monkeyStageGroundContainer}>
            {monkeyAnimationData.type === MONKEY_ANIMATION_TYPE.RunAndJump && (
              <MonkeyAnimation
                isVisible={monkeyAnimationData.isVisible}
                loop={monkeyAnimationLoop}
                onFinish={monkeyAnimationCallback}
                size={monkeyAnimationSize}
                speed={monkeyAnimationSpeed}
                type={monkeyAnimationData.type}
              />
            )}
          </View>
          <ImageBackground
            source={require('../../../assets/images/ground.png')}
            style={styles.bottomGround}
          />
        </ScrollView>
      </ImageBackground>
      {buildModalData.isVisible && (
        <BuildTowerSplash
          onPress={handlePressBuildTowerSplash}
          tower={buildModalData.type}
        />
      )}
      <NextButton
        isDisabled={isOutOfAttempts || isTowerBuilding}
        isLoading={isTowerBuilding}
        isVisible={isInterfacesVisible}
        onPress={handleNextStepPress}
      />
      <WheelOfFortuneModal
        initialResult={initTowerStart}
        isVisible={initBuildTowerModalData.isVisible}
        onFinish={initTowerCallBack}
        sectors={initTowerSectors}
        setIsVisible={setInitBuildTowerModalData}
      />
      <OptionModal
        changeOption={handleChangeOption}
        firstOption={firstOptionCard}
        handleClose={() => setIsModalOptionVisible(false)}
        modalVisible={isModalOptionVisible}
        secondOption={secondOptionCard}
        step={step}
      />
      <CustomModal
        containerStyles={actionModalStyles}
        handleClose={onCrossIconPress}
        modalVisible={actionModalData.isVisible}
        title={actionModalHeader}
        type={actionModalColor}
        withCrossIcon={withCrossIcon}
      >
        {actionModalContent}
      </CustomModal>
      <UnlockOptionModal
        attempt={resetStepsModalData.attempt}
        initialPrice={Math.round(prize * 0.25)}
        onClose={handlePressCloseResetStepsModal}
        onConfirm={handleConfirmResetStepsModal}
        visible={resetStepsModalData.isVisible}
      />
      <ResetStepsModal
        isVisible={successActionInfoModalData.isVisible}
        onPress={handleCloseSuccessActionModal}
      />
    </>
  )
}

export default GameScreen
