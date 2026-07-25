import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import {
  calculateExpectedLevelConditions,
  formatTabletElementsSize,
} from '@utils'
import { MotiView } from 'moti'
import { FC, useMemo } from 'react'
import { View } from 'react-native'

import { useStyles } from './ProgressBadge.styles'
import { ProgressBadgeProps } from './ProgressBadge.types'

const CIRCLE_SIZE = formatTabletElementsSize(150, 1.8)

const ProgressBadge: FC<ProgressBadgeProps> = ({
  animationKey,
  initialValue = 0,
  userValue = 0,
  isTowerBuilding,
  circleSize = CIRCLE_SIZE,
}) => {
  const styles = useStyles(circleSize)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [goldResult = 0, _, bronzeResult = 0] = useMemo(
    () => calculateExpectedLevelConditions(initialValue),
    [initialValue]
  )

  const backgroundColor = useMemo(
    () =>
      [
        userValue === goldResult && !isTowerBuilding && COLORS.green,
        userValue < goldResult &&
          userValue >= bronzeResult &&
          !isTowerBuilding &&
          COLORS.tango,
        userValue > goldResult && !isTowerBuilding && COLORS.roofTerracotta,
      ].filter(Boolean)[0] || COLORS.blue10,
    [userValue, bronzeResult, goldResult, isTowerBuilding]
  )

  const fontSize = useMemo(() => {
    const maxNumber = Math.max(userValue, initialValue)
    return formatTabletElementsSize(
      [maxNumber > 999 && 12, maxNumber > 99 && 14].filter(Boolean)[0] || 18
    )
  }, [initialValue, userValue])

  return (
    <MotiView
      animate={{ opacity: 1 }}
      from={{ opacity: 0 }}
      style={styles.container}
      transition={{ type: 'timing', duration: 500, delay: 1000 }}
    >
      <MotiView
        animate={{
          opacity: [1, 1, 0],
          scale: [1.1, 1.1, 1],
        }}
        from={{ opacity: 0, scale: 1 }}
        key={animationKey}
        style={[styles.pulse, { backgroundColor }]}
        transition={{
          loop: true,
          type: 'timing',
          duration: 3000,
        }}
      />

      <MotiView
        animate={{ scale: 0.95 }}
        from={{ scale: 1 }}
        style={styles.innerCircle}
        transition={{ loop: true, type: 'timing', duration: 2000 }}
      >
        <OutlinedText fontSize={formatTabletElementsSize(12, 2.5)}>
          Progress
        </OutlinedText>
        <OutlinedText fontSize={fontSize}>{`${userValue}`}</OutlinedText>
        <View style={styles.valuesSeparator} />
        <OutlinedText fontSize={fontSize}>{`${initialValue}`}</OutlinedText>
      </MotiView>
    </MotiView>
  )
}

export default ProgressBadge
