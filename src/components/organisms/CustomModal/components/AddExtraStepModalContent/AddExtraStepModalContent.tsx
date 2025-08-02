import { Button, OutlinedText } from '@components/atoms'
import { BUTTON_TYPE } from '@types'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './AddExtraStepModalContent.styles'
import { AddExtraStepModalContentProps } from './AddExtraStepModalContent.types'

const AddExtraStepModalContent: FC<AddExtraStepModalContentProps> = ({
  onConfirm,
  onCancel,
}) => (
  <View style={styles.container}>
    <OutlinedText fontSize={15}>
      Rewind time and try again from one step earlier!
    </OutlinedText>
    <View style={styles.buttonContainer}>
      {onCancel && (
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
        onPress={onConfirm}
        style={[styles.button, !onCancel && styles.buttonRestricted]}
        textSize={15}
        title="OK"
        type={BUTTON_TYPE.Info}
      />
    </View>
  </View>
)

export default memo(AddExtraStepModalContent)
