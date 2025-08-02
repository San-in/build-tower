import { OutlinedText } from '@components/atoms'
import { PowerUpIconProps } from '@components/molecules/PowerUpIcon/PowerUpIcon.types'
import { COLORS } from '@theme'
import { POWER_UP_GRADE, POWER_UP_TYPE } from '@types'
import { LinearGradient } from 'expo-linear-gradient'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './PowerUpIcon.styles'

const PowerUpIcon: FC<PowerUpIconProps> = ({
  size = 50,
  type,
  color,
  textSize = 40,
}) => {
  const powerUpType = {
    [POWER_UP_TYPE.AddRandomBlocks]: '+',
    [POWER_UP_TYPE.RemoveRandomBlocks]: '-',
  }[type]

  const borderColor = {
    [POWER_UP_GRADE.Bronze]: COLORS.gradientBronze_3,
    [POWER_UP_GRADE.Silver]: COLORS.gradientSilver_3,
    [POWER_UP_GRADE.Gold]: COLORS.gradientGold_1,
  }[color]

  const containerGradient: readonly [string, string, ...Array<string>] = {
    [POWER_UP_TYPE.AddRandomBlocks]: [
      COLORS.gradientGreen_1,
      COLORS.gradientGreen_2,
      COLORS.gradientGreen_3,
      COLORS.gradientGreen_1,
    ],
    [POWER_UP_TYPE.RemoveRandomBlocks]: [
      COLORS.gradientRed_1,
      COLORS.gradientRed_2,
      COLORS.gradientRed_3,
      COLORS.gradientRed_1,
    ],
  }[type] as [string, string, ...Array<string>]

  return (
    <View
      style={[
        styles.container,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <LinearGradient
        colors={containerGradient}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 0 }}
        style={[
          styles.contentContainer,
          {
            borderColor,
            borderRadius: size / 2,
          },
        ]}
      >
        <View style={styles.text}>
          <OutlinedText fontSize={textSize}>{powerUpType}</OutlinedText>
        </View>
      </LinearGradient>
    </View>
  )
}
export default memo(PowerUpIcon)
