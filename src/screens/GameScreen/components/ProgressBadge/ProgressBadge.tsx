import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { calculateExpectedLevelConditions } from '@utils'
import { MotiView } from 'moti'
import { FC, useMemo } from 'react'
import { StyleSheet } from 'react-native'

type ProgressBadgeProps = {
  animationKey: string
  initialValue?: number
  userValue?: number
  isTowerBuilding?: boolean
}
const CIRCLE_SIZE = 120
const ProgressBadge: FC<ProgressBadgeProps> = ({
  animationKey,
  initialValue = 0,
  userValue = 0,
  isTowerBuilding,
}) => {
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
    return (
      [maxNumber > 999 && 12, maxNumber > 99 && 16].filter(Boolean)[0] || 24
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
        <OutlinedText fontSize={12}>Progress</OutlinedText>
        <OutlinedText fontSize={fontSize}>
          {`${initialValue} / ${userValue}`}
        </OutlinedText>
      </MotiView>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    width: CIRCLE_SIZE,
  },
  innerCircle: {
    alignItems: 'center',
    backgroundColor: COLORS.white20,
    borderColor: COLORS.white50,
    borderRadius: (CIRCLE_SIZE * 0.9) / 2,
    borderWidth: 3,
    gap: 5,
    height: CIRCLE_SIZE * 0.9,
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: CIRCLE_SIZE * 0.9,
  },
  pulse: {
    borderColor: COLORS.white10,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 3,
    height: CIRCLE_SIZE,
    position: 'absolute',
    width: CIRCLE_SIZE,
  },
})

export default ProgressBadge
