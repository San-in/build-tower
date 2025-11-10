import { MARKET_PRODUCT_DESCRIPTION, MARKET_PRODUCT_PRICE } from '@constants'
import {
  MARKET_PRODUCT,
  POWER_UP_GRADE,
  POWER_UP_TYPE,
  PowerUpInfo,
} from '@types'

const gradeBySuffix: Record<string, POWER_UP_GRADE> = {
  bronze: POWER_UP_GRADE.Bronze,
  silver: POWER_UP_GRADE.Silver,
  gold: POWER_UP_GRADE.Gold,
}

const typeByPrefix: Record<string, POWER_UP_TYPE> = {
  add_random_blocks: POWER_UP_TYPE.AddRandomBlocks,
  remove_random_blocks: POWER_UP_TYPE.RemoveRandomBlocks,
}

export const getPowerUpInfoByMarketProduct = (
  product: MARKET_PRODUCT
): PowerUpInfo => {
  if (product === MARKET_PRODUCT.AddExtraStep) {
    return {
      type: POWER_UP_TYPE.AddExtraStep,
      grade: POWER_UP_GRADE.Base,
      description: MARKET_PRODUCT_DESCRIPTION[product],
      price: MARKET_PRODUCT_PRICE[product],
    }
  }

  const parts = product.split('_')
  const gradeSuffix = parts[parts.length - 1]
  const typePrefix = parts.slice(0, parts.length - 1).join('_')

  const grade =
    gradeSuffix && gradeBySuffix[gradeSuffix]
      ? gradeBySuffix[gradeSuffix]
      : POWER_UP_GRADE.Base

  const type = typeByPrefix[typePrefix] ?? POWER_UP_TYPE.AddExtraStep

  return {
    type,
    grade,
    description: MARKET_PRODUCT_DESCRIPTION[product],
    price: MARKET_PRODUCT_PRICE[product],
  }
}
