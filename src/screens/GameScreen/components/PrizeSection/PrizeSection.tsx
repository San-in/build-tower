import { BananasIcon } from '@assets/icons'
import { MotiView } from 'moti'
import { FC, memo } from 'react'
import { Easing } from 'react-native-reanimated'

import { styles } from './PrizeSection.styles'
import { PrizeSectionProps } from './PrizeSection.types'

const PrizeSection: FC<PrizeSectionProps> = ({ isVisible, animationKey }) => (
  <MotiView
    animate={{
      translateX: isVisible ? 0 : -200,
    }}
  >
    <MotiView
      animate={{ scale: isVisible ? 1.2 : 1 }}
      from={{ scale: 1 }}
      key={animationKey}
      style={styles.container}
      transition={{
        loop: isVisible,
        type: 'timing',
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        delay: 1000,
      }}
    >
      <BananasIcon height={50} width={50} />
    </MotiView>
  </MotiView>
)

export default memo(PrizeSection)
