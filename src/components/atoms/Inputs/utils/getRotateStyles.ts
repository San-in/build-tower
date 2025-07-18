import { Animated } from 'react-native'

export const getRotateStyle = (rotation: Animated.Value) => ({
  transform: [
    {
      rotate: rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg'],
      }),
    },
  ],
})
