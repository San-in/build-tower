import { MarketIcon } from '@assets/icons'
import { OutlinedText } from '@components/atoms'
import PowerUpButton from '@components/atoms/PowerUpButton/PowerUpButton'
import { EMPTY_FUNCTION } from '@constants'
import { COLORS } from '@theme'
import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'
import { formatTabletElementsSize } from '@utils'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './WelcomeBonusContent.styles'

const iconsConfig = [
  { color: POWER_UP_GRADE.Bronze, type: POWER_UP_TYPE.AddRandomBlocks },
  { color: POWER_UP_GRADE.Bronze, type: POWER_UP_TYPE.RemoveRandomBlocks },
  { color: POWER_UP_GRADE.Base, type: POWER_UP_TYPE.AddExtraStep },
]

const WelcomeBonusContent: FC = () => (
  <View style={styles.textContainer}>
    <View style={styles.iconsContainer}>
      {iconsConfig.map(({ type, color }) => (
        <PowerUpButton
          color={color}
          count={1}
          isDisabled={true}
          key={type}
          onPress={EMPTY_FUNCTION}
          size={formatTabletElementsSize(60)}
          type={type}
        />
      ))}
    </View>
    <OutlinedText fontSize={formatTabletElementsSize(18)}>
      Enjoy it — and get more on the
    </OutlinedText>
    <View style={styles.highLighterTextContainer}>
      <MarketIcon
        height={formatTabletElementsSize(30)}
        width={formatTabletElementsSize(30)}
      />
      <OutlinedText
        color={COLORS.gradientGold_1}
        fontSize={formatTabletElementsSize(22)}
      >
        Market
      </OutlinedText>
    </View>
  </View>
)
export default memo(WelcomeBonusContent)
