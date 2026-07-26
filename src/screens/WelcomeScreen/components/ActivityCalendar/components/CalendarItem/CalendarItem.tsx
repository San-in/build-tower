import { DoneIcon, GiftIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { useAppSelector } from '@store/hooks'
import { selectDayInfoByDay } from '@store/slices/userActivitySlice'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { FC, useMemo } from 'react'
import { Pressable, View } from 'react-native'

import { CalendarPrizeIcon } from '../CalendarPrizeIcon'
import { styles } from './CalendarItem.styles'
import { CalendarItemProps } from './CalendarItem.types'

const STATUS_ICON_SIZE = formatTabletElementsSize(20)

const CalendarItem: FC<CalendarItemProps> = ({
  day,
  prize,
  quantity,
  itemWidth = formatTabletElementsSize(100),
  onSelect,
  isSelected,
}) => {
  const selectDayInfo = useMemo(() => selectDayInfoByDay(day), [day])
  const dayInfo = useAppSelector(selectDayInfo)
  const { rewardClaimed, achieved } = dayInfo || {}

  const handleSelect = () =>
    onSelect({
      isAchieved: Boolean(achieved),
      isRewardClaimed: Boolean(rewardClaimed),
      day,
      prize,
      quantity,
    })

  const cardBackground = useMemo(
    () =>
      [
        achieved && !rewardClaimed && COLORS.gradientGold_1,
        achieved && rewardClaimed && COLORS.blue,
      ].filter(Boolean)[0] || COLORS.gradientSilver_1,
    [achieved, rewardClaimed]
  )
  if (!dayInfo) {
    return null
  }

  return (
    <MotiView
      animate={{
        scale: isSelected ? 1.1 : 1,
        shadowColor: isSelected ? COLORS.white40 : COLORS.codeGrey30,
      }}
      style={[
        styles.container,
        {
          width: itemWidth,
          borderRadius: itemWidth / 5,
          backgroundColor: cardBackground,
        },
      ]}
      transition={{ type: 'timing', duration: 100 }}
    >
      <Pressable onPress={handleSelect} style={styles.contentContainer}>
        <View
          style={[
            styles.statusIconContainer,
            {
              opacity: Number(achieved),
            },
          ]}
        >
          {rewardClaimed ? (
            <DoneIcon height={STATUS_ICON_SIZE} width={STATUS_ICON_SIZE} />
          ) : (
            <GiftIcon height={STATUS_ICON_SIZE} width={STATUS_ICON_SIZE} />
          )}
        </View>
        <LinearGradient
          colors={[COLORS.gradientGold_1, COLORS.white70, COLORS.white90]}
          style={[
            styles.content,
            {
              borderRadius: itemWidth / 5,
            },
          ]}
        >
          <View
            style={[
              styles.prizeIconContainer,
              {
                borderTopLeftRadius: itemWidth / 5,
                borderTopRightRadius: itemWidth / 5,
              },
            ]}
          >
            <CalendarPrizeIcon
              count={quantity}
              size={formatTabletElementsSize(35)}
              type={prize}
            />
          </View>
          <View
            style={[
              styles.cardTextContainer,
              {
                backgroundColor: cardBackground,
              },
            ]}
          >
            <OutlinedText
              fontSize={formatTabletElementsSize(12)}
              style={styles.cardText}
            >{`Day ${day}`}</OutlinedText>
          </View>
        </LinearGradient>
      </Pressable>
    </MotiView>
  )
}
export default CalendarItem
