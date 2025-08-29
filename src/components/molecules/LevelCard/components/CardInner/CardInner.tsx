import { StarIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import {
  containerBorderMap,
  containerGradientMap,
  containerShadowMap,
} from '@components/molecules/LevelCard/colorsMap'
import { LevelCardProps } from '@components/molecules/LevelCard/LevelCard.types'
import { LEVEL_NAMES } from '@constants'
import { useAppSelector } from '@store/hooks'
import { getLevelById, Level } from '@store/slices/levelsSlice'
import { GlobalStyles } from '@theme'
import { getLevelIcon } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import React, { FC, memo, useMemo } from 'react'
import { Image, Pressable, View } from 'react-native'

import { styles } from './CardInner.styles'

const CardInner: FC<LevelCardProps> = ({ onPress, level, isSelectedLevel }) => {
  const closedLevelIcon = require('../../../../../../assets/images/levels/lock-icon.png')
  const selectLevel = useMemo(() => getLevelById(level), [level])
  const { isAvailable, stars, difficulty } = useAppSelector(
    selectLevel
  ) as Level

  const containerGradient: readonly [string, string, ...Array<string>] =
    containerGradientMap[difficulty] as [string, string, ...Array<string>]
  const containerShadow = containerShadowMap[difficulty]
  const containerBorder = containerBorderMap[difficulty]

  const containerStyles = [
    styles.container,
    isSelectedLevel && styles.containerSelected,
    isAvailable && containerBorder,
    isSelectedLevel && isAvailable && containerShadow,
    isSelectedLevel && !isAvailable && styles.greyShadow,
  ].filter(Boolean)
  if (level === 3) {
    console.log(isSelectedLevel)
    console.log(isAvailable)
  }

  return (
    <Pressable onPress={onPress} style={containerStyles}>
      <View
        style={[
          styles.cardContainer,
          isAvailable && styles.cardContainerAvailable,
        ]}
      />
      <LinearGradient
        colors={containerGradient}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.labelContainer}>
          <OutlinedText
            fontSize={20}
            style={!isAvailable ? GlobalStyles.invisible : GlobalStyles.visible}
          >
            {LEVEL_NAMES[level]}
          </OutlinedText>
        </View>

        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            source={isAvailable ? getLevelIcon(level) : closedLevelIcon}
            style={styles.image}
          />
        </View>

        <View style={[GlobalStyles.centeredContainer, styles.bottomCard]}>
          <OutlinedText fontSize={stars ? 25 : 32} style={styles.levelLabel}>
            {`Level ${level}`}
          </OutlinedText>
          {isAvailable && (
            <View style={styles.ratingContainer}>
              {Array.from({ length: stars }, (_, i) => (
                <StarIcon height={25} key={i} width={25} />
              ))}
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  )
}

export default memo(
  CardInner,
  (prev, next) =>
    prev.level === next.level && prev.isSelectedLevel === next.isSelectedLevel
)
