import { BananasIcon } from '@assets/icons'
import {
  Button,
  Header,
  OptionModal,
  WheelOfFortuneModal,
} from '@components/ui'
import { CustomModal } from '@components/ui/Modal'
import {
  BasicModalContent,
  LevelConditionsModalContent,
  PowerUpModalContent,
} from '@components/ui/Modal/components'
import { BLOCK_DIMENSION, LEVEL_CONFIG } from '@constants'
import { GameStackParamList } from '@navigation/GameStack/GameStack.types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { NavigationProp } from '@react-navigation/native'
import { useAppDispatch } from '@store/hooks'
import { COLORS } from '@theme'
import {
  BUTTON_TYPE,
  GAME_MODAL_TYPE,
  MODAL_TYPE,
  ModalState,
  MONKEY_ANIMATION_TYPE,
  OPERATOR,
  OptionValue,
  POWER_UP_TYPE,
  SCREENS,
  SELECTED_OPTION,
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
import { Easing } from 'react-native-reanimated'

import LevelResultModalContent from '../../components/ui/Modal/components/LevelResultModalContent/LevelResultModalContent'
import MonkeyAnimation from '../../components/ui/MonkeyAnimation/MonkeyAnimation'
import { BlockTowerCreator, BuildTowerSplash } from './components'

const INITIAL_OPTION_STATE = { number: 0, operator: null }
const INITIAL_MODAL_STATE: ModalState<GAME_MODAL_TYPE> = {
  isVisible: false,
  type: GAME_MODAL_TYPE.Home,
}
const INITIAL_BUILD_MODAL_STATE: ModalState<TOWER> = {
  isVisible: true,
  type: TOWER.First,
}
const INITIAL_INIT_BUILD_TOWER_MODAL_STATE: ModalState<TOWER> = {
  isVisible: false,
  type: TOWER.First,
}
const INITIAL_MONKEY_ANIMATION_MODAL_STATE: ModalState<MONKEY_ANIMATION_TYPE> =
  {
    isVisible: false,
    type: MONKEY_ANIMATION_TYPE.RunAndJump,
  }

const GameScreen: FC = () => {
  const {
    params: { level },
  } = useRoute<RouteProp<GameStackParamList, SCREENS.GameScreen>>()
  const navigation = useNavigation<NavigationProp<GameStackParamList>>()

  const {
    attempts,
    fistTower,
    secondTower,
    simpleOperators,
    multiplicativeOperators,
    prize,
  } = LEVEL_CONFIG[level]

  const [step, setStep] = useState(0)
  const [initialBlockValue, setInitialBlockValue] = useState(0)
  const [userBlockValue, setUserBlockValue] = useState(0)
  const [focusedTower, setFocusedTower] = useState<TOWER>(TOWER.First)
  const [firstOptionCard, setFirstOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [secondOptionCard, setSecondOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [chosenOption, setChosenOption] = useState<SELECTED_OPTION>(
    SELECTED_OPTION.None
  )
  const [isModalOptionVisible, setIsModalOptionVisible] = useState(false)

  const [isScaledTower, setIsScaledTower] = useState(false)
  const [isPrizeVisible, setIsPrizeVisible] = useState(false)
  const [isNextStepVisible, setIsNextStepVisible] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  // NEW
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
  const animationRestartKey = `${actionModalData.isVisible}${buildModalData.isVisible} 
  ${monkeyAnimationData.isVisible}`

  const isOutOfAttempts = useMemo(() => step > attempts, [attempts, step])

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
    setIsNextStepVisible(false)
    setTimeout(() => {
      setIsScaledTower(false)
      setInitialBlockValue(0)
      setUserBlockValue(0)
      setBuildModalData(INITIAL_BUILD_MODAL_STATE)
    }, 1500)
  }, [])

  const userBlockManipulation = () => {
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
    setMonkeyAnimationData((prevState) => ({ ...prevState, isVisible: false }))
  }

  // const dispatch = useAppDispatch()

  const monkeyAnimationConfig = {
    [MONKEY_ANIMATION_TYPE.RunAndJump]: {
      size: 400,
      loop: false,
      onFinishCalBack: () => {
        console.log('LANDING')
        setMonkeyAnimationData({
          isVisible: true,
          type: MONKEY_ANIMATION_TYPE.Landing,
        })
      },
      speed: 3,
    },
    [MONKEY_ANIMATION_TYPE.Landing]: {
      size: 100,
      loop: false,
      onFinishCalBack: () => {
        if (isOutOfAttempts) {
          handleOpenActionModal(GAME_MODAL_TYPE.LevelResult)
          return
        }
        setMonkeyAnimationData({
          isVisible: true,
          type: MONKEY_ANIMATION_TYPE.Idle,
        })
        setIsNextStepVisible(true)
      },
      speed: 4,
    },
    [MONKEY_ANIMATION_TYPE.Idle]: {
      size: 100,
      loop: true,
      onFinishCalBack: () => {},
      speed: 3,
    },
    [MONKEY_ANIMATION_TYPE.JumpToTop]: {
      size: 140,
      loop: false,
      onFinishCalBack: userBlockManipulation,
      speed: 4,
    },
  }[monkeyAnimationData.type]

  // const handleAddPowerUp = async (type: MARKET_PRODUCT) => {
  //   await marketService.increment(dispatch, type)
  // }

  const handleCLoseActionModal = useCallback(() => {
    setActionModalData((prevState) => ({ ...prevState, isVisible: false }))
  }, [])

  const handleOpenActionModal = (type: GAME_MODAL_TYPE) => {
    setActionModalData({ isVisible: true, type })
  }
  const handleGoHome = useCallback(async () => {
    navigation.navigate(SCREENS.WelcomeScreen)
    handleCLoseActionModal()
  }, [handleCLoseActionModal, navigation])

  const handleResetPressed = useCallback(() => {
    handleResetLevel()
    handleCLoseActionModal()
  }, [handleCLoseActionModal, handleResetLevel])

  const handleInitFirstTowerCallBack = useCallback((number: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setInitialBlockValue(number)
    setBuildModalData((prevState) => ({ ...prevState, isVisible: false }))
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      handleOpenActionModal(GAME_MODAL_TYPE.LevelConditions)
    }, 1500)
  }, [])

  const handleInitSecondTowerCallBack = (number: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFocusedTower(TOWER.Second)
    setUserBlockValue(number)
    setStep(1)
    setBuildModalData((prevState) => ({ ...prevState, isVisible: false }))
  }

  const handleRandomAddBlockPress = () =>
    userBlockValue
      ? handleOpenActionModal(GAME_MODAL_TYPE.AddBlocks)
      : handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)

  const handleRandomRemoveBlockPress = () =>
    userBlockValue
      ? handleOpenActionModal(GAME_MODAL_TYPE.RemoveBlocks)
      : handleOpenActionModal(GAME_MODAL_TYPE.PowerUpWarning)

  const actionModalConfig = useMemo(
    () =>
      ({
        [GAME_MODAL_TYPE.Home]: {
          actionModalHeader: 'Wanna go home?',
          actionModalContent: (
            <BasicModalContent
              onCancel={handleCLoseActionModal}
              onConfirm={handleGoHome}
              text={
                'Hold on! If you leave now, your progress will poof — disappear!'
              }
            />
          ),
          actionModalColor: MODAL_TYPE.Orange,
          withCrossIcon: true,
          onCrossIconPress: handleCLoseActionModal,
        },
        [GAME_MODAL_TYPE.Reset]: {
          actionModalHeader: 'Start over? Really?',
          actionModalContent: (
            <BasicModalContent
              onCancel={handleCLoseActionModal}
              onConfirm={handleResetPressed}
              text={'If you restart now, all your progress will go bye-bye!'}
            />
          ),
          actionModalColor: MODAL_TYPE.Orange,
          withCrossIcon: true,
          onCrossIconPress: handleCLoseActionModal,
        },
        [GAME_MODAL_TYPE.AddBlocks]: {
          actionModalHeader: 'Let`s add some blocks?',
          actionModalContent: (
            <PowerUpModalContent
              onCancel={handleCLoseActionModal}
              onConfirm={() => {}}
              type={POWER_UP_TYPE.Plus}
            />
          ),
          actionModalColor: MODAL_TYPE.Green,
          withCrossIcon: true,
          onCrossIconPress: handleCLoseActionModal,
        },
        [GAME_MODAL_TYPE.RemoveBlocks]: {
          actionModalHeader: 'Let`s remove some blocks?',
          actionModalContent: (
            <PowerUpModalContent
              onCancel={handleCLoseActionModal}
              onConfirm={() => {}}
              type={POWER_UP_TYPE.Minus}
            />
          ),
          actionModalColor: MODAL_TYPE.Green,
          withCrossIcon: true,
          onCrossIconPress: handleCLoseActionModal,
        },
        [GAME_MODAL_TYPE.PowerUpWarning]: {
          actionModalHeader: 'Build both towers first',
          actionModalContent: (
            <BasicModalContent
              confirmButtonText={'OK'}
              onConfirm={handleCLoseActionModal}
              text={
                'You’ll unlock this power-up once both towers are completed.'
              }
            />
          ),
          actionModalColor: MODAL_TYPE.Orange,
          withCrossIcon: true,
          onCrossIconPress: handleCLoseActionModal,
        },
        [GAME_MODAL_TYPE.LevelConditions]: {
          actionModalContent: (
            <LevelConditionsModalContent
              initialBlocksQuantity={initialBlockValue}
              onConfirm={() => {
                setIsPrizeVisible(true)
                setIsScaledTower(true)
                handleCLoseActionModal()
                setTimeout(() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  )
                  setBuildModalData({ isVisible: true, type: TOWER.Second })
                }, 1500)
              }}
              prize={prize}
            />
          ),
          actionModalColor: MODAL_TYPE.Purple,
          withCrossIcon: false,
          onCrossIconPress: handleCLoseActionModal,
          actionModalStyles: {
            alignSelf: 'flex-end',
            maxWidth: '76%',
            minWidth: 275,
            transform: [{ translateY: '15%' }],
          },
        },
        [GAME_MODAL_TYPE.LevelResult]: {
          actionModalContent: (
            <LevelResultModalContent
              initialBlockValue={initialBlockValue}
              onConfirm={() => {}}
              onContinueLevel={() => {}}
              onGoHome={handleGoHome}
              onMultipleResult={() => {}}
              onResetLevel={handleResetPressed}
              prize={prize}
              userBlockValue={userBlockValue}
            />
          ),
          actionModalColor: MODAL_TYPE.Blue,
          withCrossIcon: false,
          onCrossIconPress: handleGoHome,
        },
      })[actionModalData.type],
    [
      handleCLoseActionModal,
      handleGoHome,
      handleResetPressed,
      initialBlockValue,
      prize,
      userBlockValue,
      actionModalData.type,
    ]
  )

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

  const {
    actionModalHeader,
    actionModalContent,
    actionModalColor,
    actionModalStyles = {},
    withCrossIcon,
    onCrossIconPress,
  } = actionModalConfig

  const { initTowerStart, initTowerSectors, initTowerCallBack } =
    initTowerModalConfig
  // NEW END

  const handleNextStepPress = () => {
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
      secondNumber = generateRandomNumber({ min: 2, max: 3 })
    }
    if (isUserNeedStrongHelp) {
      secondNumber = multiplicativeOperators.end
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
  }

  useEffect(() => {
    if (chosenOption !== SELECTED_OPTION.None) {
    }
  }, [chosenOption, firstOptionCard, secondOptionCard])

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

  // useEffect(() => {
  //   if (isFinishRoundModalVisible) {
  //     let message = 'You need higher tower'
  //     if (initialBlockValue < userBlockValue) {
  //       message = 'You lose!'
  //     }
  //     if (initialBlockValue === userBlockValue) {
  //       message = 'Perfect'
  //     }
  //     if (initialBlockValue - userBlockValue === 1) {
  //       message = 'Almost perfect'
  //     }
  //     if (initialBlockValue - userBlockValue === 2) {
  //       message = 'Satisfy'
  //     }
  //     Alert.alert(message)
  //     setIsFinishRoundModalVisible(false)
  //
  //     handleResetLevel()
  //   }
  // }, [
  //   handleResetLevel,
  //   initialBlockValue,
  //   isFinishRoundModalVisible,
  //   userBlockValue,
  // ])

  return (
    <>
      <ImageBackground source={getLevelBackground(level)} style={{ flex: 1 }}>
        <Header
          level={level}
          onHomePress={() => handleOpenActionModal(GAME_MODAL_TYPE.Home)}
          onRandomAddBlockPress={handleRandomAddBlockPress}
          onRandomRemoveBlockPress={handleRandomRemoveBlockPress}
          onResetPress={() => handleOpenActionModal(GAME_MODAL_TYPE.Reset)}
        />
        <ScrollView
          alwaysBounceVertical={false}
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'flex-end',
            position: 'relative',
          }}
          ref={scrollViewRef}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 50,
              paddingHorizontal: 20,
              paddingTop: 80,
              flex: 1,
              width: '100%',
              position: 'relative',
            }}
          >
            {!!initialBlockValue && (
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: -2,
                }}
              >
                <MotiView
                  animate={{
                    translateX: isPrizeVisible ? 0 : -200,
                  }}
                >
                  <MotiView
                    animate={{ scale: isPrizeVisible ? 1.2 : 1 }}
                    from={{ scale: 1 }}
                    key={animationRestartKey}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}
                    transition={{
                      loop: isPrizeVisible,
                      type: 'timing',
                      duration: 2000,
                      easing: Easing.inOut(Easing.ease),
                      delay: 1000,
                    }}
                  >
                    <BananasIcon height={50} width={50} />
                  </MotiView>
                </MotiView>
                <BlockTowerCreator
                  isScaled={isScaledTower}
                  quantity={initialBlockValue}
                  type={TOWER.First}
                />
              </View>
            )}
            {!!userBlockValue && (
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 2,
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    bottom: userBlockValue * BLOCK_DIMENSION - 12,
                    zIndex: 10,
                    right: -15,
                  }}
                >
                  {[
                    MONKEY_ANIMATION_TYPE.Idle,
                    MONKEY_ANIMATION_TYPE.Landing,
                    MONKEY_ANIMATION_TYPE.JumpToTop,
                  ].includes(monkeyAnimationData.type) && (
                    <MonkeyAnimation
                      isVisible={monkeyAnimationData.isVisible}
                      loop={monkeyAnimationConfig.loop}
                      onFinish={monkeyAnimationConfig.onFinishCalBack}
                      size={monkeyAnimationConfig.size}
                      speed={monkeyAnimationConfig.speed}
                      type={monkeyAnimationData.type}
                    />
                  )}
                </View>
                <BlockTowerCreator
                  onAnimatedEnd={() => {
                    if (
                      step === 1 &&
                      !monkeyAnimationData.isVisible &&
                      monkeyAnimationData.type ===
                        MONKEY_ANIMATION_TYPE.RunAndJump
                    ) {
                      console.log('RUN_AND_JUMP')
                      setMonkeyAnimationData({
                        isVisible: true,
                        type: MONKEY_ANIMATION_TYPE.RunAndJump,
                      })
                      return
                    }
                    if (
                      !monkeyAnimationData.isVisible &&
                      monkeyAnimationData.type ===
                        MONKEY_ANIMATION_TYPE.JumpToTop
                    ) {
                      setTimeout(() => {
                        console.log('LANDING_2')
                        setMonkeyAnimationData({
                          isVisible: true,
                          type: MONKEY_ANIMATION_TYPE.Landing,
                        })
                      }, 150 * userBlockValue)
                    }
                  }}
                  quantity={userBlockValue}
                  type={TOWER.Second}
                />
              </View>
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: -30,
              right: -180,
              zIndex: 10,
            }}
          >
            {monkeyAnimationData.type === MONKEY_ANIMATION_TYPE.RunAndJump && (
              <MonkeyAnimation
                isVisible={monkeyAnimationData.isVisible}
                loop={monkeyAnimationConfig.loop}
                onFinish={monkeyAnimationConfig.onFinishCalBack}
                size={monkeyAnimationConfig.size}
                speed={monkeyAnimationConfig.speed}
                type={monkeyAnimationData.type}
              />
            )}
          </View>
          <ImageBackground
            source={require('../../../assets/images/ground.png')}
            style={{
              backgroundColor: COLORS.codeGrey,
              width: '100%',
              height: 100,
            }}
          />
        </ScrollView>
      </ImageBackground>
      {buildModalData.isVisible && (
        <BuildTowerSplash
          onPress={() => {
            setInitBuildTowerModalData({
              isVisible: true,
              type: buildModalData.type,
            })
          }}
          tower={buildModalData.type}
        />
      )}

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          top: '25%',
          right: 30,
          justifyContent: 'space-between',
        }}
      >
        <MotiView
          animate={{ opacity: isNextStepVisible ? 1 : 0 }}
          from={{ opacity: 0 }}
          style={{ marginTop: 'auto' }}
          transition={{ type: 'timing', duration: 200, delay: 300 }}
        >
          <Button
            buttonContainerStyle={{ paddingHorizontal: 14 }}
            isDisabled={isOutOfAttempts}
            onPress={handleNextStepPress}
            textSize={16}
            title={'NEXT STEP  →'}
            type={BUTTON_TYPE.Warning}
          />
        </MotiView>
      </View>

      <WheelOfFortuneModal
        initialResult={initTowerStart}
        isVisible={initBuildTowerModalData.isVisible}
        onFinish={initTowerCallBack}
        sectors={initTowerSectors}
        setIsVisible={setInitBuildTowerModalData}
      />
      <OptionModal
        changeOption={(newOption) => {
          if (!isOutOfAttempts) {
            console.log('JUMP_TO_TOP')
            setMonkeyAnimationData({
              isVisible: true,
              type: MONKEY_ANIMATION_TYPE.JumpToTop,
            })
          }
          setChosenOption(newOption)
        }}
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
    </>
  )
}

export default GameScreen
