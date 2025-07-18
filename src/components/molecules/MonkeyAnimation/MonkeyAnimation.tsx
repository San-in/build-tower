import { MonkeyAnimationProps } from '@components/molecules/MonkeyAnimation/MonkeyAnimation.types'
import { EMPTY_FUNCTION } from '@constants'
import { MONKEY_ANIMATION_TYPE } from '@types'
import LottieView from 'lottie-react-native'
import React, { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './MonkeyAnimation.styles'

export const MonkeyAnimation: FC<MonkeyAnimationProps> = ({
  type,
  isVisible = false,
  onFinish = EMPTY_FUNCTION,
  containerStyles = {},
  speed = 4,
  size = 100,
  loop = false,
}) => {
  const handleAnimationFinish = () => {
    onFinish()
  }

  const animationSource = {
    [MONKEY_ANIMATION_TYPE.RunAndJump]: require('@assets/icons/animations/run-and-jump.json'),
    [MONKEY_ANIMATION_TYPE.Landing]: require('@assets/icons/animations/landing.json'),
    [MONKEY_ANIMATION_TYPE.Idle]: require('@assets/icons/animations/idle.json'),
    [MONKEY_ANIMATION_TYPE.JumpToTop]: require('@assets/icons/animations/jump-top.json'),
    [MONKEY_ANIMATION_TYPE.Celebration]: require('@assets/icons/animations/celebration.json'),
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

export default memo(MonkeyAnimation)
