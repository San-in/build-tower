import { LEVEL_RESULT } from '@types'

type GetLevelResultParams = {
  userBlockValue: number
  goldResult: number
  silverResult: number
  bronzeResult: number
}

export const getLevelResult = ({
  userBlockValue,
  goldResult,
  silverResult,
  bronzeResult,
}: GetLevelResultParams): LEVEL_RESULT => {
  if (userBlockValue > goldResult) {
    return LEVEL_RESULT.TooHigh
  }
  if (userBlockValue === goldResult) {
    return LEVEL_RESULT.GoldResult
  }
  if (userBlockValue === silverResult) {
    return LEVEL_RESULT.SilverResult
  }
  if (userBlockValue === bronzeResult) {
    return LEVEL_RESULT.BronzeResult
  }
  return LEVEL_RESULT.TooLow
}
