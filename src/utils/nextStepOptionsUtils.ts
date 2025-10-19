import { OPERATOR, OperatorRange } from '@types'

import { OperatorType } from './checkOperatorType'
import { generateRandomNumber } from './generateRandomNumber'
import { generateRandomOperator } from './generateRandomOperator'

export const getOptionNumberByOperator = ({
  operator,
  simpleOperators,
  multiplicativeOperators,
}: {
  operator: OPERATOR
  simpleOperators: OperatorRange
  multiplicativeOperators: OperatorRange
}) =>
  OperatorType.isSimple(operator)
    ? generateRandomNumber({
        min: simpleOperators.start,
        max: simpleOperators.end,
      })
    : generateRandomNumber({
        min: multiplicativeOperators.start,
        max: multiplicativeOperators.end,
      })

export const showIsUserNeedHelp = (userBlocks: number, initBlocks: number) => {
  if (initBlocks <= 0) {
    const diff = userBlocks - initBlocks
    return {
      help: diff > 0,
      strongHelp: diff > 0,
      isMultipleBlocked: false,
      isMultiplePlusBlocked: userBlocks > 0,
    }
  }

  const diff = userBlocks - initBlocks
  const ratio = userBlocks / initBlocks

  return {
    help: diff > initBlocks / 2,
    strongHelp: diff > initBlocks,
    isMultipleBlocked: ratio >= 2 && ratio < 4,
    isMultiplePlusBlocked: ratio >= 4,
  }
}

export const getOptionOperators = (
  isLastBlock: boolean,
  isNeedHelp: boolean,
  isMultipleBlocked: boolean,
  isMultiplePlusBlocked: boolean
): [OPERATOR, OPERATOR] => {
  const firstExceptions = Array.from(
    new Set(
      [
        isLastBlock ? [OPERATOR.Minus, OPERATOR.Division] : [],
        isNeedHelp && !isLastBlock ? [OPERATOR.Division] : [],
        isMultipleBlocked ? [OPERATOR.Multiply] : [],
        isMultiplePlusBlocked ? [OPERATOR.Multiply, OPERATOR.Plus] : [],
      ].flat()
    )
  )

  const first = generateRandomOperator(firstExceptions)

  const secondExceptions = Array.from(
    new Set(
      [
        isLastBlock ? [first, OPERATOR.Minus, OPERATOR.Division] : [first],
        isNeedHelp && !isLastBlock && first !== OPERATOR.Division
          ? [OPERATOR.Multiply, OPERATOR.Plus, OPERATOR.Minus]
          : [first],
        isMultipleBlocked ? [first, OPERATOR.Multiply] : [first],
        isMultiplePlusBlocked
          ? [first, OPERATOR.Multiply, OPERATOR.Plus]
          : [first],
      ].flat()
    )
  )

  const second = generateRandomOperator(secondExceptions)
  return [first, second]
}

export const getValidOptionNumber = ({
  operator,
  number,
  totalNumbers,
}: {
  operator: OPERATOR
  number: number
  totalNumbers: number
}): number => {
  if (operator === OPERATOR.Minus && number >= totalNumbers) {
    return totalNumbers - 1
  }
  return number
}
