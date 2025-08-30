import blockImage from '@assets/images/block.png'
import { BlockIconProps } from '@components/atoms/BlockIcon/BlockIcon.types'
import { COLORS } from '@theme'
import { BLOCK_TYPE } from '@types'
import { Image } from 'expo-image'
import { FC, memo } from 'react'

import { styles } from './BlockIcon.styles'

const BlockIcon: FC<BlockIconProps> = ({
  size = 40,
  styleContainer,
  type = BLOCK_TYPE.Basic,
}) => (
  <Image
    contentFit="cover"
    placeholder={COLORS.backgroundYellow}
    recyclingKey={`block-${type}-${size}`}
    source={blockImage}
    style={[styles.base, { width: size, height: size }, styleContainer || null]}
    transition={100}
  />
)

export default memo(BlockIcon)
