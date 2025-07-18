import { BlockIcon, OutlinedText } from '@components/atoms'
import { FC, memo } from 'react'
import { View } from 'react-native'

import { styles } from './BlockWithValue.styles'
import { BlockWithValueProps } from './BlockWithValue.types'

const BlockWithValue: FC<BlockWithValueProps> = ({
  value,
  textColor,
  strokeColor,
  fontSize = 32,
  iconSize = 30,
}) => (
  <View style={styles.block}>
    <OutlinedText
      color={textColor}
      fontSize={fontSize}
      strokeColor={strokeColor}
    >
      {`${value}`}
    </OutlinedText>
    <BlockIcon size={iconSize} />
  </View>
)
export default memo(BlockWithValue)
