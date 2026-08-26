import { OutlinedText } from '@components/atoms'
import { CardInner } from '@components/molecules/LevelCard/components'
import { useAppSelector } from '@store/hooks'
import { selectLevelById } from '@store/slices/levelsSlice'
import { COLORS } from '@theme'
import { LEVEL_DIFFICULTY } from '@types'
import { formatTabletElementsSize } from '@utils'
import { MotiView } from 'moti'
import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'

import { styles } from './LevelCard.styles'
import { LevelCardProps } from './LevelCard.types'

const SHAKE_KEYFRAMES: Array<number> = [0, -4, 4, -2, 2, 0]

const LevelCard: FC<LevelCardProps> = ({ onPress, isSelectedLevel, level }) => {
  const levelData = useAppSelector(selectLevelById(level))
  const difficulty = levelData?.difficulty

  const infoMessage = useMemo(() => {
    if (!difficulty) {
      return ''
    }
    return {
      [LEVEL_DIFFICULTY.Easy]: 'Clear the previous level to unlock!',
      [LEVEL_DIFFICULTY.Medium]:
        'Earn at least 2 stars on the previous level to unlock!',
      [LEVEL_DIFFICULTY.Hard]: 'Earn 3 stars on the previous level to unlock!',
    }[difficulty]
  }, [difficulty])

  if (!levelData) {
    return null
  }
  const { isAvailable } = levelData

  return (
    <View style={styles.container}>
      <MotiView
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        animate={{ translateX: isSelectedLevel ? SHAKE_KEYFRAMES : 0 }}
        collapsable={false}
        from={{ translateX: 0 }}
        style={[
          styles.wrapper,
          isSelectedLevel && isAvailable && styles.selectedWrapper,
        ]}
        transition={{ type: 'timing', duration: 100 }}
      >
        <CardInner
          isSelectedLevel={isSelectedLevel}
          level={level}
          onPress={onPress}
        />
      </MotiView>

      <MotiView
        animate={{ opacity: isSelectedLevel && !isAvailable ? 1 : 0 }}
        pointerEvents="none"
        style={styles.infoMessageContainer}
        transition={{ type: 'timing', duration: 100 }}
      >
        <OutlinedText
          color={COLORS.white50}
          fontSize={formatTabletElementsSize(14, 1.5)}
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
