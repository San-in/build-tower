import { TOWER } from '@types'

export type BlockTowerCreatorProps = {
  quantity: number
  type: TOWER
  onAnimatedEnd?: () => void
  isScaled?: boolean
}
