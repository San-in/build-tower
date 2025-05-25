import { Button, ModalCard } from '@components/ui'
import { CustomModal } from '@components/ui/Modal'
import { OutlinedText } from '@components/ui/OutlinedText'
import { UnlockOptionModalProps } from '@components/ui/UnlockOptionModal/UnlockOptionModal.types'
import { INITIAL_SPIN_QUANTITY } from '@constants'
import { bananasService } from '@services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  BONUS_OPTION_TYPE,
  BUTTON_TYPE,
  INFO_UNLOCK_OPTION_MODAL_KEY,
  MODAL_TYPE,
} from '@types'
import { MotiView } from 'moti'
import React, { FC, useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import { styles } from './UnlockOptionModal.styles'
import Element = React.JSX.Element

const UnlockOptionModal: FC<UnlockOptionModalProps> = ({
  visible = false,
  onClose,
  onConfirm,
  text = '',
  spinCounter,
  initialPrice,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<BONUS_OPTION_TYPE | null>(null)
  const bananas = useAppSelector((state) => state.bananas.bananas)

  const enabledBananasText = useMemo(
    () =>
      ({
        [3]: '- sounds like a fair deal!',
        [2]: '- still a pretty good price',
        [1]: '- not cheap... but worth it',
      })[spinCounter],
    [spinCounter]
  )

  const price = useMemo(() => {
    const remainAttempts = INITIAL_SPIN_QUANTITY - spinCounter
    return initialPrice * remainAttempts
  }, [initialPrice, spinCounter])

  const dispatch = useAppDispatch()

  const isSelectedOptionDisabled =
    selectedOption &&
    {
      [BONUS_OPTION_TYPE.Ad]: true,
      [BONUS_OPTION_TYPE.Bananas]: bananas < price,
    }[selectedOption]

  const infoMessageKey = useMemo(
    (): INFO_UNLOCK_OPTION_MODAL_KEY =>
      [
        !selectedOption && INFO_UNLOCK_OPTION_MODAL_KEY.Empty,
        selectedOption === BONUS_OPTION_TYPE.Ad &&
          (isSelectedOptionDisabled
            ? INFO_UNLOCK_OPTION_MODAL_KEY.DisabledAd
            : INFO_UNLOCK_OPTION_MODAL_KEY.EnabledAd),
        selectedOption === BONUS_OPTION_TYPE.Bananas &&
          (isSelectedOptionDisabled
            ? INFO_UNLOCK_OPTION_MODAL_KEY.DisabledBananas
            : INFO_UNLOCK_OPTION_MODAL_KEY.EnabledBananas),
      ].filter(Boolean)[0] as INFO_UNLOCK_OPTION_MODAL_KEY,
    [selectedOption, isSelectedOptionDisabled]
  )

  const infoMessage: Element = {
    [INFO_UNLOCK_OPTION_MODAL_KEY.Empty]: (
      <View style={styles.infoMessage}>
        <OutlinedText fontSize={13}>Choose at least one option</OutlinedText>
        <Text>😉</Text>
      </View>
    ),
    [INFO_UNLOCK_OPTION_MODAL_KEY.DisabledAd]: (
      <View style={styles.infoMessage}>
        <OutlinedText fontSize={13}>Ads are resting right now...</OutlinedText>
        <Text>🛌</Text>
      </View>
    ),
    [INFO_UNLOCK_OPTION_MODAL_KEY.DisabledBananas]: (
      <View style={styles.infoMessage}>
        <OutlinedText fontSize={13}>You need more bananas</OutlinedText>
        <Text>🙈🍌</Text>
      </View>
    ),
    [INFO_UNLOCK_OPTION_MODAL_KEY.EnabledAd]: (
      <View style={styles.infoMessage}>
        <OutlinedText fontSize={13}>Watch a short ad & go!</OutlinedText>
        <Text>🎬</Text>
      </View>
    ),
    [INFO_UNLOCK_OPTION_MODAL_KEY.EnabledBananas]: (
      <View style={styles.infoMessage}>
        <OutlinedText fontSize={13}>{`${price}`}</OutlinedText>
        <Text>🍌</Text>
        <OutlinedText fontSize={13}>
          {enabledBananasText || '- a good price'}
        </OutlinedText>
      </View>
    ),
  }[infoMessageKey]

  const isConfirmDisabled = !selectedOption || isSelectedOptionDisabled

  const handleCardPress = (option: BONUS_OPTION_TYPE) =>
    setSelectedOption((prev) => (prev === option ? null : option))
  const handleConfirmPress = async () => {
    if (selectedOption === BONUS_OPTION_TYPE.Bananas) {
      await bananasService.removeBananas(dispatch, price)
      onClose()
      setSelectedOption(null)
      onConfirm()
    }
  }

  return (
    <CustomModal
      handleClose={onClose}
      modalVisible={visible}
      type={MODAL_TYPE.Green}
    >
      {text && <OutlinedText>{text}</OutlinedText>}
      <View style={styles.optionsContainer}>
        {Object.values(BONUS_OPTION_TYPE).map((option) => {
          const isDisabled = option === BONUS_OPTION_TYPE.Ad || bananas < price
          return (
            <ModalCard
              isDisabled={isDisabled}
              isSelected={selectedOption === option}
              key={option}
              onPress={() => handleCardPress(option)}
              option={option}
              price={price}
            />
          )
        })}
      </View>
      <MotiView
        animate={{ opacity: 1, translateX: 0 }}
        from={{ opacity: 0, translateX: 10 }}
        key={infoMessageKey}
        style={styles.infoMessageContainer}
        transition={{ type: 'timing', duration: 300 }}
      >
        {infoMessage}
      </MotiView>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={onClose}
          style={styles.button}
          textSize={15}
          title={'CANCEL'}
          type={BUTTON_TYPE.Error}
        />
        <Button
          isDisabled={!!isConfirmDisabled}
          onPress={handleConfirmPress}
          style={styles.button}
          textSize={15}
          title={'CONFIRM'}
        />
      </View>
    </CustomModal>
  )
}
export default UnlockOptionModal
