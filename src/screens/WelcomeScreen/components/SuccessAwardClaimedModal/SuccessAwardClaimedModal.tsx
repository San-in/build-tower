import { OutlinedText } from '@components/atoms'
import { MarketPrize } from '@types'
import { formatTabletElementsSize } from '@utils'
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
    titleSize={formatTabletElementsSize(20)}
  >
    <View style={{ marginVertical: formatTabletElementsSize(20) }}>
      <CalendarPrizeIcon
        count={countPrize}
        size={formatTabletElementsSize(70)}
        type={typePrize}
      />
    </View>
    <OutlinedText fontSize={formatTabletElementsSize(20)}>
      TAP TO CLAIM REWARD
    </OutlinedText>
  </SuccessActionModal>
)

export default SuccessAwardClaimedModal
