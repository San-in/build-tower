import { DoneIcon, GiftIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import { useAppSelector } from '@store/hooks'
import { getDayInfoByDay } from '@store/slices/userActivitySlice'
import { COLORS } from '@theme'
import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import { FC, useMemo } from 'react'
import { Pressable, View } from 'react-native'

import { CalendarPrizeIcon } from '../CalendarPrizeIcon'
import { styles } from './CalendarItem.styles'
import { CalendarItemProps } from './CalendarItem.types'

const CalendarItem: FC<CalendarItemProps> = ({
  day,
  prize,
  quantity,
  itemWidth = 100,
  onSelect,
  isSelected,
}) => {
  const dayInfo = useAppSelector((state) => getDayInfoByDay(state, day))
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
        shadowColor: isSelected ? COLORS.yellow70 : COLORS.codeGrey,
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
            <DoneIcon height={25} width={25} />
          ) : (
            <GiftIcon height={25} width={25} />
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
            <CalendarPrizeIcon count={quantity} type={prize} />
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
              fontSize={15}
              style={styles.cardText}
            >{`Day ${day}`}</OutlinedText>
          </View>
        </LinearGradient>
      </Pressable>
    </MotiView>
  )
}
export default CalendarItem
