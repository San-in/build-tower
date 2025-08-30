import { Button } from '@components/atoms'
import { BUTTON_TYPE } from '@types'
import { MotiView } from 'moti'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import { styles } from './NextButton.styles'
import { NextButtonProps } from './NextButton.types'

const NextButton: FC<NextButtonProps> = ({
  isLoading,
  isDisabled,
  isVisible,
  onPress,
}) => {
  const prevDisabled = useRef<boolean | null>(null)
  const [shouldShake, setShouldShake] = useState(false)

  useEffect(() => {
    const wasDisabled = prevDisabled.current
    const becameEnabled = !isDisabled

    let timeoutId: number

    if (wasDisabled && becameEnabled) {
      setShouldShake(true)

      if (!isLoading) {
        timeoutId = setTimeout(() => setShouldShake(false), 2000)
      }
    }

    prevDisabled.current = Boolean(isDisabled)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isDisabled, isLoading])

  return (
    <View style={styles.container}>
      <MotiView
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: shouldShake ? [1, 1.1, 0.95, 1.1, 1] : 1,
        }}
        style={styles.buttonWrapper}
        transition={{
          scale: { type: 'timing', duration: 200 },
          opacity: { type: 'timing', duration: 250 },
        }}
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
}

export default memo(NextButton)
