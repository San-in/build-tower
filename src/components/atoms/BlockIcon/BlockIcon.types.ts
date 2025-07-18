import { BLOCK_TYPE } from '@types'
import { DimensionValue, ViewStyle } from 'react-native'

export type BlockIconProps = {
  size?: DimensionValue
  styleContainer?: ViewStyle
  type?: BLOCK_TYPE
}
