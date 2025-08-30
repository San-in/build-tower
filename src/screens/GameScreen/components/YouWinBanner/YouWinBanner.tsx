import { WinBannerImg } from '@assets/images'
import { Image } from 'expo-image'
import { MotiView } from 'moti'
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
      allowDownscaling
      cachePolicy="memory-disk"
      contentFit="contain"
      priority="high"
      source={WinBannerImg}
      style={styles.image}
      transition={100}
    />
  </MotiView>
)

export default YouWinBanner
