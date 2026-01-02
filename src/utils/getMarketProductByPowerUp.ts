import { MARKET_PRODUCT, POWER_UP_GRADE, POWER_UP_TYPE } from '@types'

export function getMarketProductByPowerUp(
  type: POWER_UP_TYPE,
  grade: POWER_UP_GRADE
): MARKET_PRODUCT | undefined {
  if (grade === POWER_UP_GRADE.Base && type === POWER_UP_TYPE.AddExtraStep) {
    return MARKET_PRODUCT.AddExtraStep
  }
  return `${type}_${grade}` as MARKET_PRODUCT
}
