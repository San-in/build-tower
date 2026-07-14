import { OPERATOR } from '@types'

const operators: Array<OPERATOR> = [
  OPERATOR.Plus,
  OPERATOR.Minus,
  OPERATOR.Plus,
  OPERATOR.Minus,
  OPERATOR.Division,
  OPERATOR.Multiply,
]

export const generateRandomOperator = (
  exceptions: Array<OPERATOR> | null = null
): OPERATOR => {
  if (exceptions === null || exceptions.length === 0) {
    return operators[Math.floor(Math.random() * operators.length)] as OPERATOR
  }

  const remainingOperators = operators.filter(
    (operator) => !exceptions.includes(operator)
  )

  if (!remainingOperators.length) {
    return OPERATOR.Plus
  }

  return remainingOperators[
    Math.floor(Math.random() * remainingOperators.length)
  ] as OPERATOR
}
