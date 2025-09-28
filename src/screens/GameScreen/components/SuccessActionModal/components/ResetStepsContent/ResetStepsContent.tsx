import { OutlinedText } from '@components/atoms'
import { COLORS } from '@theme'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './ResetStepsContent.styles'

const ResetStepsContent: FC = () => (
  <>
    <View style={styles.textContainer}>
      <OutlinedText fontSize={22}>Back at</OutlinedText>
      <OutlinedText color={COLORS.gradientGold_1} fontSize={22}>
        Step 1
      </OutlinedText>
    </View>
    <OutlinedText fontSize={14}>(your result is saved)</OutlinedText>
  </>
)
export default memo(ResetStepsContent)
