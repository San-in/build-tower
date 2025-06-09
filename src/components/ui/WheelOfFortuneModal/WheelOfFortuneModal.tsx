import { Button, UnlockOptionModal } from '@components/ui'
import BlockIcon from '@components/ui/BlockIcon/BlockIcon'
import { OutlinedText } from '@components/ui/OutlinedText'
import WheelOfFortune from '@components/ui/WheelOfFortune/WheelOfFortune'
import { WheelOfFortuneRef } from '@components/ui/WheelOfFortune/WheelOfFortune.types'
import { styles } from '@components/ui/WheelOfFortuneModal/WheelOfFortuneModal.styles'
import { INITIAL_SPIN_QUANTITY } from '@constants'
import { COLORS, GlobalStyles } from '@theme'
import { BUTTON_TYPE } from '@types'
import { calculateWheelResult, generateRandomNumber } from '@utils'
import { MotiView } from 'moti'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ImageBackground, Modal, Pressable, View } from 'react-native'

import { WheelOfFortuneModalProps } from './WheelOfFortuneModal.types'

const WheelOfFortuneModal: FC<WheelOfFortuneModalProps> = ({
  isVisible,
  setIsVisible,
  onFinish,
  initialResult,
  sectors,
  additionalAttemptCost = 5,
}) => {
  const wheelRef = useRef<WheelOfFortuneRef>(null)
  const [spinCounter, setSpinCounter] = useState<number>(INITIAL_SPIN_QUANTITY)
  const [winnerIndex, setWinnerIndex] = useState<null | number>(null)
  const [isWheelModalResultVisible, setIsWheelModalResultVisible] =
    useState(false)
  const [tryAgainModalVisible, setTryAgainModalVisible] = useState(false)
  const [wheelWinnerSector, setWheelWinnerSector] = useState('')
  const [isFirstSpinFinished, setIsFirstSpinFinished] = useState(false)
  const [isSpinButtonDisabled, setIsSpinButtonDisabled] = useState(false)
  const [shouldReset, setShouldReset] = useState(true)
  const [shouldSpinWheel, setShouldSpinWheel] = useState(false)
  const isSpinCounterVisible = useMemo(
    () => spinCounter < INITIAL_SPIN_QUANTITY && spinCounter,
    [spinCounter]
  )

  useEffect(() => {
    setWinnerIndex((prevState) =>
      generateRandomNumber({
        min: 0,
        max: sectors.length - 1,
        exceptions: prevState !== null ? [prevState] : [],
      })
    )
  }, [sectors.length])

  useEffect(() => {
    if (shouldSpinWheel && winnerIndex !== null) {
      wheelRef.current?.spin()
    }
  }, [shouldSpinWheel, winnerIndex])

  const wheelResult = useMemo(
    () =>
      wheelWinnerSector && initialResult
        ? calculateWheelResult(initialResult, wheelWinnerSector)
        : 0,
    [wheelWinnerSector, initialResult]
  )

  const handleTryAgain = async () => {
    setWinnerIndex((prevState) =>
      generateRandomNumber({
        min: 0,
        max: sectors.length - 1,
        exceptions: prevState !== null ? [prevState] : [],
      })
    )
    setWheelWinnerSector('')
    setShouldSpinWheel(true)
  }
  const handleClose = () => {
    setIsVisible((prevState) => ({ ...prevState, isVisible: false }))
    setShouldReset(true)
  }

  const handleReset = useCallback(() => {
    setIsWheelModalResultVisible(false)
    setSpinCounter(INITIAL_SPIN_QUANTITY)
    setIsFirstSpinFinished(false)
    setWheelWinnerSector('')
    setIsSpinButtonDisabled(false)
    setShouldReset(false)
    setWinnerIndex((prevState) =>
      generateRandomNumber({
        min: 0,
        max: sectors.length - 1,
        exceptions: prevState !== null ? [prevState] : [],
      })
    )
  }, [sectors.length])

  const handleCloseTryAgainModal = () => {
    setTryAgainModalVisible(false)
  }
  const handleOpenTryAgainModal = () => {
    setTryAgainModalVisible(true)
  }
  const handleSpinPress = () => {
    setIsSpinButtonDisabled(true)
    setShouldSpinWheel(true)
  }
  const handleConfirmPress = () => {
    handleClose()
    onFinish(wheelResult)
  }
  const handleWheelFortuneFinish = (winner: string) => {
    setWheelWinnerSector(winner)
    setIsWheelModalResultVisible(true)
    setSpinCounter((prevState) => prevState && prevState - 1)
    setShouldSpinWheel(false)
  }
  const handleCloseWheelResult = () => {
    setIsWheelModalResultVisible(false)
    setIsFirstSpinFinished(true)
  }

  useEffect(() => {
    if (shouldReset) {
      setTimeout(handleReset, 1000)
    }
  }, [handleReset, shouldReset])

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      transparent={true}
      visible={isVisible}
    >
      <View
        style={[GlobalStyles.centeredContainer, styles.backgroundContainer]}
      >
        <MotiView
          animate={{ opacity: isWheelModalResultVisible ? 1 : 0 }}
          from={{ opacity: 0 }}
          style={styles.wheelResultContainer}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Pressable
            onPress={handleCloseWheelResult}
            style={styles.wheelResultPressableContainer}
          >
            <ImageBackground
              resizeMode={'cover'}
              source={require('../../../../assets/images/background.png')}
              style={styles.imageContainer}
            >
              <View style={styles.wheelResultContent}>
                <OutlinedText>Your result:</OutlinedText>
                <View style={styles.wheelResultText}>
                  <OutlinedText
                    color={COLORS.gradientGold_1}
                    fontSize={70}
                    strokeColor={COLORS.brown}
                  >{`${wheelResult}`}</OutlinedText>
                  <BlockIcon />
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        </MotiView>
        <MotiView
          animate={{ opacity: isWheelModalResultVisible ? 0 : 1 }}
          from={{ opacity: 0 }}
          style={styles.header}
          transition={{ type: 'timing', duration: 500 }}
        >
          <View style={styles.headerContentContainer}>
            <View style={styles.headerContent}>
              {initialResult && (
                <View style={styles.initialResultContainer}>
                  <OutlinedText fontSize={25}>You start from</OutlinedText>
                  <OutlinedText
                    color={COLORS.gradientGold_1}
                    fontSize={45}
                    strokeColor={COLORS.gradientBronze_1}
                  >{`${initialResult}`}</OutlinedText>
                </View>
              )}
              <BlockIcon />
            </View>
            <OutlinedText fontSize={25}>Spin for building tower</OutlinedText>
          </View>
          {winnerIndex !== null && (
            <WheelOfFortune
              onFinish={handleWheelFortuneFinish}
              ref={wheelRef}
              result={wheelResult}
              sectors={sectors}
              winnerIndex={winnerIndex}
            />
          )}

          <MotiView
            animate={{ opacity: isSpinCounterVisible ? 1 : 0 }}
            from={{ opacity: 0 }}
            style={styles.spinCounterContainer}
            transition={{ type: 'timing', duration: 500 }}
          >
            <OutlinedText fontSize={18}>Remaining spins: </OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={20}
              strokeColor={COLORS.brown}
            >{` ${spinCounter}`}</OutlinedText>
          </MotiView>

          <View style={styles.bottom}>
            {spinCounter < INITIAL_SPIN_QUANTITY && isFirstSpinFinished && (
              <View style={styles.buttonsContainer}>
                <Button
                  buttonContainerStyle={styles.buttonContent}
                  isDisabled={!spinCounter}
                  onPress={handleOpenTryAgainModal}
                  style={styles.button}
                  title="TRY AGAIN"
                  type={BUTTON_TYPE.Warning}
                />
                <Button
                  buttonContainerStyle={styles.buttonContent}
                  isDisabled={!wheelWinnerSector}
                  onPress={handleConfirmPress}
                  style={styles.button}
                  title="CONFIRM"
                />
              </View>
            )}
            {!isFirstSpinFinished && (
              <Button
                isDisabled={isSpinButtonDisabled}
                minWidth={'50%'}
                onPress={handleSpinPress}
                title="SPIN"
              />
            )}
          </View>
        </MotiView>
        <UnlockOptionModal
          initialPrice={additionalAttemptCost}
          onClose={handleCloseTryAgainModal}
          onConfirm={handleTryAgain}
          spinCounter={spinCounter}
          visible={tryAgainModalVisible}
        />
      </View>
    </Modal>
  )
}
export default WheelOfFortuneModal
