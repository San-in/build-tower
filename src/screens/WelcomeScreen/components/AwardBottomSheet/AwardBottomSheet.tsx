import { CheckGreenIcon, GiftIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useAppDispatch } from '@store/hooks'
import { setPrizeClaimed, SingleAwardState } from '@store/slices/awardsSlice'
import { showAwardSuccess } from '@store/slices/awardsUiSlice'
import { addBananas } from '@store/slices/bananasSlice'
import { incrementProduct } from '@store/slices/marketSlice'
import { COLORS } from '@theme'
import { MARKET_PRODUCT, MarketPrize } from '@types'
import { formatLevelToRomanNum, formatTabletElementsSize , Haptics } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import React, { memo, useCallback, useMemo } from 'react'
import {
  DimensionValue,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import {
  AWARD_TYPE,
  AwardLevelCondition,
  getAwardConfigByType,
} from '../ActivityModal/components/AwardsContent/config'
import { styles } from './AwardBottomSheet.styles'

const GIFT_ICON_SIZE = formatTabletElementsSize(25)
const GIFT_ICON_SIZE_LARGE = formatTabletElementsSize(70)

const AwardBottomSheet = ({
  isVisible,
  onClose,
  progress,
}: {
  isVisible: boolean
  onClose: () => void
  progress: SingleAwardState | null
}) => {
  const dispatch = useAppDispatch()
  const { currentLevel, currentRepeats = 0, type, levelsInfo } = progress || {}
  const { levelConditions, maxLevel, name, icon, description } =
    getAwardConfigByType(type || AWARD_TYPE.NO_POWER_UPS) || {}

  const isLevelReachedMax = useMemo(
    () => currentLevel === maxLevel,
    [currentLevel, maxLevel]
  )
  const isSingleLevelAward = useMemo(() => maxLevel === 1, [maxLevel])

  const singleLevelInfo = levelsInfo?.[1]
  const singleLevelConditions = levelConditions?.[1]

  const currentLevelTarget = useMemo(
    () =>
      levelConditions?.[(currentLevel || 0) + 1]?.targetRepeats ||
      currentRepeats,
    [currentLevel, levelConditions, currentRepeats]
  )
  const previousLevelTarget = useMemo(
    () => levelConditions?.[currentLevel || 0]?.targetRepeats || 0,
    [currentLevel, levelConditions]
  )

  const handleGetAward = useCallback(
    async ({ typePrize, count }: { typePrize: MarketPrize; count: number }) => {
      if (Object.values(MARKET_PRODUCT).includes(typePrize as MARKET_PRODUCT)) {
        dispatch(
          incrementProduct({ product: typePrize as MARKET_PRODUCT, count })
        )
      } else {
        dispatch(addBananas(count))
      }
    },
    [dispatch]
  )
  const handleCloseSheet = useCallback(() => {
    onClose()
  }, [onClose])

  const handleClaimAward = useCallback(
    async (
      level: number,
      conditions: AwardLevelCondition | undefined,
      isPrizeClaimed: boolean
    ) => {
      if (isPrizeClaimed) {
        return
      }
      if (conditions?.prizeType && conditions?.prizeCount && type) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        dispatch(
          showAwardSuccess({
            typePrize: conditions.prizeType,
            countPrize: conditions.prizeCount,
            title: `${name} - ${formatLevelToRomanNum(level)}`,
          })
        )
        await handleGetAward({
          count: conditions.prizeCount,
          typePrize: conditions.prizeType,
        })
        dispatch(setPrizeClaimed({ type, level }))
      }
    },
    [type, name, handleGetAward, dispatch]
  )
  return (
    <BottomSheet
      enablePanDownToClose
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      index={isVisible ? 0 : -1}
      onChange={(index) => {
        if (index === -1) {
          onClose()
        }
      }}
      snapPoints={['98%']}
    >
      <BottomSheetView style={styles.container}>
        {!progress ? (
          <View style={styles.emptyContainer}>
            <OutlinedText fontSize={formatTabletElementsSize(18)}>
              No available information... Please, refresh the page
            </OutlinedText>
          </View>
        ) : (
          <Pressable onPress={handleCloseSheet} style={styles.content}>
            <OutlinedText fontSize={formatTabletElementsSize(20)}>
              {name || ''}
            </OutlinedText>

            {isSingleLevelAward ? (
              <View style={styles.singleGiftContainer}>
                {singleLevelInfo?.isAvailable ? (
                  <Pressable
                    onPress={() =>
                      handleClaimAward(
                        1,
                        singleLevelConditions,
                        singleLevelInfo?.isPrizeClaimed ?? false
                      )
                    }
                    style={({ pressed }) => [
                      styles.singleGiftPressable,
                      { transform: [{ scale: pressed ? 0.9 : 1 }] },
                    ]}
                  >
                    <GiftIcon
                      height={GIFT_ICON_SIZE_LARGE}
                      opacity={!singleLevelInfo?.isPrizeClaimed ? 1 : 0.2}
                      width={GIFT_ICON_SIZE_LARGE}
                    />
                    {singleLevelInfo?.isPrizeClaimed && (
                      <View style={styles.checkOverlay}>
                        <CheckGreenIcon
                          height={GIFT_ICON_SIZE_LARGE}
                          stroke={COLORS.white}
                          strokeWidth={0.5}
                          width={GIFT_ICON_SIZE_LARGE}
                        />
                      </View>
                    )}
                  </Pressable>
                ) : (
                  <View style={styles.singleIconWrapper}>{icon}</View>
                )}
              </View>
            ) : (
              <>
                <View style={styles.iconWrapper}>{icon}</View>
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  horizontal={true}
                  style={styles.scrollView}
                >
                  {Array.from({ length: maxLevel || 1 }).map((_, index) => {
                    const currentRenderedLevel = index + 1
                    const currentLevelInfo = levelsInfo?.[currentRenderedLevel]
                    const { isPrizeClaimed = false, isAvailable = false } =
                      currentLevelInfo || {}
                    const currentLevelConditions =
                      levelConditions?.[currentRenderedLevel]

                    const getGradientWidth = (): DimensionValue => {
                      if ((currentLevel || 0) >= currentRenderedLevel) {
                        return `${100}%`
                      }
                      if ((currentLevel || 0) === index && currentRepeats > 0) {
                        const partialRepeats = Math.min(
                          Math.round(
                            ((currentRepeats - previousLevelTarget) /
                              (currentLevelTarget - previousLevelTarget)) *
                              100
                          ),
                          100
                        )
                        return `${partialRepeats}%`
                      }
                      return `${0}%`
                    }

                    return (
                      <View
                        key={index}
                        style={[
                          styles.levelBar,
                          {
                            shadowColor: isLevelReachedMax
                              ? COLORS.white40
                              : COLORS.yellow40,
                          },
                        ]}
                      >
                        {isAvailable && (
                          <Pressable
                            onPress={() =>
                              handleClaimAward(
                                currentRenderedLevel,
                                currentLevelConditions,
                                isPrizeClaimed
                              )
                            }
                            style={({ pressed }) => [
                              styles.giftPressable,
                              {
                                transform: [
                                  { translateX: '-50%' },
                                  { scale: pressed ? 0.9 : 1 },
                                ],
                              },
                            ]}
                          >
                            <GiftIcon
                              height={GIFT_ICON_SIZE}
                              opacity={!isPrizeClaimed ? 1 : 0.2}
                              width={GIFT_ICON_SIZE}
                            />
                            {isPrizeClaimed && (
                              <View style={styles.checkOverlay}>
                                <CheckGreenIcon
                                  height={GIFT_ICON_SIZE}
                                  stroke={COLORS.white}
                                  strokeWidth={0.5}
                                  width={GIFT_ICON_SIZE}
                                />
                              </View>
                            )}
                          </Pressable>
                        )}
                        <View style={styles.romanContainer}>
                          <OutlinedText
                            fontSize={formatTabletElementsSize(12, 2.5)}
                          >
                            {formatLevelToRomanNum(index + 1)}
                          </OutlinedText>
                        </View>
                        <LinearGradient
                          colors={
                            isLevelReachedMax
                              ? [COLORS.gradientGold_1, COLORS.yellow80]
                              : [COLORS.gradientBlue_5, COLORS.gradientBlue_4]
                          }
                          end={{ x: 1, y: 0 }}
                          start={{ x: 0, y: 0 }}
                          style={[
                            styles.gradientBar,
                            { width: getGradientWidth() },
                          ]}
                        />
                      </View>
                    )
                  })}
                </ScrollView>
              </>
            )}

            <OutlinedText fontSize={formatTabletElementsSize(14, 2.5)}>
              {description || ''}
            </OutlinedText>
            <View
              style={[
                styles.descriptionRow,
                { opacity: Number(!isLevelReachedMax) },
              ]}
            >
              <OutlinedText fontSize={formatTabletElementsSize(12, 2.5)}>
                To next level:
              </OutlinedText>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={formatTabletElementsSize(14, 2.5)}
                strokeColor={COLORS.brown}
              >
                {String(currentLevelTarget - currentRepeats)}
              </OutlinedText>
              <OutlinedText fontSize={formatTabletElementsSize(10, 2.5)}>
                {`repeat${currentLevelTarget - currentRepeats > 1 ? 's' : ''}`}
              </OutlinedText>
            </View>
          </Pressable>
        )}

        <LinearGradient
          colors={[
            COLORS.gradientPurple_2,
            COLORS.gradientPurple_2,
            COLORS.gradientPurple_3,
            COLORS.gradientPurple_1,
            COLORS.gradientPurple_1,
          ]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill, styles.backgroundGradient]}
        />
      </BottomSheetView>
    </BottomSheet>
  )
}
export default memo(AwardBottomSheet)
