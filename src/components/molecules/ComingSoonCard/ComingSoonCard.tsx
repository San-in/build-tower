import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import { Pressable, View } from 'react-native'

import { styles } from './ComingSoonCard.styles'
import { ComingSoonCardProps } from './ComingSoonCard.types'

const GRADIENT_COLORS: [string, string, ...Array<string>] = [
  COLORS.gradientGrey_1,
  COLORS.gradientGrey_2,
  COLORS.gradientGrey_5,
  COLORS.gradientGrey_3,
  COLORS.gradientGrey_2,
]

const ComingSoonCard: FC<ComingSoonCardProps> = ({ onPress, isEnabled }) => (
  <Pressable
    disabled={!isEnabled}
    onPress={onPress}
    style={[styles.container, !isEnabled && styles.disabled]}
  >
    <LinearGradient
      colors={GRADIENT_COLORS}
      end={{ x: 1, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={styles.gradientContainer}
    />
    <View style={styles.textContainer}>
      <OutlinedText
        color={COLORS.white}
        fontSize={formatTabletElementsSize(20, 1.5)}
        numberOfLines={1}
        strokeColor={COLORS.gradientGrey_2}
      >
        Next levels
      </OutlinedText>
      <OutlinedText
        color={COLORS.white}
        fontSize={formatTabletElementsSize(20, 1.5)}
        numberOfLines={1}
        strokeColor={COLORS.gradientGrey_2}
      >
        coming soon...
      </OutlinedText>
    </View>
  </Pressable>
)

export default ComingSoonCard
