import { FC, useEffect, useRef, useState } from 'react'
import {
  Alert,
  ImageBackground,
  LayoutAnimation,
  ScrollView,
  View,
} from 'react-native'
import { Button, OptionModal } from '@components/ui'
import { BlockTowerCreator } from '@components/gameplay'
import { BUTTON_TYPE, Operator, OptionValue } from '@types'
import { generateRandomNumber } from '@utils'
import { generateRandomOperator } from '../../utils/generateRandomOperator'
import LottieView from 'lottie-react-native'
import WheelOfFortune, {
  WheelOfFortuneRef,
} from '@components/ui/WheelOfFortune/WheelOfFortune'

const INITIAL_OPTION_STATE = { number: 0, operator: null }

const GameScreen: FC = () => {
  const [step, setStep] = useState(0)
  const [initialBlockValue, setInitialBlockValue] = useState(0)
  const [userBlockValue, setUserBlockValue] = useState(0)
  const [focusedTower, setFocusedTower] = useState<'initial' | 'customer'>(
    'initial'
  )
  const [isBigImage, setIsBigImage] = useState(true)
  const [firstOptionCard, setFirstOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [secondOptionCard, setSecondOptionCard] =
    useState<OptionValue>(INITIAL_OPTION_STATE)
  const [chosenOption, setChosenOption] = useState<1 | 2 | null>(null)
  const [isModalOptionVisible, setIsModalOptionVisible] = useState(false)
  const [isScaledTower, setIsScaledTower] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  const isOperatorSimple = (operator: Operator): boolean =>
    operator === '+' || operator === '-'

  useEffect(() => {
    if (chosenOption) {
      const selectedCard =
        chosenOption === 1 ? firstOptionCard : secondOptionCard
      const { number, operator } = selectedCard

      if (operator === '+') {
        setUserBlockValue((prevState) => prevState + number)
      }
      if (operator === '-') {
        setUserBlockValue((prevState) =>
          prevState - number > 1 ? prevState - number : 1
        )
      }
      if (operator === '/') {
        setUserBlockValue((prevState) =>
          Math.round(prevState / number) > 1
            ? Math.round(prevState / number)
            : 1
        )
      }

      if (operator === '*') {
        setUserBlockValue((prevState) => prevState * number)
      }
      setStep((prevState) => prevState + 1)
      setChosenOption(null)
    }
  }, [chosenOption])

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTimeout(() => {
      if (scrollViewRef?.current && focusedTower === 'customer') {
        const scrolledPosition = (initialBlockValue - userBlockValue) * 70
        scrollViewRef.current.scrollTo({
          x: 0,
          y: scrolledPosition,
          animated: true,
        })
      }
    }, 100)
  }, [scrollViewRef, initialBlockValue, userBlockValue])

  useEffect(() => {
    if (step === 6) {
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
      setStep(0)
      setInitialBlockValue(0)
      setUserBlockValue(0)
      setChosenOption(null)
      setSecondOptionCard(INITIAL_OPTION_STATE)
      setFirstOptionCard(INITIAL_OPTION_STATE)
    }
  }, [step])
  const wheelRef = useRef<WheelOfFortuneRef>(null)
  const sectors = ['x8', 'x15', 'x10', 'x9', 'x12', 'x13', 'x11', 'x14']

  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/images/levels/1/background.png')}
      >
        <View
          style={{
            marginTop: 200,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 9,
          }}
        >
          <WheelOfFortune
            ref={wheelRef}
            sectors={sectors}
            winnerIndex={4}
            onFinish={(winner, index) => {
              console.log(`Winner is ${winner} at index ${index}`)
            }}
          />

          <Button
            title="Крутить колесо"
            onPress={() => wheelRef.current?.spin()}
          />
        </View>
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 50,
              paddingHorizontal: 20,
              paddingTop: 100,
              flex: 1,
              width: '100%',
            }}
          >
            {!!initialBlockValue && (
              <BlockTowerCreator
                quantity={initialBlockValue}
                type={'initial'}
                isInitializing={true}
                isScaled={isScaledTower}
              />
            )}

            {!!userBlockValue && (
              <BlockTowerCreator
                quantity={userBlockValue}
                type={'user'}
                isInitializing={
                  !firstOptionCard.operator && !firstOptionCard.operator
                }
                step={step}
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
            style={{ backgroundColor: 'black', width: '100%', height: 140 }}
            source={require('../../../assets/images/ground.png')}
          />
        </ScrollView>
      </ImageBackground>

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
        <Button
          title={'Scale'}
          onPress={() => setIsScaledTower(true)}
          style={{ alignSelf: 'center' }}
          type={BUTTON_TYPE.Error}
        />
        <Button
          title={'Attempt'}
          style={{ alignSelf: 'center' }}
          onPress={() => {
            if (step === 5) {
              setStep(6)
              return
            }
            const isUserNeedHelp = userBlockValue - initialBlockValue > 8
            const isTheLastBlock = userBlockValue === 1
            const isUserNeedStrongHelp =
              userBlockValue - initialBlockValue > initialBlockValue

            const firstOperator = isTheLastBlock
              ? generateRandomOperator(['-', '/'])
              : generateRandomOperator()
            let secondOperator = isUserNeedHelp
              ? '/'
              : generateRandomOperator([firstOperator])

            if (isTheLastBlock) {
              secondOperator = generateRandomOperator([firstOperator, '-', '/'])
            }
            let firstNumber = isOperatorSimple(firstOperator)
              ? generateRandomNumber(1, 5)
              : generateRandomNumber(2, 3)

            let secondNumber = isOperatorSimple(secondOperator)
              ? generateRandomNumber(1, 5)
              : generateRandomNumber(2, 3)

            if (isUserNeedHelp) {
              secondNumber = generateRandomNumber(2, 3)
            }
            if (isUserNeedStrongHelp) {
              secondNumber = 3
              // TODO: if use 4 for multiplicativeOperators
              // secondNumber = generateRandomNumber(3, 4)
            }
            if (firstOperator === '-' && firstNumber > userBlockValue) {
              firstNumber = userBlockValue - 1
            }
            if (secondOperator === '-' && secondNumber > userBlockValue) {
              secondNumber = userBlockValue - 1
            }

            setFirstOptionCard({
              number: firstNumber,
              operator: firstOperator,
            })
            setSecondOptionCard({
              number: secondNumber,
              operator: secondOperator,
            })
            setIsModalOptionVisible(true)
          }}
        />
        <Button
          title={'Build 1st tower'}
          style={{ maxWidth: 170 }}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            setInitialBlockValue(generateRandomNumber(8, 15))
          }}
        />
        <Button
          title={!!userBlockValue ? 'Reset' : 'Build 2nd tower'}
          style={{ maxWidth: 170 }}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            if (!!userBlockValue) {
              setFocusedTower('initial')
              setStep(0)
              setInitialBlockValue(0)
              setUserBlockValue(0)
              setChosenOption(null)
              setSecondOptionCard(INITIAL_OPTION_STATE)
              setFirstOptionCard(INITIAL_OPTION_STATE)
              setIsBigImage(true)
              return
            }
            setFocusedTower('customer')
            setUserBlockValue(generateRandomNumber(1, 3))
            setStep(1)
            setIsBigImage(false)
          }}
          type={BUTTON_TYPE.Warning}
        />
      </View>

      <OptionModal
        modalVisible={isModalOptionVisible}
        handleClose={() => setIsModalOptionVisible(false)}
        firstOption={firstOptionCard}
        secondOption={secondOptionCard}
        changeOption={(option) => {
          setChosenOption(option)
        }}
      />
    </>
  )
}

export default GameScreen
