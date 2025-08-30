import { ConfettiGif, StarsGif } from '@assets/gifs'
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
  MonkeyModalImg,
  MonkeyNotificationImg,
  MonkeyWizardImg,
  WinBannerImg,
} from '@assets/images'
import { MonkeyNotification } from '@components/atoms'
import { Header, MonkeyAnimation } from '@components/molecules'
import {
  CustomModal,
  OptionModal,
  UnlockOptionModal,
  WheelOfFortuneModal,
} from '@components/organisms'
import {
  AddExtraStepModalContent,
  BasicModalContent,
  LevelConditionsModalContent,
  LevelResultModalContent,
  PowerUpModalContent,
} from '@components/organisms/CustomModal/components'
import { EdgeGlowOverlay, Toast } from '@components/wrappers'
import {
  BLOCK_DIMENSION,
  EMPTY_FUNCTION,
  LEVEL_CONFIG,
  POWER_UP_BLOCK_MANIPULATION_LIMITS,
} from '@constants'
import { useAssetPreload, useAssetsReady } from '@hooks'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { bananasService, levelService, marketService } from '@services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getLevelById, Level } from '@store/slices/levelsSlice'
import {
  selectTotalAddRandomBlocks,
  selectTotalRemoveRandomBlocks,
} from '@store/slices/marketSlice'
import { COLORS } from '@theme'
import {
  EDGE_GLOW_OVERLAY_TYPE,
  FortuneWheelModalState,
  GAME_MODAL_TYPE,
  GAME_SCREEN_SUCCESS_ACTION,
  LevelId,
  MARKET_PRODUCT,
  MODAL_TYPE,
  ModalState,
  MONKEY_ANIMATION_TYPE,
  OPERATOR,
  OptionValue,
  POWER_UP_GRADE,
  POWER_UP_TYPE,
  PowerUpActiveActionModalState,
  SCREENS,
  SELECTED_OPTION,
  Star,
  TOWER,
} from '@types'
import {
  generateRandomNumber,
  getLevelBackground,
  getMarketProductByPowerUp,
  getOptionNumberByOperator,
  getOptionOperators,
  getValidOptionNumber,
  showIsUserNeedHelp,
} from '@utils'
import { Image } from 'expo-image'
import { MotiView } from 'moti'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { LayoutAnimation, ScrollView, StyleSheet, View } from 'react-native'

import {
  BlockTowerCreator,
  BuildTowerSplash,
  NextButton,
  PrizeSection,
  ProgressBadge,
  ResetStepsModal,
  YouWinBanner,
} from './components'
import StepBar from './components/StepBar/StepBar'
import {
  INITIAL_BUILD_MODAL_STATE,
  INITIAL_FORTUNE_WHEEL_MODAL_STATE,
  INITIAL_MODAL_STATE,
  INITIAL_MONKEY_ANIMATION_MODAL_STATE,
  INITIAL_OPTION_STATE,
  INITIAL_POWER_UP_ACTIVE_ACTION_MODAL_STATE,
  INITIAL_RESET_STEPS_MODAL_STATE,
  INITIAL_SUCCESS_ACTION_MODAL_STATE,
} from './constants'
import { styles } from './GameScreen.styles'

const ASSET_KEYS = {
  BG: 'background',
  ASSETS: 'assets',
  GROUND: 'ground',
}

