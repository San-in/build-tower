import { Button, OutlinedText } from '@components/atoms'
import { BUTTON_TYPE } from '@types'
import { formatTabletElementsSize, Haptics } from '@utils'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './BasicModalContent.styles'
import { BasicModalContentProps } from './BasicModalContent.types'

const BasicModalContent: FC<BasicModalContentProps> = ({
  onConfirm,
  onCancel,
  text,
  confirmButtonText = 'YES',
  cancelButtonText = 'NO',
  confirmWithSound = true,
}) => {
  const handleConfirm = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onConfirm()
  }

  return (
    <View style={styles.container}>
      <OutlinedText fontSize={formatTabletElementsSize(15)}>
        {text}
      </OutlinedText>
      <View style={styles.buttonContainer}>
        {onCancel && (
          <Button
            buttonContainerStyle={styles.buttonContent}
            onPress={onCancel}
            style={styles.button}
            textSize={formatTabletElementsSize(12)}
            title={cancelButtonText}
            type={BUTTON_TYPE.Error}
          />
        )}
        <Button
          buttonContainerStyle={styles.buttonContent}
          onPress={handleConfirm}
          style={[styles.button, !onCancel && styles.buttonRestricted]}
          textSize={formatTabletElementsSize(12)}
          title={confirmButtonText}
          withSound={confirmWithSound}
        />
      </View>
    </View>
  )
}

export default memo(BasicModalContent)
