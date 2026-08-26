import { ModalBorderOrangeImg } from '@assets/images'
import { OutlinedText } from '@components/atoms'
import { CALENDAR_REWARDS } from '@constants'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { addBananas } from '@store/slices/bananasSlice'
import { incrementProduct } from '@store/slices/marketSlice'
import {
  markRewardClaimedForDay,
  selectLastAchievedDayFromState,
} from '@store/slices/userActivitySlice'
import { COLORS, GlobalStyles } from '@theme'
import {
  CalendarReward,
  MARKET_PRODUCT,
  MARKET_SPECIAL_PRIZE,
  MarketPrize,
} from '@types'
import { formatTabletElementsSize, Haptics, playSfx } from '@utils'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'

import { SuccessActionModal } from '../../../GameScreen/components'
import { styles } from './ActivityCalendar.styles'
import { ActivityCalendarProps, PrizeModalData } from './ActivityCalendar.types'
import { CalendarItem } from './components'
import { CalendarPrizeIcon } from './components/CalendarPrizeIcon'

const ITEM_WIDTH = formatTabletElementsSize(100, 1.5)
const ITEM_GAP = formatTabletElementsSize(15)
const DEFAULT_GET_PRIZE_MODAL_DATA: PrizeModalData = {
  isVisible: false,
  prize: MARKET_SPECIAL_PRIZE.Bananas,
  count: 0,
  day: 1,
}

const ActivityCalendar: FC<ActivityCalendarProps> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch()

  const lastAvailableDay = useAppSelector(selectLastAchievedDayFromState)
  const targetIndex = useMemo(
    () => Math.max(lastAvailableDay - 2, 0),
    [lastAvailableDay]
  )
  const snapPoints = useMemo(() => ['10%', '30%'], [])
  const [selectedDay, setSelectedDay] = useState(lastAvailableDay)
  const [getPrizeModalData, setGetPrizeModalData] = useState<PrizeModalData>(
    DEFAULT_GET_PRIZE_MODAL_DATA
  )
  const bottomSheetRef = useRef<BottomSheet>(null)
  const listRef = useRef<BottomSheetFlatListMethods>(null)

  const handleBottomSheetChange = (index: number) => {
    if (index === -1) {
      onClose()
    }
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={'close'}
      />
    ),
    []
  )

  const handleSuccessModalPress = () =>
    setGetPrizeModalData((prevState) => ({
      ...prevState,
      isVisible: false,
    }))

  const handleSelectItem = useCallback(
    async ({
      isAchieved,
      isRewardClaimed,
      day,
      prize,
      quantity,
    }: {
      isAchieved: boolean
      isRewardClaimed: boolean
      day: number
      prize: MarketPrize
      quantity: number
    }) => {
      playSfx('button')
      if (isAchieved && !isRewardClaimed) {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        dispatch(markRewardClaimedForDay(day))

        if (Object.values(MARKET_PRODUCT).includes(prize as MARKET_PRODUCT)) {
          dispatch(
            incrementProduct({
              product: prize as MARKET_PRODUCT,
              count: quantity,
            })
          )
        } else {
          dispatch(addBananas(quantity))
        }

        setGetPrizeModalData({ isVisible: true, prize, count: quantity, day })
      }
      setSelectedDay((prev: number) => (prev === day ? 0 : day))
    },
    [dispatch]
  )

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand()
      listRef.current?.scrollToIndex({
        index: targetIndex,
        animated: true,
      })
    } else {
      bottomSheetRef.current?.close()
      setSelectedDay(lastAvailableDay)
    }
  }, [isOpen, lastAvailableDay, targetIndex])

  const { day, prize, count, isVisible } = getPrizeModalData

  return (
    <>
      <BottomSheet
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={GlobalStyles.transparent}
        enableContentPanningGesture={false}
        handleIndicatorStyle={GlobalStyles.transparent}
        index={-1}
        onChange={handleBottomSheetChange}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <Image
            allowDownscaling
            cachePolicy="disk"
            contentFit="cover"
            priority="high"
            source={ModalBorderOrangeImg}
            style={[StyleSheet.absoluteFill, styles.bottomSheetImage]}
            transition={100}
          />
          <OutlinedText
            fontSize={formatTabletElementsSize(24, 1.5)}
            style={styles.title}
          >
            Activity Calendar
          </OutlinedText>
          <LinearGradient
            colors={[
              COLORS.tango90,
              COLORS.gradientOrange_3,
              COLORS.gradientOrange_4,
              COLORS.gradientOrange_3,
              COLORS.tango90,
            ]}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={styles.calendarListContainer}
          >
            <BottomSheetFlatList
              contentContainerStyle={[
                styles.calendarListContentContainer,
                {
                  gap: ITEM_GAP,
                },
              ]}
              data={CALENDAR_REWARDS}
              getItemLayout={(
                _: ArrayLike<CalendarReward> | null | undefined,
                index: number
              ) => ({
                length: ITEM_WIDTH + ITEM_GAP,
                offset: (ITEM_WIDTH + ITEM_GAP) * index,
                index,
              })}
              horizontal={true}
              initialScrollIndex={targetIndex}
              keyExtractor={({ day }: CalendarReward) => String(day)}
              ref={listRef}
              renderItem={({
                item: { day, prize, quantity },
              }: {
                item: CalendarReward
              }) => (
                <CalendarItem
                  day={day}
                  isSelected={selectedDay === day}
                  itemWidth={ITEM_WIDTH}
                  onSelect={handleSelectItem}
                  prize={prize}
                  quantity={quantity}
                />
              )}
              showsHorizontalScrollIndicator={false}
              style={styles.calendarList}
            />
          </LinearGradient>
        </BottomSheetView>
      </BottomSheet>
      <SuccessActionModal
        isVisible={isVisible}
        onPress={handleSuccessModalPress}
        title={'Congratulations!'}
        titleSize={formatTabletElementsSize(25)}
      >
        <View style={styles.successModalContentContainer}>
          <OutlinedText fontSize={formatTabletElementsSize(20)}>
            Reward for completing
          </OutlinedText>
          <OutlinedText
            color={COLORS.yellow}
            fontSize={formatTabletElementsSize(20)}
            strokeColor={COLORS.brown}
          >{`${day} day${day > 1 ? 's' : ''}`}</OutlinedText>
          <OutlinedText fontSize={formatTabletElementsSize(20)}>
            streak:
          </OutlinedText>
        </View>
        <View style={styles.successModalIconContainer}>
          <CalendarPrizeIcon
            count={count}
            size={formatTabletElementsSize(100)}
            type={prize}
          />
        </View>
        <OutlinedText fontSize={formatTabletElementsSize(25)}>
          TAP TO CLAIM REWARD
        </OutlinedText>
      </SuccessActionModal>
    </>
  )
}

export default ActivityCalendar