const GameScreen: FC = () => {
  // HOOKS
  const {
    params: { level },
  } = useRoute<RouteProp<GameStackParamList, SCREENS.GameScreen>>()
  const scrollViewRef = useRef<ScrollView>(null)
  const { stars } = useAppSelector(getLevelById(level)) as Level
  const totalRemoveBlocksPowerUps = useAppSelector(
    selectTotalRemoveRandomBlocks
  )
  const totalAddBlocksPowerUps = useAppSelector(selectTotalAddRandomBlocks)
  const addExtraStepPowerUps = useAppSelector(
    (state) => state.market?.AddExtraStep
  )
  const backgroundImage = getLevelBackground(level)
  const assetsToPreload = useMemo(
    () => [
      backgroundImage,
      GroundImg,
      StarsGif,
      BlockImg,
      MonkeyNotificationImg,
      MonkeyWizardImg,
      ConfettiGif,
      BackgroundImg,
      WinBannerImg,
      ModalBorderMultiplyImg,
      ModalBorderPlusImg,
      ModalBorderMinusImg,
      ModalBorderDivideImg,
      ModalBorderBlueImg,
      ModalBorderGreenImg,
      ModalBorderOrangeImg,
      ModalBorderPurpleImg,
      MonkeyModalImg,
    ],
    [backgroundImage]
  )
  const { ready: viewReady, done: assetLoaded } = useAssetsReady(
    Object.values(ASSET_KEYS)
  )
  const { ready: assetsReady } = useAssetPreload(assetsToPreload)

  const navigation = useNavigation<NavigationProp<GameStackParamList>>()
  const dispatch = useAppDispatch()

  // STATES
  const [step, setStep] = useState(0)
  const [initialBlockValue, setInitialBlockValue] = useState(0)
  const [userBlockValue, setUserBlockValue] = useState(0)
  const [focusedTower, setFocusedTower] = useState<TOWER>(TOWER.FirstTower)
  const [isScaledTower, setIsScaledTower] = useState(false)
  const [firstOptionCard, setFirstOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [secondOptionCard, setSecondOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [chosenOption, setChosenOption] = useState<SELECTED_OPTION>(
    SELECTED_OPTION.None
  )
  const [isStarsGifVisible, setIsStarsGifVisible] = useState(false)
  const [isPrizeVisible, setIsPrizeVisible] = useState(false)
  const [isInterfacesVisible, setIsInterfacesVisible] = useState(false)
  const [isLevelFinished, setIsLevelFinished] = useState(false)

  const [isModalOptionVisible, setIsModalOptionVisible] = useState(false)
  const [actionModalData, setActionModalData] =
    useState<ModalState<GAME_MODAL_TYPE>>(INITIAL_MODAL_STATE)
  const [fortuneWheelModalData, setFortuneWheelModalData] =
    useState<FortuneWheelModalState>(INITIAL_FORTUNE_WHEEL_MODAL_STATE)
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
  const [powerUpActiveAction, setPowerUpActiveAction] =
    useState<PowerUpActiveActionModalState>(
      INITIAL_POWER_UP_ACTIVE_ACTION_MODAL_STATE
    )
  const [isMonkeyNotificationVisible, setIsMonkeyNotificationVisible] =
    useState(false)
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

  const monkeyNotificationShowedSteps = useMemo(
    () => generateRandomNumber({ min: 2, max: attempts }),
    [attempts]
  )

  const animationRestartKey = `${actionModalData.isVisible}${buildModalData.isVisible} 
  ${monkeyAnimationData.isVisible}`
  const isOutOfAttempts = useMemo(() => step > attempts, [attempts, step])
  const isLevelPrematurelyFinished = useMemo(
    () =>
      Boolean(
        initialBlockValue &&
          userBlockValue === initialBlockValue &&
          !isTowerBuilding
      ),
    [initialBlockValue, isTowerBuilding, userBlockValue]
  )

  const contentVisible = assetsReady && viewReady

  // CALLBACKS WITHOUT DEPENDENCIES
  const handleResetLevel = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFocusedTower(TOWER.FirstTower)
    setStep(0)
    setChosenOption(SELECTED_OPTION.None)
    setSecondOptionCard(INITIAL_OPTION_STATE)
    setFirstOptionCard(INITIAL_OPTION_STATE)
    setIsPrizeVisible(false)
    setMonkeyAnimationData(INITIAL_MONKEY_ANIMATION_MODAL_STATE)
    setFortuneWheelModalData(INITIAL_FORTUNE_WHEEL_MODAL_STATE)
    setIsInterfacesVisible(false)
    setIsLevelFinished(false)
    setPowerUpActiveAction(INITIAL_POWER_UP_ACTIVE_ACTION_MODAL_STATE)

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
    setFocusedTower(TOWER.SecondTower)
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

  const handleCloseResetStepsModal = () => {
    setResetStepsModalData((prevState) => ({
      ...prevState,
      isVisible: false,
    }))
  }

  const handlePressBuildTowerSplash = () => {
    const isFirstTower = buildModalData.type === TOWER.FirstTower
    setFortuneWheelModalData({
      isVisible: true,
      type: buildModalData.type,
      sectors: isFirstTower
        ? fistTower.fortuneWheelData
        : secondTower.fortuneWheelData,
      start: isFirstTower ? fistTower.start : secondTower.start,
    })
  }

  const handleRemovePowerUp = useCallback(
    async (type: MARKET_PRODUCT) => {
      await marketService.decrement(dispatch, type)
    },
    [dispatch]
  )

  // const handleAddPowerUp = async (type: MARKET_PRODUCT) => {
  //   await marketService.increment(dispatch, type)
  // }

  // const handleAddBananas = async (quantity: number) => {
  //   await bananasService.addBananas(dispatch, quantity)
  // }

  const handleRemoveUserBlocks = (number: number) => {
    setUserBlockValue((prevState) =>
      prevState - number > 1 ? prevState - number : 1
    )
  }

  const handleAddUserBlocks = (number: number) => {
    setUserBlockValue((prevState) => prevState + number)
  }

  const handleDivisionUserBlocks = (number: number) => {
    setUserBlockValue((prevState) =>
      Math.round(prevState / number) > 1 ? Math.round(prevState / number) : 1
    )
  }

  const handleMultiplyUserBlocks = (number: number) => {
    setUserBlockValue((prevState) => prevState * number)
  }

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

  const handleUseAddExtraPowerUp = useCallback(async () => {
    handleCloseActionModal()

    await handleRemovePowerUp(MARKET_PRODUCT.AddExtraStep)
    setImmediate(() => {
      setStep((prevState) => Math.max(prevState - 1, 1))
      Toast({
        type: 'success',
        text1: 'Moved one step back!',
        onHide: () => setIsStarsGifVisible(true),
      })
    })
  }, [handleCloseActionModal, handleRemovePowerUp])

  const userBlockManipulation = useCallback(() => {
    const selectedCard =
      chosenOption === SELECTED_OPTION.First
        ? firstOptionCard
        : secondOptionCard
    const { number, operator } = selectedCard

    if (operator === OPERATOR.Plus) {
      handleAddUserBlocks(number)
    }
    if (operator === OPERATOR.Minus) {
      handleRemoveUserBlocks(number)
    }
    if (operator === OPERATOR.Division) {
      handleDivisionUserBlocks(number)
    }
    if (operator === OPERATOR.Multiply) {
      handleMultiplyUserBlocks(number)
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

  const handleRandomAddBlockPress = () => {
    if (!userBlockValue) {
      return
    }
    if (!totalAddBlocksPowerUps) {
      handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)
      return
    }

    handleOpenActionModal(GAME_MODAL_TYPE.AddBlocks)
  }

  const handleRandomRemoveBlockPress = () => {
    if (!userBlockValue || userBlockValue <= 1) {
      if (userBlockValue <= 1) {
        Toast({
          type: 'info',
          text1: "Just 1 block left — can't remove more!",
        })
      }

      return
    }
    if (!totalRemoveBlocksPowerUps) {
      handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)
      return
    }

    handleOpenActionModal(GAME_MODAL_TYPE.RemoveBlocks)
  }

  const handleHomeButtonPress = () => {
    if (!isInterfacesVisible) {
      return
    }
    handleOpenActionModal(GAME_MODAL_TYPE.Home)
  }

  const handleResetButtonPress = () => {
    if (!isInterfacesVisible) {
      return
    }
    handleOpenActionModal(GAME_MODAL_TYPE.Reset)
  }

  const handleAddExtraStepPress = () => {
    if (!userBlockValue) {
      return
    }
    if (!addExtraStepPowerUps) {
      handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)
      return
    }
    if (step === 1) {
      Toast({
        type: 'info',
        text1: "You're already at the first step!",
      })
      return
    }
    handleOpenActionModal(GAME_MODAL_TYPE.AddExtraStep)
  }

  const handleScrollToTop = () => {
    if (scrollViewRef?.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      })
    }
  }

  const handleLevelFinished = useCallback(
    async ({ prize, stars: earnedStars }: { prize: number; stars: Star }) => {
      handleScrollToTop()
      await handleGetPrizeAndUnlockLevel({
        prize,
        earnedStars,
        level,
      })
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setIsLevelFinished(true)
      setIsPrizeVisible(false)
      setIsInterfacesVisible(false)
      handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.JumpToTop)
    },
    [handleGetPrizeAndUnlockLevel, level]
  )

  const handleLevelResultGetPrizePressed = useCallback(
    async ({ prize, stars: earnedStars }: { prize: number; stars: Star }) => {
      handleCloseActionModal()
      await handleLevelFinished({ prize, stars: earnedStars })
    },
    [handleCloseActionModal, handleLevelFinished]
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
      setBuildModalData({ isVisible: true, type: TOWER.SecondTower })
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

    if (monkeyNotificationShowedSteps === step && !isLevelPrematurelyFinished) {
      setIsMonkeyNotificationVisible(true)
    }
    handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.Idle)
    setIsInterfacesVisible(true)
  }, [
    isOutOfAttempts,
    monkeyNotificationShowedSteps,
    step,
    isLevelPrematurelyFinished,
  ])

  const handleMonkeyAnimationJumpToTopFinished = useCallback(() => {
    if (isLevelFinished) {
      setTimeout(() => {
        handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.Celebration)
      }, 800)
      return
    }
    const { type, number } = powerUpActiveAction
    if (type === POWER_UP_TYPE.AddRandomBlocks) {
      handleAddUserBlocks(number)
      handleCloseMonkeyAnimation()
      setPowerUpActiveAction(INITIAL_POWER_UP_ACTIVE_ACTION_MODAL_STATE)
      return
    }
    if (type === POWER_UP_TYPE.RemoveRandomBlocks) {
      handleRemoveUserBlocks(number)
      handleCloseMonkeyAnimation()
      setPowerUpActiveAction(INITIAL_POWER_UP_ACTIVE_ACTION_MODAL_STATE)
      return
    }

    userBlockManipulation()
  }, [isLevelFinished, powerUpActiveAction, userBlockManipulation])

  const handleNextStepPress = useCallback(() => {
    if (isOutOfAttempts) {
      return
    }
    // handleAddPowerUp(MARKET_PRODUCT.RemoveRandomBlocks_Gold)
    // return

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

    setTimeout(() => {
      setSuccessActionInfoModalData({
        isVisible: true,
        type: GAME_SCREEN_SUCCESS_ACTION.ResetSteps,
      })
      setResetStepsModalData((prevState) => ({
        ...prevState,
        attempt: prevState.attempt - 1,
      }))
    }, 800)
  }, [handleCloseActionModal])

  const handlePressCloseResetStepsModal = () => {
    handleCloseResetStepsModal()
    setTimeout(() => {
      handleOpenActionModal(GAME_MODAL_TYPE.LevelResult)
    }, 500)
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

  const handleChangeBlocksValuePowerUpPressed = useCallback(
    ({
      grade,
      type,
    }: {
      grade: POWER_UP_GRADE | null
      type: POWER_UP_TYPE
    }) => {
      if (grade) {
        const sectors = Array.from({
          length: POWER_UP_BLOCK_MANIPULATION_LIMITS[grade].max,
        }).map((_, index) => `${index + 1}`)

        setFortuneWheelModalData({
          isVisible: true,
          start: POWER_UP_BLOCK_MANIPULATION_LIMITS[grade].min,
          sectors,
          type,
        })
        const marketProduct = getMarketProductByPowerUp(type, grade)
        handleCloseActionModal()
        if (marketProduct) {
          setTimeout(async () => {
            await handleRemovePowerUp(marketProduct)
          }, 1000)
        }
      }
    },
    [handleCloseActionModal, handleRemovePowerUp]
  )

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

  const fortuneWheelModalCallbacks = useMemo(
    () =>
      ({
        [TOWER.FirstTower]: {
          fortuneWheelCallBack: handleInitFirstTowerCallBack,
        },
        [TOWER.SecondTower]: {
          fortuneWheelCallBack: handleInitSecondTowerCallBack,
        },
        [POWER_UP_TYPE.AddRandomBlocks]: {
          fortuneWheelCallBack: (number: number) => {
            setPowerUpActiveAction({
              type: POWER_UP_TYPE.AddRandomBlocks,
              number,
            })
            handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.JumpToTop)
          },
        },
        [POWER_UP_TYPE.RemoveRandomBlocks]: {
          fortuneWheelCallBack: (number: number) => {
            setPowerUpActiveAction({
              type: POWER_UP_TYPE.RemoveRandomBlocks,
              number,
            })
            if (number >= userBlockValue) {
              handleOpenActionModal(GAME_MODAL_TYPE.RemoveBlocksWarning)
              return
            }

            handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.JumpToTop)
          },
        },
      })[fortuneWheelModalData.type],
    [handleInitFirstTowerCallBack, fortuneWheelModalData.type, userBlockValue]
  )

  const { fortuneWheelCallBack } = fortuneWheelModalCallbacks

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
        [GAME_MODAL_TYPE.RemoveBlocksWarning]: {
          actionModalHeader: 'Heads up!',
          actionModalContent: (
            <BasicModalContent
              confirmButtonText={'Understand'}
              onConfirm={() => {
                handleOpenMonkeyAnimation(MONKEY_ANIMATION_TYPE.JumpToTop)
                handleCloseActionModal()
              }}
              /* eslint-disable-next-line max-len */
              text={`Your tower is short... We’ll remove max ${userBlockValue - 1} block${userBlockValue === 1 ? '' : 's'} to leave at least 1 standing.`}
            />
          ),
          actionModalColor: MODAL_TYPE.Blue,
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
        [GAME_MODAL_TYPE.AddExtraStep]: {
          actionModalHeader: 'Need an extra step?',
          actionModalContent: (
            <AddExtraStepModalContent
              onCancel={handleCloseActionModal}
              onConfirm={handleUseAddExtraPowerUp}
            />
          ),
          actionModalColor: step === 1 ? MODAL_TYPE.Orange : MODAL_TYPE.Green,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.AddBlocks]: {
          actionModalHeader: 'Let`s add some blocks?',
          actionModalContent: (
            <PowerUpModalContent
              onCancel={handleCloseActionModal}
              onConfirm={handleChangeBlocksValuePowerUpPressed}
              type={POWER_UP_TYPE.AddRandomBlocks}
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
              onConfirm={handleChangeBlocksValuePowerUpPressed}
              type={POWER_UP_TYPE.RemoveRandomBlocks}
            />
          ),
          actionModalColor: MODAL_TYPE.Green,
          withCrossIcon: true,
          onCrossIconPress: handleCloseActionModal,
        },
        [GAME_MODAL_TYPE.PowerUpWarning]: {
          actionModalHeader: 'No power-ups left!',
          actionModalContent: (
            <BasicModalContent
              confirmButtonText={'OK'}
              onConfirm={handleCloseActionModal}
              text={'Visit the MonkeyMarket to grab more and keep climbing'}
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
      step,
      handleUseAddExtraPowerUp,
      handleChangeBlocksValuePowerUpPressed,
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
    if (assetsReady) {
      assetLoaded(ASSET_KEYS.ASSETS)
    }
  }, [assetsReady, assetLoaded])

  useEffect(() => {
    if (!isOutOfAttempts && isLevelPrematurelyFinished) {
      setTimeout(async () => {
        setIsInterfacesVisible(false)
        await handleLevelFinished({ prize, stars: 3 })
      }, 500)
    }
  }, [handleLevelFinished, isLevelPrematurelyFinished, isOutOfAttempts, prize])

  useEffect(() => {
    if (!contentVisible) {
      return
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTimeout(() => {
      if (scrollViewRef?.current && focusedTower === TOWER.SecondTower) {
        const scrolledPosition =
          (initialBlockValue - userBlockValue) * BLOCK_DIMENSION
        scrollViewRef.current.scrollTo({
          x: 0,
          y: scrolledPosition,
          animated: true,
        })
      }
    }, 100)
  }, [
    scrollViewRef,
    initialBlockValue,
    userBlockValue,
    focusedTower,
    contentVisible,
  ])

  useEffect(() => {
    if (!contentVisible) {
      return
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    if (
      scrollViewRef?.current &&
      initialBlockValue &&
      focusedTower === TOWER.FirstTower
    ) {
      scrollViewRef.current.scrollToEnd()
    }
  }, [contentVisible, focusedTower, initialBlockValue])

  useEffect(() => {
    let timerId: number
    if (isStarsGifVisible) {
      timerId = setTimeout(() => setIsStarsGifVisible(false), 2000)
    }
    return () => clearTimeout(timerId)
  }, [isStarsGifVisible])
  return (
    <>
      <View style={styles.backgroundContainer}>
        <Image
          allowDownscaling
          cachePolicy="disk"
          contentFit="cover"
          key={String(level)}
          onError={() => assetLoaded(ASSET_KEYS.BG)}
          onLoadEnd={() => assetLoaded(ASSET_KEYS.BG)}
          placeholder={COLORS.backgroundBlue}
          priority="high"
          source={backgroundImage}
          style={StyleSheet.absoluteFill}
          transition={200}
        />
        <View
          pointerEvents={contentVisible ? 'auto' : 'none'}
          style={[StyleSheet.absoluteFill, { opacity: Number(contentVisible) }]}
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
            onAddExtraStepPress={handleAddExtraStepPress}
            onHomePress={handleHomeButtonPress}
            onRandomAddBlockPress={handleRandomAddBlockPress}
            onRandomRemoveBlockPress={handleRandomRemoveBlockPress}
            onResetPress={handleResetButtonPress}
          />

          {isInterfacesVisible && !isOutOfAttempts && (
            <View style={styles.progressBadgeContainer}>
              <MotiView
                animate={{ opacity: Number(isStarsGifVisible) }}
                style={{
                  position: 'absolute',
                  left: -50,
                  top: -30,
                  zIndex: 5,
                  flexDirection: 'row',
                }}
                transition={{ type: 'timing', duration: 100, delay: 200 }}
              >
                {isStarsGifVisible && (
                  <>
                    <Image
                      source={StarsGif}
                      style={{ width: 100, height: 100 }}
                    />
                    <View
                      style={{
                        borderWidth: 1,
                        width: step * 50,
                        height: 80,
                        alignSelf: 'flex-end',
                        marginLeft: -60,
                        marginBottom: -5,
                        borderRadius: 20,
                        borderColor: COLORS.yellow40,
                        backgroundColor: COLORS.yellow20,
                      }}
                    />
                  </>
                )}
              </MotiView>

              <StepBar
                animationKey={animationRestartKey}
                currentStep={step}
                totalSteps={attempts}
              />
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
                        transition={{
                          type: 'timing',
                          duration: 200,
                          delay: 300,
                        }}
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
                    type={TOWER.FirstTower}
                  />
                </View>
              )}
              {!!userBlockValue && (
                <View style={styles.userBlockTowerContainer}>
                  <View
                    style={[
                      styles.monkeyStageUserTowerContainer,
                      { bottom: userBlockValue * BLOCK_DIMENSION - 12 },
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
                    type={TOWER.SecondTower}
                  />
                </View>
              )}
            </View>

            <View style={styles.monkeyStageGroundContainer}>
              {monkeyAnimationData.type ===
                MONKEY_ANIMATION_TYPE.RunAndJump && (
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

            <Image
              onError={() => assetLoaded(ASSET_KEYS.GROUND)}
              onLoadEnd={() => assetLoaded(ASSET_KEYS.GROUND)}
              source={GroundImg}
              style={styles.bottomGround}
            />
          </ScrollView>
        </View>
      </View>

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
        initialResult={fortuneWheelModalData.start}
        isVisible={fortuneWheelModalData.isVisible}
        onFinish={fortuneWheelCallBack}
        sectors={fortuneWheelModalData.sectors}
        setIsVisible={setFortuneWheelModalData}
        type={fortuneWheelModalData.type}
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
      <MonkeyNotification
        current={userBlockValue}
        goal={initialBlockValue}
        onRequestClose={() => setIsMonkeyNotificationVisible(false)}
        visible={isMonkeyNotificationVisible}
      />
    </>
  )
}

export default GameScreen
