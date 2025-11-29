import { ModalBorderBlueImg } from '@assets/images'
import { OutlinedText } from '@components/atoms'
import { CALENDAR_REWARDS } from '@constants'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { bananasService, marketService } from '@services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getLastAchievedDayFromState } from '@store/slices/userActivitySlice'
import { COLORS, GlobalStyles } from '@theme'
import { CALENDAR_SPECIAL_PRIZE, CalendarPrize, MARKET_PRODUCT } from '@types'
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
import { FlatList, StyleSheet, View } from 'react-native'

import { userActivityService } from '../../../../services/userActivityService'
import { SuccessActionModal } from '../../../GameScreen/components'
import { styles } from './ActivityCalendar.styles'
import { ActivityCalendarProps, PrizeModalData } from './ActivityCalendar.types'
import { CalendarItem } from './components'
import { CalendarPrizeIcon } from './components/CalendarPrizeIcon'

const ITEM_WIDTH = 100
const ITEM_GAP = 15
const DEFAULT_GET_PRIZE_MODAL_DATA: PrizeModalData = {
  isVisible: false,
  prize: CALENDAR_SPECIAL_PRIZE.Bananas,
  count: 0,
  day: 1,
}

const ActivityCalendar: FC<ActivityCalendarProps> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch()
  const lastAvailableDay = useAppSelector(getLastAchievedDayFromState)
  const snapPoints = useMemo(() => ['10%', '30%'], [])
  const targetIndex = useMemo(
    () => Math.max(lastAvailableDay - 2, 0),
    [lastAvailableDay]
  )

  const [selectedDay, setSelectedDay] = useState(lastAvailableDay)
  const [getPrizeModalData, setGetPrizeModalData] = useState<PrizeModalData>(
    DEFAULT_GET_PRIZE_MODAL_DATA
  )
  const bottomSheetRef = useRef<BottomSheet>(null)
  const listRef = useRef<FlatList>(null)

  const handleBottomSheetChange = (index: number) => {
    if (index === -1) {
      onClose()
    }
  }

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
      prize: CalendarPrize
      quantity: number
    }) => {
      if (isAchieved && !isRewardClaimed) {
        if (Object.values(MARKET_PRODUCT).includes(prize as MARKET_PRODUCT)) {
          await marketService.increment(
            dispatch,
            prize as MARKET_PRODUCT,
            quantity
          )
        } else {
          await bananasService.addBananas(dispatch, quantity)
        }

        setGetPrizeModalData({ isVisible: true, prize, count: quantity, day })
        setTimeout(() => {
          userActivityService.claimRewardForDay(dispatch, day)
        }, 1000)
      }
      setSelectedDay((prev) => (prev === day ? 0 : day))
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
        backgroundStyle={GlobalStyles.transparent}
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
            source={ModalBorderBlueImg}
            style={[StyleSheet.absoluteFill, styles.bottomSheetImage]}
            transition={100}
          />
          <OutlinedText fontSize={24} style={styles.title}>
            Activity Calendar
          </OutlinedText>
          <LinearGradient
            colors={[
              COLORS.blue90,
              COLORS.gradientBlue_3,
              COLORS.gradientBlue_3,
              COLORS.gradientBlue_2,
              COLORS.blue90,
            ]}
            end={{ x: 1, y: 1 }}
            start={{ x: 0, y: 0 }}
            style={styles.calendarListContainer}
          >
            <FlatList
              contentContainerStyle={[
                styles.calendarListContentContainer,
                {
                  gap: ITEM_GAP,
                },
              ]}
              data={CALENDAR_REWARDS}
              getItemLayout={(_, index) => ({
                length: ITEM_WIDTH + ITEM_GAP,
                offset: (ITEM_WIDTH + ITEM_GAP) * index,
                index,
              })}
              horizontal={true}
              initialScrollIndex={targetIndex}
              keyExtractor={({ day }) => String(day)}
              ref={listRef}
              renderItem={({ item: { day, prize, quantity } }) => (
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
        titleSize={30}
      >
        <View style={styles.successModalContentContainer}>
          <OutlinedText fontSize={20}>Reward for completing </OutlinedText>
          <OutlinedText
            color={COLORS.yellow}
            fontSize={20}
            strokeColor={COLORS.brown}
          >{`${day} day${day > 1 ? 's' : ''}`}</OutlinedText>
          <OutlinedText fontSize={20}>streak: </OutlinedText>
        </View>
        <View style={styles.successModalIconContainer}>
          <CalendarPrizeIcon count={count} size={100} type={prize} />
        </View>
        <OutlinedText fontSize={25}>TAP TO CLAIM REWARD</OutlinedText>
      </SuccessActionModal>
    </>
  )
}

export default ActivityCalendar
