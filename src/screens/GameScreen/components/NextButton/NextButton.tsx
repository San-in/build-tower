import { Button } from '@components/atoms'
import { BUTTON_TYPE } from '@types'
import { MotiView } from 'moti'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './NextButton.styles'
import { NextButtonProps } from './NextButton.types'

const NextButton: FC<NextButtonProps> = ({
  isLoading,
  isDisabled,
  isVisible,
  onPress,
}) => (
  <View style={styles.container}>
    <MotiView
      animate={{ opacity: isVisible ? 1 : 0 }}
      from={{ opacity: 0 }}
      style={styles.buttonWrapper}
      transition={{ type: 'timing', duration: 200, delay: 300 }}
    >
      <Button
        buttonContainerStyle={styles.buttonContainer}
        isDisabled={isDisabled}
        onPress={onPress}
        textSize={16}
        title={isLoading ? 'BUILDING...' : 'NEXT STEP  →'}
        type={BUTTON_TYPE.Warning}
      />
    </MotiView>
  </View>
)

export default memo(NextButton)
