import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './ResetLevelContent.styles'

const ResetLevelContent: FC = () => (
  <>
    <View style={styles.textContainer}>
      <OutlinedText color={COLORS.gradientGold_1} fontSize={22}>
        Level
      </OutlinedText>
      <OutlinedText fontSize={22}>starts again</OutlinedText>
    </View>
    <OutlinedText fontSize={14}>(use your chance wisely)</OutlinedText>
  </>
)
export default memo(ResetLevelContent)
