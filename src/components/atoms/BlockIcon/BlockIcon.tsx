import { BlockIconProps } from '@components/atoms/BlockIcon/BlockIcon.types'
import { GlobalStyles } from '@theme'
import { BLOCK_TYPE } from '@types'
import { Asset } from 'expo-asset'
import { FC, memo, useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, View } from 'react-native'

import { styles } from './BlockIcon.styles'

const blockImage = {
  src: require('@assets/images/block.png'),
}

const BlockIcon: FC<BlockIconProps> = ({
  size = 40,
  styleContainer = {},
  type = BLOCK_TYPE.Basic,
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imageSource = {
    [BLOCK_TYPE.Basic]: blockImage,
  }[type]

  useEffect(() => {
    setImagesLoaded(false)
    Asset.fromModule(imageSource.src)
      .downloadAsync()
      .then(() => setImagesLoaded(true))
  }, [imageSource])

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
        },
        styleContainer,
      ]}
    >
      {imagesLoaded && (
        <ImageBackground
          resizeMode="cover"
          source={imageSource.src}
          style={styles.image}
        />
      )}
    </View>
  )
}

export default memo(BlockIcon)
