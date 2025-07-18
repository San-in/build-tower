import { BlockIconProps } from '@components/atoms/BlockIcon/BlockIcon.types'
import { BLOCK_TYPE } from '@types'
import { FC, memo } from 'react'
import { ImageBackground, View } from 'react-native'

import { styles } from './BlockIcon.styles'

const BlockIcon: FC<BlockIconProps> = ({
  size = 40,
  styleContainer = {},
  type = BLOCK_TYPE.Basic,
}) => {
  const imageSource = {
    [BLOCK_TYPE.Basic]: require('../../../../assets/images/block.png'),
  }[type]

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
      <ImageBackground
        resizeMode="cover"
        source={imageSource}
        style={styles.image}
      />
    </View>
  )
}

export default memo(BlockIcon)
