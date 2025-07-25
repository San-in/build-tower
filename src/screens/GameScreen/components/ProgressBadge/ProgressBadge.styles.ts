import { COLORS } from '@theme'
import { StyleSheet } from 'react-native'

export const useStyles = (circleSize: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      height: circleSize,
      justifyContent: 'center',
      width: circleSize,
    },
    innerCircle: {
      alignItems: 'center',
      backgroundColor: COLORS.white20,
      borderColor: COLORS.white50,
      borderRadius: (circleSize * 0.9) / 2,
      borderWidth: 3,
      gap: 5,
      height: circleSize * 0.9,
      justifyContent: 'center',
      padding: 10,
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      width: circleSize * 0.9,
    },
    pulse: {
      borderColor: COLORS.white10,
      borderRadius: circleSize / 2,
      borderWidth: 3,
      height: circleSize,
      position: 'absolute',
      width: circleSize,
    },
  })
