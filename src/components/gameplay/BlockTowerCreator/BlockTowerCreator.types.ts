import { Dimensions } from 'react-native'

type BlockType = 'initial' | 'user'

export type BlockTowerCreatorProps = {
  quantity: number
  type: BlockType
  isInitializing: boolean
  step?: number
  onAnimatedEnd?: () => void
  isScaled?: boolean
}

export type BlockProps = {
  type: BlockType
}
