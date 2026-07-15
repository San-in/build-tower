import { IS_TABLET } from '@constants'

export const formatTabletElementsSize = (size: number, k = 2) =>
  IS_TABLET ? size * k : size
