import { OPERATOR } from '@types'

export const generateRandomOperator = (
  exceptions: Array<OPERATOR> | null = null
): OPERATOR => {
  const operators: Array<OPERATOR> = [
    OPERATOR.Plus,
    OPERATOR.Minus,
    OPERATOR.Plus,
    OPERATOR.Minus,
    OPERATOR.Division,
    OPERATOR.Multiply,
  ]

  if (exceptions === null) {
    return operators[Math.floor(Math.random() * operators.length)] as OPERATOR
  }

  const remainingOperators = operators.filter(
    (operator) => !exceptions.includes(operator)
  )

  return remainingOperators[
    Math.floor(Math.random() * remainingOperators.length)
  ] as OPERATOR
}
