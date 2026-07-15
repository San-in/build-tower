import { BananasIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import PowerUpButton from '@components/atoms/PowerUpButton/PowerUpButton'
import { EMPTY_FUNCTION } from '@constants'
import { MARKET_SPECIAL_PRIZE } from '@types'
import { formatTabletElementsSize, getPowerUpInfoByMarketProduct } from '@utils'
import React, { FC, memo } from 'react'
import { View } from 'react-native'

import { CalendarPrizeIconProps } from './CalendarPrizeIcon.types'

const CalendarPrizeIcon: FC<CalendarPrizeIconProps> = ({
  type,
  count,
  size = formatTabletElementsSize(40),
}) => {
  if (type === MARKET_SPECIAL_PRIZE.Bananas) {
    return (
      <View>
        <OutlinedText
          fontSize={Math.round((15 * size) / 40)}
        >{`${count} x `}</OutlinedText>
        <BananasIcon height={size} transform="scale(-1,1)" width={size} />
      </View>
    )
  }
  const { type: powerUpType, grade } = getPowerUpInfoByMarketProduct(type)
  return (
    <PowerUpButton
      color={grade}
      count={count}
      isDisabled={true}
      onPress={EMPTY_FUNCTION}
      size={size}
      type={powerUpType}
    />
  )
}

export default memo(CalendarPrizeIcon)
