import { StarIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { LevelCardProps } from '@components/molecules/LevelCard/LevelCard.types'
import { LEVEL_NAMES } from '@constants'
import { useAppSelector } from '@store/hooks'
import { getLevelById, Level } from '@store/slices/levelsSlice'
import { COLORS, GlobalStyles } from '@theme'
import { LEVEL_DIFFICULTY } from '@types'
import { getLevelIcon } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'moti'
import { FC, memo } from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './LevelCard.styles'

const LevelCard: FC<LevelCardProps> = ({ onPress, isSelectedLevel, level }) => {
  const closedLevelIcon = require('../../../../assets/images/levels/lock-icon.png')
  const { isAvailable, stars, difficulty } = useAppSelector(
    getLevelById(level)
  ) as Level

  const containerGradient: readonly [string, string, ...Array<string>] = {
    [LEVEL_DIFFICULTY.Easy]: [
      COLORS.gradientGreen_2,
      COLORS.gradientGreen_3,
      COLORS.gradientGreen_1,
      COLORS.gradientGreen_3,
      COLORS.gradientGreen_2,
    ],
    [LEVEL_DIFFICULTY.Medium]: [
      COLORS.gradientTerracotta_1,
      COLORS.gradientTerracotta_4,
      COLORS.gradientTerracotta_2,
      COLORS.gradientTerracotta_4,
      COLORS.gradientTerracotta_1,
    ],
    [LEVEL_DIFFICULTY.Hard]: [
      COLORS.gradientPurple_1,
      COLORS.gradientPurple_4,
      COLORS.gradientPurple_2,
      COLORS.gradientPurple_4,
      COLORS.gradientPurple_1,
    ],
  }[difficulty] as [string, string, ...Array<string>]

  const containerShadow = {
    [LEVEL_DIFFICULTY.Easy]: styles.greenShadow,
    [LEVEL_DIFFICULTY.Medium]: styles.orangeShadow,
    [LEVEL_DIFFICULTY.Hard]: styles.purpleShadow,
  }[difficulty]

  const containerBorder = {
    [LEVEL_DIFFICULTY.Easy]: styles.greenBorder,
    [LEVEL_DIFFICULTY.Medium]: styles.orangeBorder,
    [LEVEL_DIFFICULTY.Hard]: styles.purpleBorder,
  }[difficulty]

  const containerStyles = [
    styles.container,
    isSelectedLevel && styles.containerSelected,
    isAvailable && containerBorder,
    isSelectedLevel && isAvailable && containerShadow,
    isSelectedLevel && !isAvailable && styles.greyShadow,
  ].filter(Boolean)

  return (
    <View
      style={[
        styles.wrapper,
        isSelectedLevel && isAvailable && styles.selectedWrapper,
      ]}
    >
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
              style={
                !isAvailable ? GlobalStyles.invisible : GlobalStyles.visible
              }
            >
              {LEVEL_NAMES[level]}
            </OutlinedText>
          </View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode={'cover'}
              source={isAvailable ? getLevelIcon(level) : closedLevelIcon}
              style={styles.image}
            />
          </View>
          <View style={[GlobalStyles.centeredContainer, styles.bottomCard]}>
            <OutlinedText
              fontSize={stars ? 25 : 32}
              style={styles.levelLabel}
            >{`Level ${level}`}</OutlinedText>
            {isAvailable && (
              <View style={styles.ratingContainer}>
                {Array.from({ length: stars }, (_, i) => i).map((item) => (
                  <StarIcon height={25} key={item} width={25} />
                ))}
              </View>
            )}
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  )
}

export default memo(LevelCard)
