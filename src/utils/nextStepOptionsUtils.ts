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

export const showIsUserNeedHelp = (userBlocks: number, initBlocks: number) => ({
  help: userBlocks - initBlocks > initBlocks / 2,
  strongHelp: userBlocks - initBlocks > initBlocks,
})

export const getOptionOperators = (
  isLastBlock: boolean,
  isNeedHelp: boolean
): [OPERATOR, OPERATOR] => {
  const first = isLastBlock
    ? generateRandomOperator([OPERATOR.Minus, OPERATOR.Division])
    : generateRandomOperator()

  const second =
    [
      isLastBlock &&
        generateRandomOperator([first, OPERATOR.Minus, OPERATOR.Division]),
      !isLastBlock && isNeedHelp && OPERATOR.Division,
    ].filter(Boolean)[0] || generateRandomOperator([first])

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
  if (operator === OPERATOR.Minus && number > totalNumbers) {
    return totalNumbers - 1
  }
  return number
}
