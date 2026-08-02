import { BlockIcon, Button, OutlinedText } from '@components/atoms'
import { SuccessActionInfoModal } from '@components/organisms/SuccessActionInfoModal'
import { WheelOfFortune } from '@components/organisms/WheelOfFortune'
import { WheelOfFortuneRef } from '@components/organisms/WheelOfFortune/WheelOfFortune.types'
import { INITIAL_SPIN_QUANTITY } from '@constants'
import { COLORS, GlobalStyles } from '@theme'
import { BUTTON_TYPE, OPERATOR, POWER_UP_TYPE, TOWER } from '@types'
import {
  calculateWheelResult,
  formatTabletElementsSize,
  generateRandomNumber,
 Haptics } from '@utils'
import { MotiView } from 'moti'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, View } from 'react-native'

import { UnlockOptionModal } from '../UnlockOptionModal'
import { styles } from './WheelOfFortuneModal.styles'
import { WheelOfFortuneModalProps } from './WheelOfFortuneModal.types'

const WheelOfFortuneModal: FC<WheelOfFortuneModalProps> = ({
  isVisible,
  setIsVisible,
  onFinish,
  initialResult,
  sectors,
  additionalAttemptCost = 5,
  type,
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
  const isTowerManipulationType = useMemo(
    () => type === TOWER.FirstTower || type === TOWER.SecondTower,
    [type]
  )

  const [isModalShacked, setIsModalShacked] = useState(false)

  const initialPrice = useMemo(
    () =>
      isTowerManipulationType
        ? additionalAttemptCost
        : additionalAttemptCost * 2,
    [additionalAttemptCost, isTowerManipulationType]
  )

  const wheelResult = useMemo(
    () =>
      wheelWinnerSector && initialResult
        ? calculateWheelResult({
            value: initialResult,
            operation: wheelWinnerSector,
            defaultOperation: !isTowerManipulationType && OPERATOR.Multiply,
          })
        : 0,
    [wheelWinnerSector, initialResult, isTowerManipulationType]
  )

  const handleClose = () => {
    setIsVisible((prevState) => ({ ...prevState, isVisible: false }))
    setShouldReset(true)
    setIsModalShacked(false)
  }

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
    handleCloseTryAgainModal()
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setIsModalShacked(true)
    setIsSpinButtonDisabled(true)
    setShouldSpinWheel(true)
  }
  const handleConfirmPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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

  const renderTitle = useCallback(
    () =>
      isTowerManipulationType ? (
        <>
          <View style={styles.headerContent}>
            <View style={styles.initialResultContainer}>
              <OutlinedText fontSize={formatTabletElementsSize(20)}>
                You start from
              </OutlinedText>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={formatTabletElementsSize(30)}
                strokeColor={COLORS.gradientBronze_1}
              >{`${initialResult}`}</OutlinedText>
            </View>
            <BlockIcon />
          </View>
          <OutlinedText fontSize={formatTabletElementsSize(20)}>
            Spin for building tower
          </OutlinedText>
        </>
      ) : (
        <>
          <View style={styles.headerContent}>
            <OutlinedText fontSize={formatTabletElementsSize(20, 1.8)}>
              Spin the wheel to find how many blocks to
            </OutlinedText>
          </View>

          <View style={styles.headerPowerUpContainer}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={formatTabletElementsSize(30, 2)}
              strokeColor={COLORS.gradientBronze_1}
            >{`${type === POWER_UP_TYPE.RemoveRandomBlocks ? 'REMOVE' : 'ADD'}`}</OutlinedText>
            <BlockIcon />
          </View>
          {type === POWER_UP_TYPE.RemoveRandomBlocks && (
            <OutlinedText fontSize={formatTabletElementsSize(14, 1.8)}>
              (at least 1 block will remain)
            </OutlinedText>
          )}
        </>
      ),

    [initialResult, isTowerManipulationType, type]
  )

  useEffect(() => {
    if (shouldReset) {
      setTimeout(handleReset, 1000)
    }
  }, [handleReset, shouldReset])

  useEffect(() => {
    if (shouldSpinWheel && winnerIndex !== null) {
      wheelRef.current?.spin()
    }
  }, [shouldSpinWheel, winnerIndex])

  useEffect(() => {
    setWinnerIndex((prevState) =>
      generateRandomNumber({
        min: 0,
        max: sectors.length - 1,
        exceptions: prevState !== null ? [prevState] : [],
      })
    )
  }, [sectors.length])

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      transparent={true}
      visible={isVisible}
    >
      <MotiView
        animate={{
          backgroundColor: [
            COLORS.codeGrey80,
            COLORS.codeGrey90,
            COLORS.codeGrey90,
            COLORS.codeGrey,
            COLORS.codeGrey,
          ],
        }}
        from={{ backgroundColor: COLORS.codeGrey }}
        style={[GlobalStyles.centeredContainer, styles.backgroundContainer]}
        transition={{
          type: 'timing',
          duration: 1500,
          loop: true,
        }}
      >
        <SuccessActionInfoModal
          isVisible={isWheelModalResultVisible}
          onPress={handleCloseWheelResult}
        >
          <OutlinedText fontSize={formatTabletElementsSize(32)}>
            Your result:
          </OutlinedText>
          <View style={styles.wheelResultText}>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={formatTabletElementsSize(60)}
              strokeColor={COLORS.brown}
            >{`${wheelResult}`}</OutlinedText>
            <BlockIcon size={formatTabletElementsSize(50)} />
          </View>
        </SuccessActionInfoModal>
        <MotiView
          animate={{ opacity: isWheelModalResultVisible ? 0 : 1 }}
          from={{ opacity: 0 }}
          style={styles.header}
          transition={{ type: 'timing', duration: 500 }}
        >
          <View style={styles.headerContentContainer}>{renderTitle()}</View>
          <MotiView
            animate={{
              scale: !isModalShacked ? [1, 1.02, 0.98, 1.02, 1] : 1,
            }}
            from={{ scale: 1 }}
            transition={{
              scale: { type: 'timing', duration: 150 },
            }}
          >
            {winnerIndex !== null && (
              <WheelOfFortune
                onFinish={handleWheelFortuneFinish}
                ref={wheelRef}
                result={wheelResult}
                sectors={sectors}
                {...(!isTowerManipulationType && {
                  textStyle: styles.increasedSectorValues,
                })}
                winnerIndex={winnerIndex}
              />
            )}
          </MotiView>
          <MotiView
            animate={{ opacity: isSpinCounterVisible ? 1 : 0 }}
            from={{ opacity: 0 }}
            style={styles.spinCounterContainer}
            transition={{ type: 'timing', duration: 500 }}
          >
            <OutlinedText fontSize={formatTabletElementsSize(18)}>
              Remaining spins:
            </OutlinedText>
            <OutlinedText
              color={COLORS.gradientGold_1}
              fontSize={formatTabletElementsSize(20)}
              strokeColor={COLORS.brown}
            >{` ${spinCounter}`}</OutlinedText>
          </MotiView>

          <View style={styles.bottom}>
            {spinCounter < INITIAL_SPIN_QUANTITY && isFirstSpinFinished && (
              <View style={styles.buttonsContainer}>
                <Button
                  buttonContainerStyle={styles.buttonContent}
                  isDisabled={!spinCounter || !wheelWinnerSector}
                  onPress={handleOpenTryAgainModal}
                  style={styles.button}
                  textSize={formatTabletElementsSize(12, 3)}
                  title="TRY AGAIN"
                  type={BUTTON_TYPE.Info}
                />
                <Button
                  buttonContainerStyle={styles.buttonContent}
                  isDisabled={!wheelWinnerSector}
                  onPress={handleConfirmPress}
                  style={styles.button}
                  textSize={formatTabletElementsSize(12, 3)}
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
          attempt={spinCounter}
          initialPrice={initialPrice}
          onClose={handleCloseTryAgainModal}
          onConfirm={handleTryAgain}
          visible={tryAgainModalVisible}
        />
      </MotiView>
    </Modal>
  )
}
export default WheelOfFortuneModal
