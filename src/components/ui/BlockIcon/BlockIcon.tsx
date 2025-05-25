import { styles } from '@components/ui/BlockIcon/BlockIcon.styles'
import { BLOCK_TYPE } from '@types'
import { FC } from 'react'
import { DimensionValue, ImageBackground, View, ViewStyle } from 'react-native'

type BlockIconProps = {
  size?: DimensionValue
  styleContainer?: ViewStyle
  type?: BLOCK_TYPE
}

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

export default BlockIcon
