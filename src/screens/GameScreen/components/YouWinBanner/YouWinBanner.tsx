import { Image, MotiView } from 'moti'
import { FC } from 'react'

import { styles } from './YouWinBanner.styles'

const YouWinBanner: FC = () => (
  <MotiView
    animate={{
      translateY: [-700, 300, 200, 280, 220, 260, 220, 240, 230, 235],
      scale: [1, 1.1, 0.9, 1.15, 0.85, 1.1, 0.9, 1, 0.9, 1],
    }}
    from={{ translateY: -700, scale: 1 }}
    pointerEvents="none"
    style={styles.container}
    transition={{
      type: 'timing',
      duration: 1500,
    }}
  >
    <Image
      resizeMode="contain"
      source={require('../../../../../assets/images/win.png')}
      style={styles.image}
    />
  </MotiView>
)

export default YouWinBanner
