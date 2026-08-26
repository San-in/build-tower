import { MARKET_PRODUCT } from '@types'

export type MarketItemProps = {
  product: MARKET_PRODUCT
  toggleSelect: (product: MARKET_PRODUCT) => void
  isSelected: boolean
  totalBananas: number
}
