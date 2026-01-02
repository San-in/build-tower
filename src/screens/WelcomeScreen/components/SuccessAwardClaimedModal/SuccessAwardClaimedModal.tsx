import { OutlinedText } from '@components/atoms'
import { MarketPrize } from '@types'
import React, { FC } from 'react'
import { View } from 'react-native'

import { SuccessActionModal } from '../../../GameScreen/components'
import { CalendarPrizeIcon } from '../ActivityCalendar/components/CalendarPrizeIcon'

export type SuccessAwardClaimedModalProps = {
  isVisible: boolean
  onPress: () => void
  title: string
  typePrize: MarketPrize
  countPrize: number
}
const SuccessAwardClaimedModal: FC<SuccessAwardClaimedModalProps> = ({
  isVisible,
  onPress,
  title,
  typePrize,
  countPrize,
}) => (
  <SuccessActionModal
    isVisible={isVisible}
    onPress={onPress}
    title={title}
    titleSize={35}
  >
    <View>
      <CalendarPrizeIcon count={countPrize} size={100} type={typePrize} />
    </View>
    <OutlinedText fontSize={25}>TAP TO CLAIM REWARD</OutlinedText>
  </SuccessActionModal>
)

export default SuccessAwardClaimedModal
