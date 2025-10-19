import { OPERATOR } from '@types'

const operators: Array<OPERATOR> = [
  OPERATOR.Plus,
  OPERATOR.Minus,
  OPERATOR.Plus,
  OPERATOR.Minus,
  OPERATOR.Division,
  OPERATOR.Multiply,
]

const uniqueOperators: Array<OPERATOR> = Array.from(new Set(operators))

export const generateRandomOperator = (
  exceptions: Array<OPERATOR> | null = null
): OPERATOR => {
  if (exceptions === null || exceptions.length === 0) {
    return operators[Math.floor(Math.random() * operators.length)] as OPERATOR
  }
  const uniqueExceptions = Array.from(new Set(exceptions))

  const remainingOperators = operators.filter(
    (operator) => !exceptions.includes(operator)
  )
  if (
    uniqueOperators.length === uniqueExceptions.length ||
    !remainingOperators.length
  ) {
    return OPERATOR.Plus
  }

  return remainingOperators[
    Math.floor(Math.random() * remainingOperators.length)
  ] as OPERATOR
}
