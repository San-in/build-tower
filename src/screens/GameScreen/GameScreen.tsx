import { BananasIcon } from '@assets/icons'
import { Header, OptionModal, WheelOfFortuneModal } from '@components/ui'
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
import {
  GAME_MODAL_TYPE,
  MARKET_PRODUCT,
  MODAL_TYPE,
  ModalState,
  OPERATOR,
  OptionValue,
  POWER_UP_TYPE,
  SCREENS,
  TOWER,
} from '@types'
import { getLevelBackground } from '@utils'
import { MotiView } from 'moti'
// import LottieView from 'lottie-react-native'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Alert,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  View,
} from 'react-native'
import { Easing } from 'react-native-reanimated'

import { marketService } from '../../services/marketService'
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

const GameScreen: FC = () => {
  const {
    params: { level },
  } = useRoute<RouteProp<GameStackParamList, SCREENS.GameScreen>>()
  const navigation = useNavigation<NavigationProp<GameStackParamList>>()

  const {
    attempts,
    difficulty,
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
  const [chosenOption, setChosenOption] = useState<1 | 2 | null>(null)
  const [isModalOptionVisible, setIsModalOptionVisible] = useState(false)

  const [isFinishRoundModalVisible, setIsFinishRoundModalVisible] =
    useState(false)
  const [isScaledTower, setIsScaledTower] = useState(false)
  const [isPrizeVisible, setIsPrizeVisible] = useState(false)
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
  const animationRestartKey = `${actionModalData.isVisible}`

  const handleResetLevel = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setFocusedTower(TOWER.First)
    setStep(0)
    setInitialBlockValue(0)
    setUserBlockValue(0)
    setChosenOption(null)
    setSecondOptionCard(INITIAL_OPTION_STATE)
    setFirstOptionCard(INITIAL_OPTION_STATE)
    setBuildModalData(INITIAL_BUILD_MODAL_STATE)
    setIsScaledTower(false)
    setIsPrizeVisible(false)
  }, [])

  const dispatch = useAppDispatch()

  const handleAddPowerUp = async (type: MARKET_PRODUCT) => {
    await marketService.increment(dispatch, type)
  }

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
      handleOpenActionModal(GAME_MODAL_TYPE.LevelConditions)
    }, 1500)
  }, [])

  const handleInitSecondTowerCallBack = (number: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
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
        },
        [GAME_MODAL_TYPE.LevelConditions]: {
          actionModalContent: (
            <LevelConditionsModalContent
              initialBlocksQuantity={initialBlockValue}
              onConfirm={() => {
                setIsPrizeVisible(true)
                setIsScaledTower(true)
                handleCLoseActionModal()
              }}
              prize={prize}
            />
          ),
          actionModalColor: MODAL_TYPE.Purple,
          withCrossIcon: false,
          actionModalStyles: {
            alignSelf: 'flex-end',
            maxWidth: '76%',
            minWidth: 275,
            transform: [{ translateY: '15%' }],
          },
        },
      })[actionModalData.type],
    [
      handleCLoseActionModal,
      handleGoHome,
      handleResetPressed,
      initialBlockValue,
      prize,
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
  } = actionModalConfig

  const { initTowerStart, initTowerSectors, initTowerCallBack } =
    initTowerModalConfig
  // NEW END

  useEffect(() => {
    if (chosenOption) {
      const selectedCard =
        chosenOption === 1 ? firstOptionCard : secondOptionCard
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
          Math.round(prevState / number) > 1
            ? Math.round(prevState / number)
            : 1
        )
      }

      if (operator === OPERATOR.Multiply) {
        setUserBlockValue((prevState) => prevState * number)
      }
      setStep((prevState) => prevState + 1)
      setChosenOption(null)
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

  useEffect(() => {
    if (isFinishRoundModalVisible) {
      let message = 'You need higher tower'
      if (initialBlockValue < userBlockValue) {
        message = 'You lose!'
      }
      if (initialBlockValue === userBlockValue) {
        message = 'Perfect'
      }
      if (initialBlockValue - userBlockValue === 1) {
        message = 'Almost perfect'
      }
      if (initialBlockValue - userBlockValue === 2) {
        message = 'Satisfy'
      }
      Alert.alert(message)
      setIsFinishRoundModalVisible(false)
      setStep(0)
      setInitialBlockValue(0)
      setUserBlockValue(0)
      setChosenOption(null)
      setSecondOptionCard(INITIAL_OPTION_STATE)
      setFirstOptionCard(INITIAL_OPTION_STATE)
    }
  }, [initialBlockValue, isFinishRoundModalVisible, userBlockValue])

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
          }}
          ref={scrollViewRef}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 50,
              paddingHorizontal: 20,
              paddingTop: 60,
              flex: 1,
              width: '100%',
            }}
          >
            {!!initialBlockValue && (
              <View style={{ justifyContent: 'flex-end', marginBottom: -2 }}>
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
              <BlockTowerCreator
                quantity={userBlockValue}
                type={TOWER.Second}
              />
            )}
            {/*<LottieView*/}
            {/*  source={require('../../../assets/icons/animations/run-2.json')}*/}
            {/*  autoPlay*/}
            {/*  loop={true}*/}
            {/*  speed={4}*/}
            {/*  style={{*/}
            {/*    width: 150,*/}
            {/*    height: 150,*/}
            {/*    transform: [{ scaleX: -1 }],*/}
            {/*    position: 'absolute',*/}
            {/*    bottom: 27,*/}
            {/*    right: 0,*/}
            {/*    shadowColor: '#000',*/}
            {/*    shadowOffset: { width: 10, height: 5 },*/}
            {/*  }}*/}
            {/*/>*/}
          </View>

          <ImageBackground
            source={require('../../../assets/images/ground.png')}
            style={{ backgroundColor: 'black', width: '100%', height: 80 }}
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
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'absolute',
          bottom: 30,
        }}
      >
        {/*<Button*/}
        {/*  onPress={() => {*/}
        {/*    if (step === 5) {*/}
        {/*      setIsFinishRoundModalVisible(true)*/}
        {/*      return*/}
        {/*    }*/}
        {/*    const isUserNeedHelp = userBlockValue - initialBlockValue > 8*/}
        {/*    const isTheLastBlock = userBlockValue === 1*/}
        {/*    const isUserNeedStrongHelp =*/}
        {/*      userBlockValue - initialBlockValue > initialBlockValue*/}

        {/*    const firstOperator = isTheLastBlock*/}
        {/*      ? generateRandomOperator([OPERATOR.Minus, OPERATOR.Division])*/}
        {/*      : generateRandomOperator()*/}
        {/*    let secondOperator = isUserNeedHelp*/}
        {/*      ? OPERATOR.Division*/}
        {/*      : generateRandomOperator([firstOperator])*/}

        {/*    if (isTheLastBlock) {*/}
        {/*      secondOperator = generateRandomOperator([*/}
        {/*        firstOperator,*/}
        {/*        OPERATOR.Minus,*/}
        {/*        OPERATOR.Division,*/}
        {/*      ])*/}
        {/*    }*/}
        {/*    let firstNumber = OperatorType.isSimple(firstOperator)*/}
        {/*      ? generateRandomNumber(1, 5)*/}
        {/*      : generateRandomNumber(2, 3)*/}

        {/*    let secondNumber = OperatorType.isSimple(secondOperator)*/}
        {/*      ? generateRandomNumber(1, 5)*/}
        {/*      : generateRandomNumber(2, 3)*/}

        {/*    if (isUserNeedHelp) {*/}
        {/*      secondNumber = generateRandomNumber(2, 3)*/}
        {/*    }*/}
        {/*    if (isUserNeedStrongHelp) {*/}
        {/*      secondNumber = 3*/}
        {/*      // TODO: if use 4 for multiplicativeOperators*/}
        {/*      // secondNumber = generateRandomNumber(3, 4)*/}
        {/*    }*/}
        {/*    if (*/}
        {/*      firstOperator === OPERATOR.Minus &&*/}
        {/*      firstNumber > userBlockValue*/}
        {/*    ) {*/}
        {/*      firstNumber = userBlockValue - 1*/}
        {/*    }*/}
        {/*    if (*/}
        {/*      secondOperator === OPERATOR.Minus &&*/}
        {/*      secondNumber > userBlockValue*/}
        {/*    ) {*/}
        {/*      secondNumber = userBlockValue - 1*/}
        {/*    }*/}

        {/*    setFirstOptionCard({*/}
        {/*      number: firstNumber,*/}
        {/*      operator: firstOperator,*/}
        {/*    })*/}
        {/*    setSecondOptionCard({*/}
        {/*      number: secondNumber,*/}
        {/*      operator: secondOperator,*/}
        {/*    })*/}
        {/*    setIsModalOptionVisible(true)*/}
        {/*  }}*/}
        {/*  style={{ alignSelf: 'center' }}*/}
        {/*  title={'Attempt'}*/}
        {/*/>*/}

        {/*<Button*/}
        {/*  onPress={() => {*/}
        {/*    setFocusedTower(TOWER.Second)*/}
        {/*    setUserBlockValue(generateRandomNumber(1, 3))*/}
        {/*    setStep(1)*/}
        {/*  }}*/}
        {/*  style={{ maxWidth: 170 }}*/}
        {/*  title={'Build 2nd tower'}*/}
        {/*  type={BUTTON_TYPE.Warning}*/}
        {/*/>*/}
      </View>
      <WheelOfFortuneModal
        initialResult={initTowerStart}
        isVisible={initBuildTowerModalData.isVisible}
        onFinish={initTowerCallBack}
        sectors={initTowerSectors}
        setIsVisible={setInitBuildTowerModalData}
      />
      <OptionModal
        changeOption={(option) => {
          setChosenOption(option)
        }}
        firstOption={firstOptionCard}
        handleClose={() => setIsModalOptionVisible(false)}
        modalVisible={isModalOptionVisible}
        secondOption={secondOptionCard}
      />
      <CustomModal
        containerStyles={actionModalStyles}
        handleClose={handleCLoseActionModal}
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
