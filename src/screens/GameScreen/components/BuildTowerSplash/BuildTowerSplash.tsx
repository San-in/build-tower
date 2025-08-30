import {
  MonkeyFirstConstructorImg,
  MonkeySecondConstructorImg,
} from '@assets/images'
import { Button } from '@components/atoms'
import { ShadowWrapper } from '@components/wrappers'
import { BUTTON_TYPE, TOWER } from '@types'
import { Image } from 'expo-image'
import { MotiView } from 'moti'
import { FC, memo, useMemo, useState } from 'react'
import { LayoutAnimation } from 'react-native'

import { styles } from './BuildTowerSplash.styles'
import { BuildTowerSplashProps } from './BuildTowerSplash.types'

const BUTTON_LABELS = {
  [TOWER.FirstTower]: 'BUILD 1ST TOWER',
  [TOWER.SecondTower]: 'BUILD 2ND TOWER',
} as const

const IMAGE_SOURCES = {
  [TOWER.FirstTower]: MonkeyFirstConstructorImg,
  [TOWER.SecondTower]: MonkeySecondConstructorImg,
} as const

const BuildTowerSplash: FC<BuildTowerSplashProps> = ({ onPress, tower }) => {
  const [buildModalContentVisible, setBuildModalContentVisible] = useState(true)
  const handlePressButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    onPress()
    setBuildModalContentVisible(false)
  }

  const buttonLabel = useMemo(() => BUTTON_LABELS[tower], [tower])
  const imageSource = useMemo(() => IMAGE_SOURCES[tower], [tower])

  const [isImageReady, setIsImageReady] = useState(false)

  return (
    <ShadowWrapper modalVisible={buildModalContentVisible && isImageReady}>
      <MotiView
        animate={{ scale: [1, 1.02, 0.98, 1.02, 1] }}
        from={{ scale: 1 }}
        pointerEvents={isImageReady ? 'auto' : 'none'}
        style={styles.contentContainer}
        transition={{ scale: { type: 'timing', duration: 150 } }}
      >
        <Image
          allowDownscaling
          cachePolicy="memory-disk"
          contentFit="contain"
          onError={() => setIsImageReady(true)}
          onLoadEnd={() => setIsImageReady(true)}
          priority="high"
          recyclingKey={`splash-${tower}`}
          source={imageSource}
          style={[
            styles.image,
            {
              transform: [{ translateY: tower === TOWER.FirstTower ? 65 : 75 }],
            },
          ]}
          transition={400}
        />

        <Button
          onPress={handlePressButton}
          style={styles.button}
          title={buttonLabel}
          type={
            tower === TOWER.FirstTower
              ? BUTTON_TYPE.Warning
              : BUTTON_TYPE.Success
          }
        />
      </MotiView>
    </ShadowWrapper>
  )
}

export default memo(BuildTowerSplash)
