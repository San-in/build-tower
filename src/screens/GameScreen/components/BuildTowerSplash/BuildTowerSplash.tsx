import { Button } from '@components/atoms'
import { ShadowWrapper } from '@components/wrappers'
import { BUTTON_TYPE, TOWER } from '@types'
import { Image } from 'moti'
import { FC, memo, useState } from 'react'
import { LayoutAnimation } from 'react-native'

import { styles } from './BuildTowerSplash.styles'
import { BuildTowerSplashProps } from './BuildTowerSplash.types'

const BuildTowerSplash: FC<BuildTowerSplashProps> = ({ onPress, tower }) => {
  const [buildModalContentVisible, setBuildModalContentVisible] = useState(true)
  const handlePressButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    onPress()
    setBuildModalContentVisible(false)
  }

  const buttonLabel = {
    [TOWER.FirstTower]: 'BUILD 1ST TOWER',
    [TOWER.SecondTower]: 'BUILD 2ND TOWER',
  }[tower]

  const imageSource = {
    [TOWER.FirstTower]: require('../../../../../assets/images/monkey-constructor-1.png'),
    [TOWER.SecondTower]: require('../../../../../assets/images/monkey-constructor-2.png'),
  }[tower]

  return (
    <ShadowWrapper modalVisible={buildModalContentVisible}>
      <Image
        resizeMode={'contain'}
        source={imageSource}
        style={[
          styles.image,
          {
            transform: [{ translateY: tower === TOWER.FirstTower ? 65 : 75 }],
          },
        ]}
      />
      <Button
        onPress={handlePressButton}
        style={styles.button}
        title={buttonLabel}
        type={
          tower === TOWER.FirstTower ? BUTTON_TYPE.Warning : BUTTON_TYPE.Success
        }
      />
    </ShadowWrapper>
  )
}
export default memo(BuildTowerSplash)
