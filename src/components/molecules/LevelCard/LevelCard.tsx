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
import { COLORS, GlobalStyles } from '@theme'
import { LEVEL_DIFFICULTY } from '@types'
import { getLevelIcon } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, MotiView } from 'moti'
import { FC, memo } from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './LevelCard.styles'

const LevelCard: FC<LevelCardProps> = ({ onPress, isSelectedLevel, level }) => {
  const closedLevelIcon = require('../../../../assets/images/levels/lock-icon.png')
  const { isAvailable, stars, difficulty } = useAppSelector(
    getLevelById(level)
  ) as Level

  const infoMessage = {
    [LEVEL_DIFFICULTY.Easy]: 'Complete all previous levels to unlock!',
    [LEVEL_DIFFICULTY.Medium]: 'Earn at least 2 stars on every previous level!',
    [LEVEL_DIFFICULTY.Hard]:
      'Master all previous levels with 3  stars to proceed!',
  }[difficulty]

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

  return (
    <View>
      <MotiView
        animate={{
          translateX: isSelectedLevel ? [0, -6, 6, -4, 4, -2, 2, 0] : 0,
        }}
        from={{ translateX: 0 }}
        style={[
          styles.wrapper,
          isSelectedLevel && isAvailable && styles.selectedWrapper,
        ]}
        transition={{ type: 'timing', duration: 150 }}
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
      </MotiView>
      <MotiView
        animate={{
          opacity: isSelectedLevel && !isAvailable ? 1 : 0,
        }}
        style={styles.infoMessageContainer}
        transition={{
          type: 'timing',
          duration: 100,
          delay: 0,
        }}
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

export default memo(LevelCard)
