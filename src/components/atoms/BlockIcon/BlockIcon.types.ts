import { BLOCK_TYPE } from '@types'
import { ImageStyle } from 'expo-image'
import { DimensionValue } from 'react-native'

export type BlockIconProps = {
  size?: DimensionValue
  styleContainer?: ImageStyle
  type?: BLOCK_TYPE
}
