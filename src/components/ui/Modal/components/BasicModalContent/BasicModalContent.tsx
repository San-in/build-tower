import { Button } from '@components/ui'
import { OutlinedText } from '@components/ui/OutlinedText'
import { BUTTON_TYPE } from '@types'
import { FC } from 'react'
import { View } from 'react-native'

import { styles } from './BasicModalContent.styles'
import { BasicModalContentProps } from './BasicModalContent.types'

const BasicModalContent: FC<BasicModalContentProps> = ({
  onConfirm,
  onCancel,
  text,
  confirmButtonText = 'YES',
  cancelButtonText = 'NO',
}) => (
  <View style={styles.container}>
    <OutlinedText fontSize={15}>{text}</OutlinedText>
    <View style={styles.buttonContainer}>
      {onCancel && (
        <Button
          onPress={onCancel}
          style={styles.button}
          textSize={15}
          title={cancelButtonText}
          type={BUTTON_TYPE.Error}
        />
      )}
      <Button
        onPress={onConfirm}
        style={[styles.button, !onCancel && styles.buttonRestricted]}
        textSize={15}
        title={confirmButtonText}
      />
    </View>
  </View>
)

export default BasicModalContent
