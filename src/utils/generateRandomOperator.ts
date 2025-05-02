import { Operator } from '@types'

export const generateRandomOperator = (
  exceptions: Array<Operator> | null = null
): Operator => {
  const operators: Array<Operator> = ['+', '-', '+', '-', '*', '/']

  if (exceptions === null) {
    return operators[Math.floor(Math.random() * operators.length)] as Operator
  }

  const remainingOperators = operators.filter(
    (operator) => !exceptions.includes(operator)
  )

  return remainingOperators[
    Math.floor(Math.random() * remainingOperators.length)
  ] as Operator
}
