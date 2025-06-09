import { styles } from '@components/ui/MonkeyAnimation/MonkeyAnimation.styles'
import { MonkeyAnimationProps } from '@components/ui/MonkeyAnimation/MonkeyAnimation.types'
import { MONKEY_ANIMATION_TYPE } from '@types'
import LottieView from 'lottie-react-native'
import React, { FC } from 'react'
import { View } from 'react-native'

export const MonkeyAnimation: FC<MonkeyAnimationProps> = ({
  type,
  isVisible = false,
  onFinish = () => {},
  containerStyles = {},
  speed = 4,
  size = 100,
  loop = false,
}) => {
  const handleAnimationFinish = () => {
    onFinish()
  }

  const animationSource = {
    [MONKEY_ANIMATION_TYPE.RUN_AND_JUMP]: require('@assets/icons/animations/run-and-jump.json'),
    [MONKEY_ANIMATION_TYPE.LANDING]: require('@assets/icons/animations/landing.json'),
    [MONKEY_ANIMATION_TYPE.IDLE]: require('@assets/icons/animations/idle.json'),
  }[type]

  return (
    <View style={styles.container}>
      {isVisible && (
        <LottieView
          autoPlay
          loop={loop}
          onAnimationFinish={handleAnimationFinish}
          source={animationSource}
          speed={speed}
          style={[
            {
              width: size,
              height: size,
            },
            styles.content,
            containerStyles,
          ]}
        />
      )}
    </View>
  )
}

export default MonkeyAnimation
