import { COLORS } from '@theme'
import { formatTabletElementsSize } from '@utils'
import { MotiView } from 'moti'
import React, { FC, memo } from 'react'

import { OutlinedText } from '../OutlinedText'
import { styles } from './ScrollHint.styles'
import { ScrollHintProps } from './ScrollHint.types'

const ScrollHint: FC<ScrollHintProps> = ({
  isVisible,
  label = '↑ Scroll for more ↑ ',
}) => (
  <MotiView
    animate={{ opacity: isVisible ? 1 : 0 }}
    from={{ opacity: 0 }}
    pointerEvents="none"
    style={styles.container}
    transition={{ type: 'timing', duration: 250 }}
  >
    <MotiView
      animate={{ translateY: [0, formatTabletElementsSize(4), 0] }}
      from={{ translateY: 0 }}
      transition={{ type: 'timing', duration: 900, loop: true }}
    >
      <OutlinedText
        color={COLORS.gradientGold_1}
        fontSize={formatTabletElementsSize(10, 2)}
        strokeColor={COLORS.brown}
      >
        {label}
      </OutlinedText>
    </MotiView>
  </MotiView>
)

export default memo(ScrollHint)
