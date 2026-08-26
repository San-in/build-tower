import { MonkeyAnimationProps } from '@components/molecules/MonkeyAnimation/MonkeyAnimation.types'
import { EMPTY_FUNCTION } from '@constants'
import { MONKEY_ANIMATION_TYPE } from '@types'
import LottieView from 'lottie-react-native'
import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './MonkeyAnimation.styles'

const getAnimationSource = (type: MONKEY_ANIMATION_TYPE) => {
  switch (type) {
    case MONKEY_ANIMATION_TYPE.RunAndJump:
      return require('@assets/icons/animations/run-and-jump.json')
    case MONKEY_ANIMATION_TYPE.Landing:
      return require('@assets/icons/animations/landing.json')
    case MONKEY_ANIMATION_TYPE.JumpToTop:
      return require('@assets/icons/animations/jump-top.json')
    case MONKEY_ANIMATION_TYPE.Celebration:
      return require('@assets/icons/animations/celebration.json')
    case MONKEY_ANIMATION_TYPE.Idle:
    default:
      return require('@assets/icons/animations/idle.json')
  }
}

export const MonkeyAnimation: FC<MonkeyAnimationProps> = ({
  type,
  isVisible = false,
  onFinish = EMPTY_FUNCTION,
  containerStyles = {},
  speed = 4,
  size = 100,
  loop = false,
}) => {
  const handleAnimationFinish = (isCancelled?: boolean) => {
    if (isCancelled) {
      return
    }
    onFinish()
  }

  const animationSource = useMemo(() => getAnimationSource(type), [type])

  const animationStyle = useMemo(
    () => [{ width: size, height: size }, styles.content, containerStyles],
    [containerStyles, size]
  )

  return (
    <View style={styles.container}>
      {isVisible && (
        <LottieView
          autoPlay
          loop={loop}
          onAnimationFinish={handleAnimationFinish}
          source={animationSource}
          speed={speed}
          style={animationStyle}
        />
      )}
    </View>
  )
}

export default memo(MonkeyAnimation)
