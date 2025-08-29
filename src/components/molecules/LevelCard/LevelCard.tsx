import { OutlinedText } from '@components/atoms'
import { CardInner } from '@components/molecules/LevelCard/components'
import { LevelCardProps } from '@components/molecules/LevelCard/LevelCard.types'
import { useAppSelector } from '@store/hooks'
import { getLevelById, Level } from '@store/slices/levelsSlice'
import { COLORS } from '@theme'
import { LEVEL_DIFFICULTY } from '@types'
import { MotiView } from 'moti'
import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './LevelCard.styles'
const SHAKE_KEYFRAMES: Array<number> = [0, -4, 4, -2, 2, 0]

const LevelCard: FC<LevelCardProps> = ({ onPress, isSelectedLevel, level }) => {
  const selectLevel = useMemo(() => getLevelById(level), [level])
  const { isAvailable, difficulty } = useAppSelector(selectLevel) as Level

  const infoMessage = {
    [LEVEL_DIFFICULTY.Easy]: 'Complete all previous levels to unlock!',
    [LEVEL_DIFFICULTY.Medium]: 'Earn at least 2 stars on every previous level!',
    [LEVEL_DIFFICULTY.Hard]:
      'Master all previous levels with 3  stars to proceed!',
  }[difficulty]

  return (
    <View>
      {isSelectedLevel ? (
        <MotiView
          animate={{ translateX: SHAKE_KEYFRAMES }}
          from={{ translateX: 0 }}
          style={[styles.wrapper, isAvailable && styles.selectedWrapper]}
          transition={{ type: 'timing', duration: 100 }}
        >
          <CardInner
            isSelectedLevel={isSelectedLevel}
            level={level}
            onPress={onPress}
          />
        </MotiView>
      ) : (
        <View style={styles.wrapper}>
          <CardInner
            isSelectedLevel={isSelectedLevel}
            level={level}
            onPress={onPress}
          />
        </View>
      )}

      <MotiView
        animate={{ opacity: isSelectedLevel && !isAvailable ? 1 : 0 }}
        style={styles.infoMessageContainer}
        transition={{ type: 'timing', duration: 100 }}
      >
        <OutlinedText
          color={COLORS.white50}
          fontSize={14}
          strokeColor={COLORS.gradientGrey_2}
        >
          {infoMessage}
        </OutlinedText>
      </MotiView>
    </View>
  )
}

export default memo(
  LevelCard,
  (prev, next) =>
    prev.level === next.level && prev.isSelectedLevel === next.isSelectedLevel
)
