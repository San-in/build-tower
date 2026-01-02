import { CheckGreenIcon, GiftIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { Z_INDEX_TYPE } from '@constants'
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
      backgroundStyle={{
        backgroundColor: COLORS.gradientPurple_2,
        borderWidth: 1,
      }}
      handleIndicatorStyle={{ backgroundColor: COLORS.white }}
      index={-1}
      onChange={() => {
        onClose()
      }}
      ref={awardDetailsBottomSheetRef}
      snapPoints={['98%']}
    >
      <BottomSheetView
        style={{
          flex: 1,
          height: '100%',
        }}
      >
        {!progress ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
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
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 10,
              paddingBottom: 30,
              paddingHorizontal: 10,
              gap: 5,
            }}
          >
            <OutlinedText fontSize={24}>{name || ''}</OutlinedText>
            <View
              style={{
                aspectRatio: 1,
                marginTop: 30,
                flex: 1,
              }}
            >
              {icon}
            </View>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                zIndex: Z_INDEX_TYPE.high,
              }}
              horizontal={true}
              style={{
                flexDirection: 'row',
              }}
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
                    style={{
                      height: 20,
                      width: 50,
                      backgroundColor: COLORS.codeGrey20,
                      borderRightWidth: 1,
                      elevation: 4,
                      shadowColor: isLevelReachedMax
                        ? COLORS.white40
                        : COLORS.yellow40,
                      shadowOffset: { width: 2, height: 5 },
                      shadowOpacity: 0.5,
                      shadowRadius: 15,
                    }}
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
                          {
                            position: 'absolute',
                            top: -35,
                            left: '50%',

                            borderWidth: 1,
                            padding: 2,
                            borderRadius: 50,
                            borderColor: COLORS.white50,
                            backgroundColor: COLORS.yellow10,
                            transform: [
                              { translateX: '-50%' },
                              { scale: pressed ? 0.9 : 1 },
                            ],
                          },
                        ]}
                      >
                        <GiftIcon
                          height={25}
                          opacity={!isPrizeClaimed ? 1 : 0.2}
                          width={25}
                        />
                        {isPrizeClaimed && (
                          <View
                            style={{
                              position: 'absolute',
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: 0,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CheckGreenIcon
                              height={25}
                              stroke={COLORS.white}
                              strokeWidth={0.5}
                              width={25}
                            />
                          </View>
                        )}
                      </Pressable>
                    )}
                    <View style={{ position: 'absolute', top: 25, right: 0 }}>
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
                      style={{
                        width: getGradientWidth(),
                        height: '100%',
                        position: 'absolute',
                      }}
                    />
                  </View>
                )
              })}
            </ScrollView>

            <OutlinedText fontSize={15}>{description || ''}</OutlinedText>
            <View
              style={{
                marginTop: 20,
                alignSelf: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                opacity: Number(!isLevelReachedMax),
              }}
            >
              <OutlinedText fontSize={12}>To next level: </OutlinedText>
              <OutlinedText
                color={COLORS.gradientGold_1}
                fontSize={15}
                strokeColor={COLORS.brown}
              >
                {String(currentLevelTarget - currentRepeats)}
              </OutlinedText>
              <OutlinedText fontSize={12}> repeats</OutlinedText>
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
          style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        />
      </BottomSheetView>
    </BottomSheet>
  )
}
export default memo(AwardBottomSheet)
