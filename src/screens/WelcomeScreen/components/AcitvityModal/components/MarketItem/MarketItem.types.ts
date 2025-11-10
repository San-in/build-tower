import { MARKET_PRODUCT } from '@types'

export type MarketItemProps = {
  product: MARKET_PRODUCT
  toggleSelect: () => void
  isSelected: boolean
  totalBananas: number
}
