import { CheckGreenIcon, GiftIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useAppDispatch } from '@store/hooks'
import { setPrizeClaimed, SingleAwardState } from '@store/slices/awardsSlice'
import { addBananas } from '@store/slices/bananasSlice'
import { incrementProduct } from '@store/slices/marketSlice'
import { COLORS } from '@theme'
import { MARKET_PRODUCT, MarketPrize } from '@types'
import { formatLevelToRomanNum } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  DimensionValue,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import {
  AWARD_TYPE,
  getAwardConfigByType,
} from '../AcitvityModal/components/AwardsContent/config'
import { SuccessAwardClaimedModalProps } from '../SuccessAwardClaimedModal/SuccessAwardClaimedModal'
import { styles } from './AwardBottomSheet.styles'

const GIFT_ICON_SIZE = 25

const AwardBottomSheet = ({
  isVisible,
  onClose,
  progress,
  onAwardClaimModalShow,
}: {
  isVisible: boolean
  onClose: () => void
  progress: SingleAwardState | null
  onAwardClaimModalShow: (
    data: Omit<SuccessAwardClaimedModalProps, 'onPress'>
  ) => void
}) => {
  const dispatch = useAppDispatch()
  const awardDetailsBottomSheetRef = useRef<BottomSheet>(null)
  const { currentLevel, currentRepeats = 0, type, levelsInfo } = progress || {}
  const { levelConditions, maxLevel, name, icon, description } =
    getAwardConfigByType(type || AWARD_TYPE.NO_POWER_UPS) || {}

  const isLevelReachedMax = useMemo(
    () => currentLevel === maxLevel,
    [currentLevel, maxLevel]
  )
  const isSingleLevelAward = useMemo(() => maxLevel === 1, [maxLevel])

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
  useEffect(() => {
    if (isVisible && progress) {
      awardDetailsBottomSheetRef?.current?.expand()
    }
  }, [isVisible, progress])

  return (
    <BottomSheet
      enablePanDownToClose
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      index={-1}
      onChange={() => {
        onClose()
      }}
      ref={awardDetailsBottomSheetRef}
      snapPoints={['98%']}
    >
      <BottomSheetView style={styles.container}>
        {!progress ? (
          <View style={styles.emptyContainer}>
            <OutlinedText fontSize={18}>
              No available information... Please, refresh the page
            </OutlinedText>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              onClose()
              awardDetailsBottomSheetRef?.current?.close()
            }}
            style={styles.content}
          >
            <OutlinedText fontSize={24}>{name || ''}</OutlinedText>
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
                if (isSingleLevelAward) {
                  return null
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
                        onPress={async () => {
                          if (isPrizeClaimed) {
                            return
                          }
                          if (
                            currentLevelConditions?.prizeType &&
                            currentLevelConditions?.prizeCount &&
                            type
                          ) {
                            onAwardClaimModalShow({
                              isVisible: true,
                              typePrize: currentLevelConditions.prizeType,
                              countPrize: currentLevelConditions.prizeCount,
                              title: `${name} - ${formatLevelToRomanNum(currentRenderedLevel)}`,
                            })
                            await handleGetAward({
                              count: currentLevelConditions.prizeCount,
                              typePrize: currentLevelConditions.prizeType,
                            })
                            dispatch(
                              setPrizeClaimed({
                                type,
                                level: currentRenderedLevel,
                              })
                            )

                            setTimeout(async () => {
                              awardDetailsBottomSheetRef?.current?.close()
                            }, 800)
                          }
                        }}
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
                      <OutlinedText fontSize={12}>
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

            <OutlinedText fontSize={12}>{description || ''}</OutlinedText>
            <View
              style={[
                styles.descriptionRow,
                { opacity: Number(!isLevelReachedMax) },
              ]}
            >
              <OutlinedText fontSize={10}>To next level: </OutlinedText>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={12}
                strokeColor={COLORS.brown}
              >
                {String(currentLevelTarget - currentRepeats)}
              </OutlinedText>
              <OutlinedText fontSize={10}> repeats</OutlinedText>
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
