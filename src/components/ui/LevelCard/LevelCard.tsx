import { Pressable, View } from 'react-native'
import { LevelCardProps } from '@components/ui/LevelCard/LevelCard.types'
import { FC } from 'react'
import { Image } from 'moti'
import { LinearGradient } from 'expo-linear-gradient'

import { COLORS, GlobalStyles } from '@theme'
import { OutlinedText } from '@components/ui/OutlinedText'
import { getLevelIcon } from '@utils'
import { getLevelById, Level } from '@store/slices/levelsSlice'
import { useAppSelector } from '@store/hooks'
import { LEVEL_NAMES } from '@constants'
import { StarIcon } from '@assets/icons'
import { styles } from '@components/ui/LevelCard/LevelCard.styles'
import { LEVEL_DIFFICULTY } from '@types'

const LevelCard: FC<LevelCardProps> = ({ onPress, isSelectedLevel, level }) => {
  const closedLevelIcon = require('../../../../assets/images/levels/lock-icon.png')
  const { isAvailable, stars, difficulty } = useAppSelector(
    getLevelById(level)
  ) as Level

  const containerGradient: readonly [string, string, ...string[]] = {
    [LEVEL_DIFFICULTY.Easy]: [
      COLORS.gradientGreen_5,
      COLORS.gradientGreen_2,
      COLORS.gradientGreen_1,
      COLORS.gradientGreen_2,
      COLORS.gradientGreen_5,
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
      COLORS.gradientPurple_3,
      COLORS.gradientPurple_2,
      COLORS.gradientPurple_3,
      COLORS.gradientPurple_1,
    ],
  }[difficulty] as [string, string, ...string[]]

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
    <Pressable onPress={onPress} style={containerStyles}>
      <View
        style={[
          styles.cardContainer,
          isAvailable && styles.cardContainerAvailable,
        ]}
      />
      <LinearGradient
        colors={containerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.labelContainer}>
          <OutlinedText
            fontSize={20}
            style={
              !isAvailable ? GlobalStyles.transparent : GlobalStyles.visible
            }
          >
            {LEVEL_NAMES[level]}
          </OutlinedText>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={isAvailable ? getLevelIcon(level) : closedLevelIcon}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <View style={[GlobalStyles.centeredContainer, styles.bottomCard]}>
          <OutlinedText
            style={styles.levelLabel}
            fontSize={stars ? 25 : 32}
          >{`Level ${level}`}</OutlinedText>
          {isAvailable && (
            <View style={styles.ratingContainer}>
              {Array.from({ length: stars }, (_, i) => i).map((item) => (
                <StarIcon key={item} width={25} height={25} />
              ))}
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  )
}

export default LevelCard
