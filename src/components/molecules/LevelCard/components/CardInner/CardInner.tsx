import { StarIcon } from '@assets/icons'
import { LockImg } from '@assets/images'
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
import { getLevelIcon } from '@utils'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { styles } from './CardInner.styles'

const CardInner: FC<LevelCardProps> = ({ onPress, level, isSelectedLevel }) => {
  const selectLevel = useMemo(() => getLevelById(level), [level])
  const { isAvailable, stars, difficulty } = useAppSelector(
    selectLevel
  ) as Level

  const iconSrc = isAvailable ? getLevelIcon(level) : LockImg

  const recyclingKey = isAvailable ? `lvl-${level}` : 'lock'

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

  const [reloadKey, setReloadKey] = useState(0)
  const retryRef = useRef(0)
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleImgError = useCallback(() => {
    if (retryRef.current >= 3) {
      return
    }
    retryRef.current += 1
    retryTimer.current = setTimeout(() => setReloadKey((k) => k + 1), 120)
  }, [])

  useEffect(
    () => () => {
      if (retryTimer.current) {
        clearTimeout(retryTimer.current)
      }
    },
    []
  )

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
            allowDownscaling
            cachePolicy="memory-disk"
            contentFit="cover"
            key={reloadKey}
            onError={handleImgError}
            priority={isSelectedLevel ? 'high' : 'normal'}
            recyclingKey={recyclingKey}
            source={iconSrc}
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: isAvailable
                  ? COLORS.yellow20
                  : COLORS.codeGrey20,
              },
            ]}
            transition={120}
          />
        </View>

        <View style={[GlobalStyles.centeredContainer, styles.bottomCard]}>
          <OutlinedText fontSize={stars ? 25 : 30} style={styles.levelLabel}>
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
    prev.level === next.level &&
    prev.isSelectedLevel === next.isSelectedLevel &&
    prev.onPress === next.onPress
)
