import { Button, OutlinedText } from '@components/atoms'
import { BUTTON_TYPE } from '@types'
import { FC, memo, useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './AddExtraStepModalContent.styles'
import { AddExtraStepModalContentProps } from './AddExtraStepModalContent.types'

const AddExtraStepModalContent: FC<AddExtraStepModalContentProps> = ({
  onConfirm,
  onCancel,
  isAtTheFirstStep,
}) => {
  const textInfo = useMemo(
    () =>
      isAtTheFirstStep
        ? "Even magic can't go further back"
        : 'Rewind time and try again from one step earlier!',
    [isAtTheFirstStep]
  )

  return (
    <View style={styles.container}>
      <OutlinedText fontSize={15}>{textInfo}</OutlinedText>
      <View style={styles.buttonContainer}>
        {onCancel && !isAtTheFirstStep && (
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
          onPress={isAtTheFirstStep ? onCancel : onConfirm}
          style={[
            styles.button,
            (!onCancel || isAtTheFirstStep) && styles.buttonRestricted,
          ]}
          textSize={15}
          title="OK"
          type={isAtTheFirstStep ? BUTTON_TYPE.Success : BUTTON_TYPE.Info}
        />
      </View>
    </View>
  )
}

export default memo(AddExtraStepModalContent)
