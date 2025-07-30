import { Button, OutlinedText } from '@components/atoms'
import { BUTTON_TYPE } from '@types'
import { FC, memo, useMemo } from 'react'
import { Text, View } from 'react-native'

import { styles } from './AddExtraStepModalContent.styles'
import { AddExtraStepModalContentProps } from './AddExtraStepModalContent.types'

const AddExtraStepModalContent: FC<AddExtraStepModalContentProps> = ({
  onConfirm,
  onCancel,
  isAtTheFirstStep,
  isOutOfPowerUps,
}) => {
  const isSingleButton = isAtTheFirstStep || isOutOfPowerUps

  const textInfo = useMemo(
    () =>
      [
        isOutOfPowerUps &&
          'Visit the MonkeyMarket to grab more and keep climbing',
        isAtTheFirstStep && "Even magic can't go further back",
      ].filter(Boolean)[0] ||
      'Rewind time and try again from one step earlier!',

    [isOutOfPowerUps, isAtTheFirstStep]
  )

  return (
    <View style={styles.container}>
      <OutlinedText fontSize={15}>{textInfo}</OutlinedText>
      {!isSingleButton && <Text style={styles.icon}>⏳✨</Text>}
      {isOutOfPowerUps && <Text style={styles.icon}>🐒🛍️</Text>}
      {isAtTheFirstStep && !isOutOfPowerUps && (
        <Text style={styles.icon}>🙈</Text>
      )}
      <View style={styles.buttonContainer}>
        {onCancel && !isSingleButton && (
          <Button
            buttonContainerStyle={styles.buttonContent}
            onPress={onCancel}
            style={styles.button}
            textSize={15}
            title="CANCEL"
            type={BUTTON_TYPE.Error}
          />
        )}
        <Button
          buttonContainerStyle={styles.buttonContent}
          onPress={isSingleButton ? onCancel : onConfirm}
          style={[
            styles.button,
            (!onCancel || isSingleButton) && styles.buttonRestricted,
          ]}
          textSize={15}
          title="OK"
          type={BUTTON_TYPE.Info}
        />
      </View>
    </View>
  )
}

export default memo(AddExtraStepModalContent)
